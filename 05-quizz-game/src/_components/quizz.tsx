'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, usePathname } from 'next/navigation';
import { IQuizz } from "./interface";
import { getCsvData } from "./csvReader";
import nextConfig from "../../next.config";
import Loader from "./loader";

export default  function Quizz({ route, filename }:{ route:string, filename:string }) {
  const [csvData, setCsvData] = useState<IQuizz[]>([]);
  const [error, setError] = useState("");
  const param = useSearchParams();
  const pathname = usePathname();
  const [quizz, setQuizz] = useState<{[key: string]:string}>({});
  const [revealAnswer, setRevealAnswer] = useState("");

  const quizzAnswers = useMemo(()=>['answer','first_wrong_answer','second_wrong_answer','third_wrong_answer'], []);
  const [shuffle, setShuffle] = useState(quizzAnswers);

  useEffect( () => {
    (async () => {
      try {
        setCsvData(await getCsvData(`${nextConfig.basePath}/${filename}`));
      } catch (e) {
        if (e instanceof Error) {
          setError(e.toString());
        }
      }
    })();
  }, [filename]);

  const routerAsPath = useCallback(function () {
    const fullPath = pathname + 
    (param.toString() ? `?${param.toString()}` : '');
    return fullPath;
  }, [pathname, param]);

  const loadNextQuestion = useCallback(() => {
    if (revealAnswer == "" && Number(param.get('question')) > 0) {
      localStorage.setItem(routerAsPath(), "skip");
    }
    const randomQuestionId = Math.floor(Math.random() * csvData.length)
    window.history.pushState( {} , "", `${nextConfig.basePath}/${route}/${filename}?question=${randomQuestionId}`);
    setRevealAnswer("")
  }, [revealAnswer, param, route, filename]);

  const shuffleArray = useCallback((array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }, []);

  const userHasChoosen = useCallback((answerType:string)=> {
    setRevealAnswer(answerType)
    localStorage.setItem(routerAsPath(), answerType);
  }, [routerAsPath]);

  useEffect(() => {
    if (csvData.length >0) {
      if (isNaN(Number(param.get('question'))) || Number(param.get('question')) <= 0 || Number(param.get('question')) > csvData.length) {
        loadNextQuestion();
      }
    }
  }, [param, csvData, loadNextQuestion]);

  useEffect(()=>{
    setQuizz(csvData[Number(param.get('question'))]);
    const anwserHistory = localStorage.getItem(routerAsPath());
    if (anwserHistory!== null) {
      setRevealAnswer(anwserHistory)
    }
  }, [param, csvData, routerAsPath]);

  useEffect(()=>{
    setShuffle(shuffleArray(quizzAnswers));
  }, [param, quizzAnswers, shuffleArray]);

  if (error) {
    return <Loader message={error}/>;
  }
  if (!csvData || csvData.length == 0) {
    return <Loader/>;
  }


  return (
    <>
    <div  className="w-full text-right">
      <a 
        className="rounded-full border border-solid border-transparent bg-[#fae2f1] p-2 text-xs" 
        href={`https://github.com/PascalNoisette/ia-quizz/edit/gh-pages/${filename}#L${Number(param.get('question'))+2}`}
        title="the question can be improved">Edit the question</a>
      </div>
     <h2 className="font-bold text-xl text-center p-4  w-full">
      {quizz && quizz.question || "This question is now deleted."}
     </h2>
      
        <div className={`flex gap-4 items-center flex-col flex-wrap flex-row justify-center`}>
        {shuffle.map((key, index) => (
            <a
            key={String(index)} 
            className={`${key == revealAnswer ? revealAnswer : ""} text-center rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-small p-2 text-sm sm:text-base h-15 w-full md:w-2/5`}
            onClick={()=>userHasChoosen(key)}
          >
            {quizz && quizz[key]}
          </a>
        ))} 
        </div>
        <div className={`flex gap-4 items-center flex-col flex-wrap flex-row justify-center w-full`}>
          <a          
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 m-10 w-50"
              onClick={loadNextQuestion}
              rel="nofollow"
            >
              Next
            </a>
        </div>
        
      
    </>
  );
}
