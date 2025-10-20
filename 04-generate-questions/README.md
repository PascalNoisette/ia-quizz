# LLM worflow to invent a question from a chunk of text

## Ollama

You must install Ollama first, and download a model
You can select the model in .env

## Input file

Chunks of input text must look like this:

```
[
    {
        "text": "Information is an abstract concept."
    }
}
```

## Generation

```
mv .env.template .env
python3 -m venv venv
venv/bin/pip install -r requirements.txt
venv/bin/python3 generate-question.py input.json output.csv
```
