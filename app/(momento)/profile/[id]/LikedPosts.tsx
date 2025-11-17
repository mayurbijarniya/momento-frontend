import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();





  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      <>
      {(!(currentUser as any).liked || (currentUser as any).liked.length === 0) && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={(currentUser as any).liked || []} showStats={false} />
    </>
    </>
  );
};

export default LikedPosts;
