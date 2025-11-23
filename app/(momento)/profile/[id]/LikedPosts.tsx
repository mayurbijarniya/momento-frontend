"use client";

import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetLikedPosts } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const LikedPosts = () => {
  const { user } = useUserContext();
  const { data: likedPosts, isLoading } = useGetLikedPosts(user.id);

  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const posts = likedPosts?.documents || [];

  if (posts.length === 0) {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No liked posts</p>
    );
  }

  return <GridPostList posts={posts} showStats={false} />;
};

export default LikedPosts;
