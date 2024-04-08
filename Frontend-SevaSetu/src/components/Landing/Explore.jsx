import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../Loading";

/* This example requires Tailwind CSS v2.0+ */
export default function Explore() {
  const [loading,setLoading] = useState(true);

  const [foundationIDs, setFoundationIDs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFoundationIDs = async () => {
      try {
        const response = await fetch(`/api/foundation/ids`);
        if (!response.ok) {
          throw new Error("Failed to fetch foundation IDs");
        }
        const data = await response.json();
        console.log(data);
        setFoundationIDs(data);
      } catch (error) {
        setError(error.message);
      } 
    };
  
    fetchFoundationIDs();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(foundationIDs);
        const postsData = await Promise.all(
          foundationIDs.map(async (foundationId) => {
            const response = await fetch(
              `/api/foundation/details/${foundationId}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch foundation details");
            }
            return response.json();
          })
        );
        setPosts(postsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    };
  
    fetchData();
  }, [foundationIDs]);

  if (posts.length === 0) {
    return (
      <Loading />
    );
  }
  // console.log(foundationIDs)
  return (
    <div className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className=" h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-foreground sm:text-4xl">
            From our Recommendation
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-foreground/70 sm:mt-4">
          Even the smallest act of kindness, like a drop in the ocean, has the power to create waves of change. In giving, we find the truest measure of our humanity.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.map((post) => (
            <Link to={`/foundation/details/${post._id}`} key={post._id}>
              <div className="flex border-2 flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={post.foundation_image_url}
                    alt=""
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    {/* <p className="text-sm font-medium text-indigo-600">
                    <Link to={`foundation/details/${post._id}`} className="hover:underline">
                      {post.category.name}
                    </Link>
                  </p> */}
                    <p className="text-xl font-semibold text-foreground/90">
                      {post.foundation_name}
                    </p>
                    <p className="mt-3 text-base text-foreground/60">
                      {post.foundation_short_description}
                    </p>
                  </div>
                  {/* <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href={post.author.href}>
                        <span className="sr-only">{post.author.name}</span>
                        <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground/90">
                        <a href={post.author.href} className="hover:underline">
                          {post.author.name}
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.datetime}>{post.date}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readingTime} read</span>
                      </div>
                    </div>
                  </div> */}
                  {
                    // console.log(posts)
                  }
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
