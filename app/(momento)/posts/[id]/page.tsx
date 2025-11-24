"use client";

import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutation";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const PostDetails = () => {
  const router = useRouter();

  const { id } = useParams();
  const postId = Array.isArray(id) ? id[0] : id || "";
  const { data: post, isPending } = useGetPostById(postId);

  const { user, isAuthenticated } = useUserContext();

  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }
    if (postId && post && (post as any).imageId) {
      deletePost({ postId: postId, imageId: (post as any).imageId });
      router.push("/");
    }
  };

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card ">
          <img
            src={(post as any)?.imageUrl}
            alt="creator"
            className="post_details-img object-contain size-full"
          />
          <div className="post_details-info">
            <div className="flex-between w-full ">
              <Link
                href={`/profile/${(post as any)?.creator?.$id || (post as any)?.creator?.id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    (post as any)?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="post"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12 object-contain"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {(post as any)?.creator?.name}
                  </p>
                  <div className="flex items-center flex-wrap gap-2 text-slate-400">
                    <p className="subtle-semibold lg:small-regular">
                      {timeAgo((post as any)?.$createdAt || (post as any)?.createdAt)},
                    </p>
                    <p className="subtle-semibold lg:small-regular">
                      {(post as any)?.location}
                    </p>
                  </div>
                </div>
              </Link>

              {isAuthenticated && (
                <div className="flex-center ">
                  <Link
                    href={`/update-post/${(post as any)?.$id || (post as any)?.id}`}
                    className={`${user.id !== ((post as any)?.creator?.$id || (post as any)?.creator?.id) && "hidden"}`}
                  >
                    <img
                      src="/assets/icons/edit.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </Link>
                  <Button
                    onClick={handleDeletePost}
                    variant={`ghost`}
                    className={`ghost_details-delete_btn ${
                      user.id !== ((post as any)?.creator.$id || (post as any)?.creator.id) && "hidden"
                    }`}
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="delete"
                      width={20}
                      height={20}
                    />
                  </Button>
                </div>
              )}
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{(post as any)?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {(post as any)?.tags?.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    {tag ? `#${tag}` : ""}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post as any} userId={user?.id || ""} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
