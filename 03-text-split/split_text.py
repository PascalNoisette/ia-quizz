from chonkie.pipeline import Pipeline

def main(input, output):
    # Fetch and process a single file
    doc = (Pipeline()
        .fetch_from("file", path=input)
        .process_with("text")
        .chunk_with("sentence", chunk_size=150, delim=['.', '!', '?', '\\n', '\\n\\n'])
        .run())

    print(f"Created {len(doc.chunks)} chunks")
    import json
    
    # Write chunks to a JSON file
    with open(output, "w") as f:
        json.dump([{"text": chunk.text} for chunk in doc.chunks], f, indent=4)


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("python split_text.py input.pdf output.pdf", file=sys.stderr)
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])