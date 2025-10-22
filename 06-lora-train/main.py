from unsloth import FastLanguageModel
from dataset import GetDataset
from generator import Generate
from model import LoraWrap, BaseModel
from trainer import BaseTrainer
from trainer_wrapper import UnslothWrap
from monitor import NvidiaTop

def train():
    model, tokenizer = BaseModel()
    model = LoraWrap(model)

    #""" Test inference """
    # Generate(model, tokenizer)

    dataset = GetDataset("train", tokenizer)

    #""" Peak into dataset """
    #print(dataset[0])

    trainer = UnslothWrap(BaseTrainer(model, tokenizer, dataset))

    start_gpu_memory = NvidiaTop()

    trainer_stats = trainer.train()

    NvidiaTop(start_gpu_memory)

    print(f"{trainer_stats.metrics['train_runtime']} seconds used for training.")
    print(
        f"{round(trainer_stats.metrics['train_runtime']/60, 2)} minutes used for training."
    )

    model.save_pretrained("custom_model_one")

def test(name):
    model, tokenizer = FastLanguageModel.from_pretrained(name)

    Generate(model, tokenizer)


test("unsloth/gpt-oss-20b")
test("custom_model_one")