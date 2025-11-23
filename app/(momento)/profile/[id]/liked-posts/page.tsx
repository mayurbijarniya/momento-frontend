"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import LikedPosts from "@/app/(momento)/profile/[id]/LikedPosts";
import { useGetUserById } from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LikedPostsPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useUserContext();
  const router = useRouter();
  const userId = Array.isArray(id) ? id[0] : id || "";
  const { data: currentUser } = useGetUserById(userId);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }
    if (user.id !== userId) {
      router.push(`/profile/${userId}`);
      return;
    }
  }, [isAuthenticated, user.id, userId, router]);

  if (!currentUser) {
    return (
      <div className="flex-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              (currentUser as any).imageUrl ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full object-cover"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {(currentUser as any).name}
              </h1>
              <p className="small-regular md:body-medium text-slate-400 text-center xl:text-left">
                @{(currentUser as any).username}
              </p>
            </div>
          </div>
        </div>
      </div>

      {user.id === userId && (
        <div className="flex max-w-5xl justify-center w-full">
          <Link
            href={`/profile/${userId}`}
            className="profile-tab rounded-l-lg"
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            href={`/profile/${userId}/liked-posts`}
            className="profile-tab rounded-r-lg !bg-dark-4"
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      {user.id === userId ? <LikedPosts /> : null}
    </div>
  );
};

export default LikedPostsPage;

