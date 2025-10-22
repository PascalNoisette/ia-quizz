
from transformers import TextStreamer

def Generate(model, tokenizer):
    messages = [
        {
            "content": "You are an AI chatbot, expert in the rule the card game Magic: The Gathering. When asked about a keyword, think about everything you know about the keyword, then answer the question.",
            "role": "system"
        },
        {
            "role": "user",
            "content": "What does the Transfigure ability do?"
        },
    ]
    inputs = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt = True,
        return_tensors = "pt",
        return_dict = True,
        reasoning_effort = "medium", # **NEW!** Set reasoning effort to low, medium or high
    ).to("cuda")

    model.generate(**inputs, max_new_tokens = 2000, streamer = TextStreamer(tokenizer))

