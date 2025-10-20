import Image from "next/image";
import Link from "next/link";
import nextConfig from "../../next.config";

export default function Footer() {
  return (
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/statistics"
        >
          <Image
            aria-hidden
            src={`${nextConfig.basePath}/file.svg`}
            alt="File icon"
            width={16}
            height={16}
          />
          My results
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
            rel="nofollow"
        >
          <Image
            aria-hidden
            src={`${nextConfig.basePath}/window.svg`}
            alt="Window icon"
            width={16}
            height={16}
          />
          Home
        </Link>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://magic.wizards.com/en/rules"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={`${nextConfig.basePath}/globe.svg`}
            alt="Globe icon"
            width={16}
            height={16}
          />
          Check the official rule
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://archive.org/details/magic-the-gathering-basic-rulebook-2013/page/n5/mode/2up"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={`${nextConfig.basePath}/globe.svg`}
            alt="Globe icon"
            width={16}
            height={16}
          />
          Check the basic rulebook
        </a>
      </footer>
  );
}
