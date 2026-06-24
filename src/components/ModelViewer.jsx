import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

// Reusable GLB viewer: auto-centers and auto-scales any model to fit the view,
// gently follows the mouse, and slowly auto-rotates. Cleans up fully on unmount.
export default function ModelViewer({
  modelPath,
  className = '',
  autoRotate = true,
  faceCamera = false,
  animationName = '',
  fitScale = 2.2,
  rotateSpeed = 0.004,
  followMouse = true,
  tilt = 0,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const spotLight = new THREE.SpotLight(0xa855f7, 3);
    spotLight.position.set(-5, 5, -5);
    scene.add(spotLight);

    // pivot handles mouse tilt; the model itself handles the auto-spin
    const pivot = new THREE.Group();
    scene.add(pivot);

    let model = null;
    let mixer = null;
    const clock = new THREE.Clock();
    const onError = (error) => console.error('خطأ في تحميل المجسم:', error);

    // Find the direction the "front" of the model points, by locating its
    // darkest material (an eye's pupil) and taking the vector from the model's
    // center to that material's vertices. Deterministic — no hand-tuned angle.
    const detectForward = (root, center) => {
      const lum = (c) => c.r + c.g + c.b;
      let darkest = null;
      let darkestLum = Infinity;
      root.traverse((child) => {
        if (!child.isMesh) return;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => {
          if (m.color && lum(m.color) < darkestLum) {
            darkestLum = lum(m.color);
            darkest = m;
          }
        });
      });
      if (!darkest) return null;

      const sum = new THREE.Vector3();
      const tmp = new THREE.Vector3();
      let count = 0;
      root.traverse((child) => {
        if (!child.isMesh) return;
        const pos = child.geometry.attributes.position;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        const groups = child.geometry.groups.length
          ? child.geometry.groups
          : [{ start: 0, count: pos.count, materialIndex: 0 }];
        groups.forEach((g) => {
          if ((mats[g.materialIndex] || mats[0]) !== darkest) return;
          const end = g.start + g.count;
          for (let i = g.start; i < end; i++) {
            tmp.fromBufferAttribute(pos, i);
            child.localToWorld(tmp);
            sum.add(tmp);
            count++;
          }
        });
      });
      if (count === 0) return null;
      return sum.multiplyScalar(1 / count).sub(center).normalize();
    };

    // center at origin, scale to fit, and (optionally) face the pupil at the camera
    const fitModel = (object) => {
      // render both faces so hollow shells (like an eyeball) never disappear
      object.traverse((child) => {
        if (child.isMesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((m) => { m.side = THREE.DoubleSide; });
        }
      });

      object.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const forward = faceCamera ? detectForward(object, center) : null;

      // center the geometry on the wrapper's origin
      object.position.sub(center);

      // wrapper lets us rotate/scale about the true center
      const wrapper = new THREE.Group();
      wrapper.add(object);

      if (forward) {
        wrapper.quaternion.setFromUnitVectors(forward, new THREE.Vector3(0, 0, 1));
      }

      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) wrapper.scale.setScalar(fitScale / maxDim);

      model = wrapper;
      pivot.add(wrapper);
    };

    const ext = modelPath.split('?')[0].split('.').pop().toLowerCase();
    if (ext === 'obj') {
      const dir = modelPath.slice(0, modelPath.lastIndexOf('/') + 1);
      const objFile = modelPath.slice(modelPath.lastIndexOf('/') + 1);
      const mtlFile = objFile.replace(/\.obj$/i, '.mtl');
      const mtlLoader = new MTLLoader().setPath(dir);
      mtlLoader.load(
        mtlFile,
        (materials) => {
          materials.preload();
          new OBJLoader()
            .setMaterials(materials)
            .setPath(dir)
            .load(objFile, fitModel, undefined, onError);
        },
        undefined,
        onError
      );
    } else {
      new GLTFLoader().load(
        modelPath,
        (gltf) => {
          fitModel(gltf.scene);
          // play a single baked-in clip: the requested one (matched loosely),
          // otherwise a clip named "idle", otherwise the first available.
          if (gltf.animations && gltf.animations.length) {
            mixer = new THREE.AnimationMixer(gltf.scene);
            const wanted = (animationName || 'idle').toLowerCase();
            const clip =
              gltf.animations.find((c) => c.name.toLowerCase().includes(wanted)) ||
              gltf.animations.find((c) => c.name.toLowerCase().includes('idle')) ||
              gltf.animations[0];
            mixer.clipAction(clip).play();
          }
        },
        undefined,
        onError
      );
    }

    // Track the cursor anywhere on the page (relative to the model's center) so
    // the eye "looks at" the pointer like a real eye.
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = (event.clientX - cx) / (window.innerWidth / 2);
      const y = -((event.clientY - cy) / (window.innerHeight / 2));
      targetRotX = clamp(-y * 0.5, -0.5, 0.5);
      targetRotY = clamp(x * 0.6, -0.6, 0.6);
    };
    if (followMouse) window.addEventListener('mousemove', handleMouseMove);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      if (model && autoRotate) model.rotation.y += rotateSpeed;
      if (followMouse) {
        pivot.rotation.x += (targetRotX - pivot.rotation.x) * 0.08;
        pivot.rotation.y += (targetRotY - pivot.rotation.y) * 0.08;
      } else {
        // fixed viewing angle (slightly from above)
        pivot.rotation.x = tilt;
      }
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((m) => {
            Object.values(m).forEach((v) => {
              if (v && typeof v.dispose === 'function') v.dispose();
            });
            m.dispose();
          });
        }
      });
      renderer.dispose();
    };
  }, [modelPath, autoRotate, faceCamera, animationName, fitScale, rotateSpeed, followMouse, tilt]);

  return <div ref={containerRef} className={className} />;
}
