
import { parse } from 'csv-parse';
import { IQuizz } from "./interface";

type CsvDataCallable = (id:string)=>Promise<IQuizz[]>;

 function cache(callback:CsvDataCallable):CsvDataCallable {
  return  async (id:string) => {
    try {
      const cached = sessionStorage.getItem(id);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e){console.error(e)}
    const results =  await callback(id);
    try {
      sessionStorage.setItem(id, JSON.stringify(results));
    } catch (e){console.error(e)}
    return results;
  }
}

export const getCsvData = cache( (filename:string):Promise<IQuizz[]> => {
  
  return fetch(filename)
    .then(async response=>await response.text())
    .then(async fileContent => await new Promise(async (resolve, reject)=>parse(await fileContent, {
    columns: true,
    skip_empty_lines:false,
    relax_column_count:true,
    }, (err, records:IQuizz[]) => {
        if (err) {
        reject(err);
        } else {
        resolve(records);
        }
    })));
});
