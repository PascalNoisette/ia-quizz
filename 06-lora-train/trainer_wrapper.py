from unsloth.chat_templates import train_on_responses_only

def UnslothWrap(trainer):
    gpt_oss_kwargs = dict(instruction_part = "<|start|>user<|message|>", response_part="<|start|>assistant<|channel|>final<|message|>")

    return train_on_responses_only(
        trainer,
        **gpt_oss_kwargs,
    )