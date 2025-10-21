
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Quizz from "@/_components/quizz";


export default function Home() {
  const [filename, setFilename] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      setFilename(searchParams.get('filename') || '');
    }
  }, [searchParams]);

  return (
        <Quizz route="quizz" filename={filename} />
  );
}
