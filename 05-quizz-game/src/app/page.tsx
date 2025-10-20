import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/quizz/Comprehensive_Rules.quizz.csv"
            rel="nofollow"
            title="Rulebook for beginners"
          >
            Start quizz
          </Link>
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/quizz/Magic-The-Gathering-Rulebook.quizz.csv"
            rel="nofollow"
            title="Comprehensive rules"
          >
            Start quizz (PGM)
          </Link>
        </div>
  );
}
