"use client";

import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import PostStats from "./PostStats";
import Loader from "./Loader";

type PostCardProps = {
  post: any;
};

const PostCard = ({ post }: PostCardProps) => {
  const [loading, setLoading] = useState(true);
  const dateString: string = post.$createdAt || post.createdAt;
  const timestamp: string = timeAgo(dateString);

  const { user, isAuthenticated } = useUserContext();
  if (!post.creator) return null;

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  return (
    <div className="post-card">
      <div className="flex-between mb-5 border-b pb-5 border-dark-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.creator.$id || post.creator.id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 h-12 object-cover"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-slate-500">
              <p className="subtle-semibold lg:small-regular">{timestamp}</p>-
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <Link
            href={`/update-post/${post.$id || post.id}`}
            className={`${
              user.id !== (post.creator.$id || post.creator.id) && "hidden"
            }`}
          >
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              width={18}
              height={18}
            />
          </Link>
        )}
      </div>

      <Link href={`/posts/${post.$id || post.id}`}>
        <div className="relative w-full bg-dark-4 rounded-md overflow-hidden aspect-square">
          {loading && (
            <div className="absolute size-full inset-0 flex justify-center items-center">
              <Loader />
            </div>
          )}
          <img
            src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="post image"
            className={`w-full h-full object-cover ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>

        <div className="small-medium lg:base-medium py-3 border-t border-dark-4 mt-5">
          <p>
            <span className="body-bold">{post.creator.username}</span> :{" "}
            <span className="font-extralight">{post.caption}</span>
          </p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-4">
                {tag ? `#${tag}` : ""}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      <PostStats post={post} userId={user?.id || ""} />
    </div>
  );
};

export default PostCard;
