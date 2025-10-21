
import { parse } from 'csv-parse';
import { IQuizz } from "./interface";
import { cache } from './cache';


export const getCsvData = cache<IQuizz>( (filename:string):Promise<IQuizz[]> => {
  
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
