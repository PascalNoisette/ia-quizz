# Train on raw text

The source of inspiration of this finetunning is based on the [unsloth notebook.](https://docs.unsloth.ai/basics/continued-pretraining)

Contrary to 06-lora-train we are trainning on raw data without SFT.


## Install unsloth

```
python3 -m venv venv
source ./venv/bin/activate
pip install torch==2.8 torchvision torchaudio packaging
wget -qO- https://raw.githubusercontent.com/unslothai/unsloth/main/unsloth/_auto_install.py | python3 -
# do what the above command says, it might be
pip install "unsloth[cu128-ampere-torch280] @ git+https://github.com/unslothai/unsloth.git"
```
## Dataset

The input files can be the output of the chunking process (03 folder).

```
[
    {"text":"Chunk"},
    ...
]
```

## Run

```
source ./venv/bin/activate
python train.py
```

## Inference

```
source ./venv/bin/activate
python test.py
```