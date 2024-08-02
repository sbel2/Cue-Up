import Link from "next/link";
import Image from "next/legacy/image";
import Search from './search';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';

export default async function Header({ font }: { font?: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: posts, error } = await supabase.from('posts').select();
  if (!posts) {
    return <p>No data found</p>;
  }
  const data: any = [];
  posts.map((post) => {
    data.push({
      value: post.post_id.toString(),
      label: post.title + ' ' + post.description,
    });
  });
  return (
    <header className="py-2 md:py-7 pt-7 md:pt-10 bg-gray-952">
      <div className="max-w-[100rem] px-5 md:px-10 mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/citale_header.svg" // Use a relative path to the image in the public directory
            alt="Citale"
            width={110}
            height={40}
            priority // Ensures the image is prioritized for loading
          />
        </Link>
        <Search data={data} />
        <a
          href="https://forms.gle/fr4anWBWRkeCEgSN6"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 text-blue-600 underline hover:text-blue-800 transition-colors duration-200 text-sm md:text-base"
        >
          How do you like Citale?
        </a>
      </div>
    </header>
  );
}
