'use client';

import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { GroupStat } from "@/_components/interface";
import nextConfig from "../../../next.config";




export default function Stat() {

  const [storage, setStorage] = useState<Storage>();
  const [stat, setStat] = useState<GroupStat>({});
  const router =  useRouter();
  const translateAnswerFromStorage = useCallback((rawValue = "")=>{
    return rawValue.match(/wrong/)?"wrong":rawValue;
  }, []);
  useEffect(()=>{
    setStorage(localStorage);
    const compute = Object.keys(localStorage).reduce((acc: GroupStat,key:string) => {
      const values = translateAnswerFromStorage(localStorage.getItem(key)||"");
      values?.split("+").forEach(value=>{
        const quizzName = key.split('?')[1].split("&")[0].split("=")[1].split('.')[0];
        if (typeof(acc[quizzName])== "undefined") {
          acc[quizzName]={};
        }
        if (typeof(acc[quizzName][value])== "undefined") {
          acc[quizzName][value]=0;
        }
        acc[quizzName][value] +=1;
      });
      return acc;
    },{});
    Object.keys(compute).forEach(url=>{
      compute[url]["sum"] = Object.keys(compute[url]).reduce((agg, cur)=>agg+compute[url][cur], 0)
    })
    setStat(compute);
  }, [router]);

  function clearStorage() {
    localStorage.clear();
    router.refresh()
  }

  
  return (
      <>
        <ul className="scrollbar-hide overflow-y-scroll  max-h-120 mx-10 w-full divide-y divide-gray-200">
          {Object.keys(stat).map(url => {
            return <> {Object.keys(stat[url]).filter(key=>["sum"].indexOf(key)==-1).map(key => {
              return <li className={`flex flex-row items-center`} key={key}>
                        <span className="p-4">{url}</span>
                        <span className="">
                          {Math.round(stat[url][key]/stat[url]["sum"]*100)}%
                        </span>
                        <span className={`font-medium  ${key} rounded-full p-2 m-2`}>{key}</span>
                      </li>;
            })}</>
          })}
        </ul>
        
         <div className="flex gap-4 items-center flex-col sm:flex-row mx-10">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 p-5 sm:px-5 sm:w-auto"
            onClick={()=>clearStorage()}
          >
            Clear
          </a>
        </div>
        <ul className="overflow-y-scroll h-120 w-full divide-y divide-gray-200 mb-20">
          {storage && Object.keys(storage).filter(key=>["sum", "answer"].indexOf(storage.getItem(key)??"") ==-1).map(key => {
            return (<li key={key} className={`${key} flex items-center py-3 px-4`}><a href={nextConfig.basePath + key} className="underline overflow-hidden max-w-64 md:max-w-full m-1">{key}</a> 
              <span className={`${storage.getItem(key)} ml-auto rounded-full p-2 `}> {translateAnswerFromStorage(storage.getItem(key)||"")}</span>
            </li>);
          })}
        </ul>
      </>
  );
}
