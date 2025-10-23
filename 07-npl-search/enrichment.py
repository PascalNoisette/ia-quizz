from elasticsearch import Elasticsearch
from sentence_transformers import SentenceTransformer
import csv
import urllib3
import json
import sys
if len(sys.argv) < 3:
    print("index.py input.csv output.csv", file=sys.stderr)
    sys.exit(1)

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
# Create an Elasticsearch client
es = Elasticsearch(hosts="https://elastic:changeme@localhost:9200", verify_certs=False)

# Use Sentence Transformers to generate embeddings for documents
model = SentenceTransformer("all-MiniLM-L6-v2")
# Perform a semantic search query
def askQuestion(query):
    query_embedding = model.encode([query])[0]

    query = {
        "knn": {
            "field": "embedding",
            "query_vector": query_embedding.tolist(),
            "k": 2
        }
    }

    res = es.search(index='semantic_search', body={"query": query})

    quote = ""
    i = 0
    for result in res['hits']['hits']:
        i += 1
        quote += "<em>" + result['_source']['text'] + "</em>\n"
        if i > 2:
            break

    return quote


import csv
csvfile = open(sys.argv[1], newline='')
spamreader = csv.reader(csvfile)


fieldnames = ['question', 'reference']
csv_file = open(sys.argv[2], mode='a', newline='')
writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
writer.writeheader()

for row in spamreader:
    if len(row)>0:
        writer.writerow({'question':row[0], 'reference':askQuestion(row[0])})