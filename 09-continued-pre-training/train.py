from unsloth import FastLanguageModel
from dataset import CptGetDataset
from model import LoraWrap, BaseModel
from trainer import CptTrainer
from monitor import NvidiaTop

def train():

    max_seq_length = 2048 # Choose any! We auto support RoPE Scaling internally!
    
    model, tokenizer = BaseModel(max_seq_length)
    model = LoraWrap(model)

    #""" Test inference """
    # Generate(model, tokenizer)

    dataset = CptGetDataset(tokenizer)

    #""" Peak into dataset """
    print(dataset[0])

    trainer = CptTrainer(model, tokenizer, dataset, max_seq_length)

    start_gpu_memory = NvidiaTop()

    trainer_stats = trainer.train()

    NvidiaTop(start_gpu_memory)

    print(f"{trainer_stats.metrics['train_runtime']} seconds used for training.")
    print(
        f"{round(trainer_stats.metrics['train_runtime']/60, 2)} minutes used for training."
    )

    model.save_pretrained("custom_model_cpt")


train()
#model.save_pretrained_gguf("model", tokenizer, quantization_method = "q4_k_m")