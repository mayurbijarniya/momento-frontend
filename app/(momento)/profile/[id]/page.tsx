"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import LikedPosts from "@/app/(momento)/profile/[id]/LikedPosts";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserById,
  useGetUserPosts,
  useSignOutAccount,
  useDeleteUserAccount,
  useFollowUser,
  useUnfollowUser,
  useGetFollowers,
  useGetFollowing,
} from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import DeleteAccountDialog from "@/components/shared/DeleteAccountDialog";
import FollowersFollowingDialog from "@/components/shared/FollowersFollowingDialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Oops from "@/components/shared/Oops";
import { useToast } from "@/components/ui/use-toast";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({
  value,
  label,
  onClick,
}: StabBlockProps & { onClick?: () => void }) => (
  <div
    className={`flex-center gap-2 ${
      onClick ? "cursor-pointer hover:opacity-80 transition" : ""
    }`}
    onClick={onClick}
  >
    <p className="small-semibold lg:body-bold text-white">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useUserContext();
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [followersDialogOpen, setFollowersDialogOpen] = useState(false);
  const [followingDialogOpen, setFollowingDialogOpen] = useState(false);

  const { mutate: signOutMutation, isSuccess } = useSignOutAccount();
  const { signOut } = useUserContext();
  const { mutateAsync: deleteAccount, isPending: isDeleting } =
    useDeleteUserAccount();

  useEffect(() => {
    if (isSuccess) {
      signOut().then(() => {
        router.push("/sign-in");
      });
    }
  }, [isSuccess, router, signOut]);

  const userId = Array.isArray(id) ? id[0] : id || "";
  const { data: currentUser } = useGetUserById(userId);
  const { data: userPosts } = useGetUserPosts(userId);
  const { data: followers = [], isLoading: isLoadingFollowers } =
    useGetFollowers(userId);
  const { data: following = [], isLoading: isLoadingFollowing } =
    useGetFollowing(userId);
  const { mutate: followUser, isPending: isFollowing } = useFollowUser();
  const { mutate: unfollowUser, isPending: isUnfollowing } = useUnfollowUser();

  // Check if current user is following this profile user
  // Followers list contains users who follow the profile user
  // So if current user is in followers list, they are following the profile user
  const isFollowingUser =
    isAuthenticated &&
    Array.isArray(followers) &&
    followers.some((f: any) => (f._id || f.id) === user.id);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(userId);
      toast({
        title: "Account deleted successfully",
        description: "Your account has been permanently deleted.",
      });
      await signOut();
      router.push("/sign-in");
    } catch (error) {
      toast({
        title: "Failed to delete account",
        description:
          "An error occurred while deleting your account. Please try again.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleFollow = () => {
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }
    followUser(userId, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "You are now following this user.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Failed to follow",
          description:
            error?.response?.data?.message ||
            "Failed to follow user. Please try again.",
        });
      },
    });
  };

  const handleUnfollow = () => {
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }
    unfollowUser(userId, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "You have unfollowed this user.",
        });
      },
      onError: () => {
        toast({
          title: "Failed to unfollow",
          description: "Failed to unfollow user. Please try again.",
        });
      },
    });
  };

  if (!currentUser)
    return (
      <div className="flex-center w-full h-screen">
        <Loader />
      </div>
    );

  const posts = userPosts?.documents || [];

  return (
    <>
      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteAccount}
        isLoading={isDeleting}
      />
      {isAuthenticated ? (
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

                <div className="flex flex-col gap-8 mt-10 items-start max-xl:items-center justify-center p-2 xl:justify-start flex-wrap z-20">
                  <StatBlock value={posts.length} label="Posts" />
                  <StatBlock
                    value={Array.isArray(followers) ? followers.length : 0}
                    label="Followers"
                    onClick={() => setFollowersDialogOpen(true)}
                  />
                  <StatBlock
                    value={Array.isArray(following) ? following.length : 0}
                    label="Following"
                    onClick={() => setFollowingDialogOpen(true)}
                  />
                </div>

                <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                  {(currentUser as any).bio}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                {/* Follow/Unfollow Button - Show when viewing other user's profile */}
                {user.id !==
                  ((currentUser as any).$id || (currentUser as any).id) && (
                  <div className="flex-center flex-col gap-3">
                    <Button
                      onClick={isFollowingUser ? handleUnfollow : handleFollow}
                      disabled={isFollowing || isUnfollowing}
                      className="h-12 bg-white text-black hover:bg-gray-300 font-semibold px-6"
                    >
                      {isFollowing || isUnfollowing
                        ? "Loading..."
                        : isFollowingUser
                        ? "Unfollow"
                        : "Follow"}
                    </Button>
                  </div>
                )}

                {/* Edit/Delete Buttons - Show when viewing own profile */}
                {user.id ===
                  ((currentUser as any).$id || (currentUser as any).id) && (
                  <div className="flex-center flex-col gap-3">
                    <Link
                      href={`/update-profile/${
                        (currentUser as any).$id ||
                        (currentUser as any).id ||
                        userId
                      }`}
                      className={`h-12 hover:bg-dark-4 bg-white group  flex-center gap-2 rounded-lg w-32`}
                    >
                      <img
                        src={"/assets/icons/edit.svg"}
                        alt="edit"
                        width={20}
                        height={20}
                        className=" invert group-hover:invert-0 "
                      />
                      <p className="font-semibold whitespace-nowrap group-hover:text-white text-black ">
                        Edit Profile
                      </p>
                    </Link>
                    <button
                      onClick={() => setIsDeleteDialogOpen(true)}
                      className="h-12 hover:bg-dark-4 bg-white group flex-center gap-2 rounded-lg w-auto px-4 mt-2"
                    >
                      <img
                        src={"/assets/icons/delete.svg"}
                        alt="delete"
                        width={20}
                        height={20}
                        className="brightness-0 transition-all duration-200 group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:saturate-[10000%] group-hover:hue-rotate-[0deg] group-hover:brightness-[0.9]"
                      />
                      <p className="font-semibold whitespace-nowrap group-hover:text-white text-black ">
                        Delete Account
                      </p>
                    </button>
                    <Button
                      variant="ghost"
                      className="hover:bg-dark-4 group w-24 mt-2 md:hidden"
                      onClick={() => signOutMutation()}
                    >
                      <img src="/assets/icons/logout.svg" alt="logout" />
                      <p className=" ml-2 font-semibold">Logout</p>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {((currentUser as any).$id || (currentUser as any).id) ===
            user.id && (
            <div className="flex max-w-5xl justify-center w-full">
              <Link
                href={`/profile/${userId}`}
                className={`profile-tab rounded-l-lg ${
                  pathname === `/profile/${userId}` && "!bg-dark-4"
                }`}
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
                className={`profile-tab rounded-r-lg ${
                  pathname === `/profile/${userId}/liked-posts` && "!bg-dark-4"
                }`}
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

          {pathname === `/profile/${userId}/liked-posts` ? (
            ((currentUser as any).$id || (currentUser as any).id) ===
            user.id ? (
              <LikedPosts />
            ) : null
          ) : (
            <GridPostList posts={posts} showUser={false} />
          )}
        </div>
      ) : (
        <Oops />
      )}

      {/* Followers/Following Dialogs */}
      <FollowersFollowingDialog
        isOpen={followersDialogOpen}
        onClose={() => setFollowersDialogOpen(false)}
        type="followers"
        users={Array.isArray(followers) ? followers : []}
        isLoading={isLoadingFollowers}
      />
      <FollowersFollowingDialog
        isOpen={followingDialogOpen}
        onClose={() => setFollowingDialogOpen(false)}
        type="following"
        users={Array.isArray(following) ? following : []}
        isLoading={isLoadingFollowing}
      />
    </>
  );
};

export default Profile;
