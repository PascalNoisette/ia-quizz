# Extract text

## PDF with (only) selectable text

You can use gnu [pdftotxt](https://linux.die.net/man/1/pdftotext) to extract quickly text from pdf.

## Wider range of formats (docx, ...)

[Tika](https://tika.apache.org/3.1.0/formats.html)

(Optional OCR Tesseract-ocr)

## All in one python package (pipeline of extraction, ai ocr and chunking)

[txtai](https://github.com/neuml/txtai/blob/master/examples/10_Extract_text_from_documents.ipynb)

By default it embeds tika + rapidocr OCR model.

```
python3 -m venv venv
venv/bin/pip install -r requirements.txt
venv/bin/python3 pdf2txt.py input.pdf output.txt
```