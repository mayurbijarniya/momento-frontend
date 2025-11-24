"use client";

import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { isAuthenticated, isLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  const savePosts = (currentUser as any)?.save
    ?.map((savePost: any) => ({
      ...savePost.post,
      creator: {
        imageUrl: (currentUser as any).imageUrl,
      },
    }))
    .reverse() || [];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-slate-400">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
