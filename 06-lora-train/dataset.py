import random
from datasets import load_dataset, Features, Value

def GetDataset(step, tokenizer):

    def formatting_prompts_func(raw):
        texts = [tokenizer.apply_chat_template([
            {
                "content": "You are an AI chatbot, expert in the rule the card game Magic: The Gathering.",
                "role": "system",
                "thinking": None
            },
            {
                "content": raw["question"][index],
                "role": "user",
                "thinking": None
            },
            {
                "content": raw["answer"][index],
                "role": "assistant", 
                "thinking": random.choice([
                    "Let’s dive into the rule.",
                    "Let’s break this down.",
                    "I’ll walk you through the details.",
                    "Here’s what you need to know.",
                    "Let me explain how that works.",
                    "Let’s clarify that.",
                    "Here’s the explanation you’re looking for.",
                    "Let’s unpack the rule.",
                    "Let’s clarify that for you.",
                    "Here’s the answer.",
                    "I’ll walk you through that.",
                ])
            }
        ], tokenize = False, add_generation_prompt = False) for index in range(len(raw["question"]))]
        return { "text" : texts, }


    dataset = load_dataset('csv', data_dir='data/' + step, split=step, features=Features({'question': Value('string'), 'answer': Value('string')}))

    """To format our dataset, we will apply our version of the GPT OSS prompt"""

    dataset = dataset.map(formatting_prompts_func, batched = True,)

    """Let's take a look at the dataset, and check what the 1st example shows"""

    return dataset
