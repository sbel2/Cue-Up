import Card from "@/components/card";
import { createClient } from "@/supabase/client";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient();

  const { data: posts, error } = await supabase.from('posts').select();

  if (error) {
    return <p>Error loading posts</p>;
  }

  if (!posts || posts.length === 0) {
    return <p>No posts found</p>;
  }

  return (
    <main className="min-h-screen mx-auto max-w-[100rem] overflow-x-hidden">
      <div className="px-12 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {posts.map((post) => (
            <Card key={post.post_id} {...post} />
          ))}
        </div>
      </div>
    </main>
  );
}
