from unsloth import FastLanguageModel

def test(name):
    model, tokenizer = FastLanguageModel.from_pretrained(name)
    inputs = tokenizer(
    [
        "Start your collection with an intro pack and begin battling immediately with a "
    ]*1, return_tensors = "pt").to("cuda")

    from transformers import TextStreamer
    model.generate(**inputs, max_new_tokens = 200, streamer = TextStreamer(tokenizer))


test("custom_model_cpt")
#test("unsloth/mistral-7b-v0.3")
