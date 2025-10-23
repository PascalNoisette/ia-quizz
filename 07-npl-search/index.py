from elasticsearch import Elasticsearch
from sentence_transformers import SentenceTransformer
import urllib3
import json
import sys

if len(sys.argv) < 2:
    print("index.py input.json", file=sys.stderr)
    sys.exit(1)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
# Create an Elasticsearch client
es = Elasticsearch(hosts="https://elastic:changeme@localhost:9200", verify_certs=False)

# Create an index for semantic search
es.indices.create(index='semantic_search', ignore=400)

# Use Sentence Transformers to generate embeddings for documents
model = SentenceTransformer("all-MiniLM-L6-v2")
with open(sys.argv[1], 'r') as file:
    chunks = json.load(file)
documents = [chunk['text'] for chunk in chunks]
embeddings = model.encode(documents)

# Index the documents and their embeddings in Elasticsearch
for i, doc in enumerate(documents):
    es.index(index='semantic_search', id=i, body={
        'text': doc,
        'embedding': embeddings[i].tolist()
    })
