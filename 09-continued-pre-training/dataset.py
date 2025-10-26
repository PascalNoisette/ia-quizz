
from datasets import load_dataset


def CptGetDataset(tokenizer):
    dataset = load_dataset('json', data_dir='data/json/', split = "train")
    EOS_TOKEN = tokenizer.eos_token
    def formatting_prompts_func(examples):
        return { "text" : [example + EOS_TOKEN for example in examples["text"]] }
    dataset = dataset.map(formatting_prompts_func, batched = True,)
    return dataset