import { useState, useEffect, ReactNode } from "react";
import { get } from "./utils/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import image from "../src/assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function App() {
  const [fetchPosts, setFetchedPosts] = useState<BlogPost[] | undefined>();
  const [fetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function getPosts() {
      setIsFetching(true);

      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as RawDataBlogPost[];

        const blogPosts: BlogPost[] = data.map((el) => {
          return { id: el.id, title: el.title, text: el.body };
          
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        setError("Failed to fetch posts!");
      }
      setIsFetching(false);
    }

    getPosts();
  }, []);

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text ={error}/>
  }

  if (fetchPosts) {
    content = <BlogPosts posts={fetchPosts} />;
  }

  if (fetching) {
    content = <p id="loading-fallback">Loading your data...</p>;
  }

  return (
    <main>
      <img src={image} />
      {content}
    </main>
  );
}

export default App;
