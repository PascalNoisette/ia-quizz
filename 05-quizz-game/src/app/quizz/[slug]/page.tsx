
import { Suspense } from "react";
import {  ISlugUrlParams } from "@/_components/interface";
import Loader from "@/_components/loader";
import fs from 'fs';
import path from 'path';
import Quizz from "@/_components/quizz";

export async function generateStaticParams(): ISlugUrlParams {
  const publicDir = path.join(process.cwd(), 'public');
  const files = fs.readdirSync(publicDir);
  const csvFiles = files.filter(file => file.endsWith('.quizz.csv'));

  return csvFiles.map(file => ({ slug: file }));
}

export default async function Home(promisedParams:Promise<{params:{slug:string}}>) {
   const {params} = await promisedParams;
   const {slug} = await params;
  return (
      <Suspense fallback={<Loader/>}>
        <Quizz route="quizz" filename={slug} />
      </Suspense>
  );
}
