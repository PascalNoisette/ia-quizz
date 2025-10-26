from unsloth import FastLanguageModel

def export_model(name):
    model, tokenizer = FastLanguageModel.from_pretrained(name)
    model.save_pretrained_gguf(name + "_gguf", tokenizer,  quantization_method=["q4_k_m"])
    print(tokenizer._ollama_modelfile)

export_model("custom_model_cpt")