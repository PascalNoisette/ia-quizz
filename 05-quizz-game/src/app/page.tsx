'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import nextConfig from "../../next.config";
import Loader from '@/_components/loader';

export default function Home() {
  const [leafletData, setLeafletData] = useState<{[key: string]:{name:string, filenames:string[]}}>({});
  const [error, setError] = useState('');
  useEffect(() => {
    fetch(`${nextConfig.basePath}/leaflet.json`)
      .then(response => response.json())
      .then(data => setLeafletData(data))
      .catch(setError);
  }, []);

  if (Object.keys(leafletData).length<1) {
    return <Loader message={error.toString()}/>
  }

    return (
    <>
      <h2  className="font-bold text-xl text-center p-4  w-full">Select a quizz :</h2>
      <div className="flex gap-4 items-center flex-row sm:flex-row">
        <ul>
          {Object.keys(leafletData).map((slug) => (
            <li 
              key={slug}
              className=" list-disc"
              ><Link
              className={`flex items-center py-3`} 
              href={`/quizz/?filename=${leafletData[slug].filenames[Math.floor(Math.random() * leafletData[slug].filenames.length)]}`}
              rel="nofollow"
              title={slug}
            >
              <span className={` hover:underline`} > {leafletData[slug].name}</span>
            </Link></li>
          ))}
        </ul>
      </div>
    </>
  );
}
