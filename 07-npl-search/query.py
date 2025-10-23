from elasticsearch import Elasticsearch
from sentence_transformers import SentenceTransformer

import urllib3
import json

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
# Create an Elasticsearch client
es = Elasticsearch(hosts="https://elastic:changeme@localhost:9200", verify_certs=False)

# Use Sentence Transformers to generate embeddings for documents
model = SentenceTransformer("all-MiniLM-L6-v2")
# Perform a semantic search query
query = "What does the Transfigure ability do?"
query_embedding = model.encode([query])[0]

query = {
    "knn": {
        "field": "embedding",
        "query_vector": query_embedding.tolist(),
        "k": 2
    }
}

res = es.search(index='semantic_search', body={"query": query})

print(res['hits']['total'])
for result in res['hits']['hits']:
    print(result['_source']['text']) 