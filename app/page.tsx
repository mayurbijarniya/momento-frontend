"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutation";

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUserContext();
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="md:w-[90vw] xl:w-[70vw] 2xl:w-[58vw] max-md:w-full mx-auto md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 md:h-screen min-h-[100vh]">
        <div className="flex flex-1">
          <div className="home-container">
            <div className="home-posts">
              <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
              {isPostLoading && !posts ? (
                <Loader />
              ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full 2xl:px-10 lg:px-6 md:px-5 sm:px-2">
                  {posts?.documents?.map((post: any) => (
                    <li key={post.$id || post.id}>
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
      <Bottombar />
    </div>
  );
}

