from txtai.pipeline import Textractor
import nltk
import sys

if len(sys.argv) < 2:
    print("pdf2txt.py input.pdf output.pdf", file=sys.stderr)
    sys.exit(1)



nltk.download(['punkt', 'punkt_tab'])
textractor = Textractor()
content = textractor(sys.argv[1])


with open(sys.argv[2], "w") as file:
    file.write(content)