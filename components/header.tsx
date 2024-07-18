import Link from "next/link";
import Image from "next/legacy/image";
import Search from './search';

export default function Header({ font }: { font?: string }) {
  const commands = [
    // Implement mock data
  ];
  return (
    <header className="py-10 pb-4 bg-gray-952 ml-2">
      <div className="max-w- [100rem] px-12 mx-auto flex justify-between">
        <Link href="/">
          <Image
            src="https://qteefmlwxyvxjvehgjvp.supabase.co/storage/v1/object/public/website%20logo/citale_header.png?t=2024-07-01T18%3A48%3A14.610Z"
            alt="Citale"
            width={110}
            height={40}
            layout="fixed"
          />
        </Link>
        <Search data={commands} />
      </div>
    </header>
  );
}
