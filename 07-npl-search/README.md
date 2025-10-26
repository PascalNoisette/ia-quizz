# NPL Search

Objective : Ask any question about the rule. The objective is to quote the relevant part of the rule.

## Source

[Based on the Semantic Search with NLP and elasticsearch Article](https://www.geeksforgeeks.org/nlp/semantic-search-with-nlp-and-elasticsearch/)

## Elasticsearch server

Start the Elasticsearch server in background.

```
docker composer up -d
```

## Details

Search document in natural language.

In this example, one document is one chunk from the step 03-text-split.
A natural language query can be any question about the rule.
The result will be a relevant part of the rule.

```
python3 -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
python index.py
python query.py
```
