from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from typing import Optional
from pydantic import BaseModel, Field
import json
from dotenv import load_dotenv
import os
import csv
from multiprocessing import Pool
from langchain_core.callbacks import get_usage_metadata_callback
import time
import sys

if len(sys.argv) < 2:
    print("generate-question.py input.json output.csv", file=sys.stderr)
    sys.exit(1)

class Quizz(BaseModel):
    """A Quizz question and answer if possible."""
    question: str = Field(description="The question for the quizz")
    answer: str = Field(description="he good answer for the chosen question")
    first_wrong_answer: str = Field(description="A wrong answer for the question, may be cunning")
    second_wrong_answer: str = Field(description="An other wrong answer for the question")
    third_wrong_answer: str = Field(description="An creative wrong answer for the question")

class QuizzList(BaseModel):
    quizz: list[Quizz]
    rejected: bool = Field(description="Boolean if creating a quizz is not possible, then reject.")

# Load environment variables from .env file
load_dotenv()

# Create ChatOllama with default options
think = ChatOllama(
    base_url=os.getenv("BASE_URL"),
    model=os.getenv("MODEL"),
    think=True,
    reasoning=True
)

chat = ChatOllama(
    base_url=os.getenv("BASE_URL"),
    model=os.getenv("MODEL")
).with_structured_output(QuizzList)



with open(sys.argv[1], 'r') as file:
    chunks = json.load(file)

with open('prompt.txt', 'r') as file:
    initial_prompt = file.read()

csv_file_path = sys.argv[2]
fieldnames = ['question', 'answer', 'first_wrong_answer', 'second_wrong_answer', 'third_wrong_answer']

  
csv_file = open(csv_file_path, mode='a', newline='')
writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
writer.writeheader()


def handle_chunck(index, chunk):
    prompts = [
        SystemMessage(content=initial_prompt)
    ]

    prompts.append(HumanMessage(content="".join([
        chunks[index-2]['text'] if 0 <= index - 2  else "",
        chunks[index-1]['text'] if 0 <= index - 1  else "",
        "<em>",
        chunks[index]['text'],
        "</em>",
        chunks[index+1]['text'] if index + 1 < len(chunks) else "",
        chunks[index+2]['text'] if index + 2 < len(chunks) else "",
    ])))

    for message in prompts:
            message.pretty_print()

    print("================================ Think =================================")
    tought = ""
    reasoning = ""
    for chunk in think.stream(prompts):
        if chunk.response_metadata:
            break
        if chunk.additional_kwargs and chunk.additional_kwargs['reasoning_content']:
            print(chunk.additional_kwargs['reasoning_content'], end='')
            reasoning = reasoning + chunk.additional_kwargs['reasoning_content']
        if chunk.content:
            print(chunk.content, end='')
            tought = tought + chunk.content

    if reasoning != "":
        reasoning = "<think>" + reasoning + "</think>\n\n"
        tought = "```"
    
    prompts.append(AIMessage(content=reasoning + tought))
    try:
        response = chat.invoke(prompts)
    except Exception as e:
        print(f"\n{e}")
        response = QuizzList(rejected=True, quizz=[])
    print("\n================================ Answer =================================")
    if not response.rejected:
        for quizz in response.quizz:
            print(quizz)
            try:
                writer.writerow(quizz.dict())
            except Exception as e:
                print(f"\n{e}")

        csv_file.flush()
    else:
        print("[    Rejected    ]")

for index,chunk in enumerate(chunks):
    with get_usage_metadata_callback() as monitor:
        start_time = time.perf_counter()
        handle_chunck(index,chunk)
        elapsed = time.perf_counter() - start_time
        print(f"[    COST {elapsed:.6f} seconds {monitor.usage_metadata}   ]")
