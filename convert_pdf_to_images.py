from pdf2image import convert_from_path
import os

pdf_path = 'src/assets/Digital/دليل الأمن الرقمي لعائلتك-1.pdf'
out_dir = 'src/assets/Digital/book_pages'
os.makedirs(out_dir, exist_ok=True)

images = convert_from_path(pdf_path)
for i, img in enumerate(images):
    img_path = os.path.join(out_dir, f'page_{i+1}.png')
    img.save(img_path, 'PNG')
    print(f'Saved: {img_path}')

print(f'تم استخراج {len(images)} صفحة من PDF إلى صور PNG بنجاح.')