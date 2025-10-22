# Train a custom lora adapter

The source of inspiration of this finetunning is based on the [unsloth step-by-step.](https://docs.unsloth.ai/models/gpt-oss-how-to-run-and-fine-tune/tutorial-how-to-fine-tune-gpt-oss)

## Install unsloth

```
python3 -m venv venv
source ./venv/bin/activate
pip install torch==2.8 torchvision torchaudio packaging
wget -qO- https://raw.githubusercontent.com/unslothai/unsloth/main/unsloth/_auto_install.py | python3 -
# do what the above command says, it might be
pip install "unsloth[cu128-ampere-torch280] @ git+https://github.com/unslothai/unsloth.git"
```

## Train


```
source ./venv/bin/activate
python main.py
```

## Inference with the fine tuned model

```
source ./venv/bin/activate
python main.py
```