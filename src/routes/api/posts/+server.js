import { fetchMarkdownPosts } from "$lib/utils";
import { json } from "@sveltejs/kit";

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();

  const sortedPosts = allPosts.sort((a, b) => {
    console.log(a.meta)
    return new Date(b.meta.date) - new Date(a.meta.date)
    
  });

  return json(sortedPosts);
};
