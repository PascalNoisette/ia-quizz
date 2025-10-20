This is a "file reader" for the dataset generated previously.


## Dataset

Place your dataset in the public folder.

It must be a valid coma separated csv file with the extension ".quizz.csv" with the following columns :

```
question,answer,first_wrong_answer,second_wrong_answer,third_wrong_answer
```

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

## Deployment

Static Build

```bash
npm run build
```

Serve

```bash
npx serve .
```
