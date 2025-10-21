import Link from "next/link";
import { generateStaticParams as getAvailableQuizz } from "./quizz/[slug]/page";

export default async function Home() {
  return (
    <>
      <h2  className="font-bold text-xl text-center p-4  w-full">Select a quizz :</h2>
      <div className="flex gap-4 items-center flex-row sm:flex-row">
        <ul>
          {await (await getAvailableQuizz()).map(({slug}, index) => (
            <li 
              key={index}
              className=" list-disc"
              ><Link
              className={`flex items-center py-3`} 
              href={`/quizz/${slug}`}
              rel="nofollow"
              title={slug}
            >
              <span className={` hover:underline`} > {slug}</span>
            </Link></li>
          ))}
        </ul>
      </div>
    </>
  );
}

