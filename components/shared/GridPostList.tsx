import { useUserContext } from "@/context/AuthContext";
import Link from "next/link";
import PostStats from "./PostStats";

type GridPostListProps = {
  posts: any[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container p-10 max-md:p-5">
      {posts.map((post) => (
        <li key={post.$id || post.id} className="relative min-w-80 h-70   ">
          <Link
            href={`/posts/${post.$id || post.id}`}
            className="grid-post_link"
          >
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={post.creator.imageUrl}
                  alt="creator"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
