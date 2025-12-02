import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  deletePost,
  deleteSavedPost,
  deleteUserAccount,
  getCurrentUser,
  getInfinitePosts,
  getPostById,
  getRecentPosts,
  getUserById,
  getUserPosts,
  getLikedPosts,
  getUsers,
  likePost,
  savePost,
  searchPosts,
  signInAccount,
  signOutAccount,
  updatePost,
  updateUser,
  searchExternal,
  getExternalDetails,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  createReview,
  getReviewsByPost,
  getReviewsByExternalContent,
  updateReview,
  deleteReview,
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getAllUsersAdmin,
  deleteUserAdmin,
  deletePostAdmin,
  sendMessageToAI,
  getChatHistory,
  updateMessageFeedback,
  clearChatHistory,
  sendUserMessage,
  getUserConversation,
  getConversationPartners,
  getUnreadMessageCount,
  markConversationAsRead,
} from "../api/client";
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSignOutAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOutAccount,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.GET_POST_BY_ID,
          (data as any)?.$id || (data as any)?.id,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deleteSavedPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    retry: 1,
    retryOnMount: false,
  });
};

export const useGetUserPosts = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
};

export const useGetLikedPosts = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId, "liked"],
    queryFn: () => getLikedPosts(userId!),
    enabled: !!userId,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.GET_POST_BY_ID,
          (data as any)?.$id || (data as any)?.id,
        ],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts as any,
    getNextPageParam: (lastPage: any, allPages: any[]) => {
      if (lastPage && lastPage.documents.length === 0) {
        return undefined;
      }
      if (lastPage && lastPage.documents.length < 10) {
        return undefined;
      }
      return allPages.length;
    },
    initialPageParam: 0,
  });
};

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.GET_USER_BY_ID,
          (data as any)?.$id || (data as any)?.id,
        ],
      });
    },
  });
};

export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => deleteUserAccount(userId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useSearchExternal = (query: string, page?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_EXTERNAL, query, page],
    queryFn: () => searchExternal(query, page),
    enabled: !!query,
  });
};

export const useGetExternalDetails = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EXTERNAL_DETAILS, id],
    queryFn: () => getExternalDetails(id),
    enabled: !!id,
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (followingId: string) => followUser(followingId),
    onSuccess: (data, followingId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWERS, followingId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, followingId],
      });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (followingId: string) => unfollowUser(followingId),
    onSuccess: (data, followingId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWERS, followingId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, followingId],
      });
    },
  });
};

export const useGetFollowers = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FOLLOWERS, userId],
    queryFn: () => getFollowers(userId),
    enabled: !!userId,
  });
};

export const useGetFollowing = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FOLLOWING, userId],
    queryFn: () => getFollowing(userId),
    enabled: !!userId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (review: {
      postId?: string;
      externalContentId?: string;
      review: string;
      rating?: number;
    }) => createReview(review),
    onSuccess: (data) => {
      if (data.post) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_REVIEWS_BY_POST, data.post],
        });
      }
      if (data.externalContentId) {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.GET_REVIEWS_BY_EXTERNAL,
            data.externalContentId,
          ],
        });
      }
    },
  });
};

export const useGetReviewsByPost = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_REVIEWS_BY_POST, postId],
    queryFn: () => getReviewsByPost(postId),
    enabled: !!postId,
    staleTime: 0,
    refetchOnMount: true,
  });
};

export const useGetReviewsByExternalContent = (externalContentId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_REVIEWS_BY_EXTERNAL, externalContentId],
    queryFn: () => getReviewsByExternalContent(externalContentId),
    enabled: !!externalContentId,
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reviewId,
      review,
    }: {
      reviewId: string;
      review: { review?: string; rating?: number };
    }) => updateReview(reviewId, review),
    onSuccess: (data) => {
      if (data.post) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_REVIEWS_BY_POST, data.post],
        });
      }
      if (data.externalContentId) {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.GET_REVIEWS_BY_EXTERNAL,
            data.externalContentId,
          ],
        });
      }
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REVIEWS_BY_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_REVIEWS_BY_EXTERNAL],
      });
    },
  });
};

export const useGetNotifications = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
    queryFn: getNotifications,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useGetUnreadNotificationCount = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_UNREAD_NOTIFICATION_COUNT],
    queryFn: getUnreadNotificationCount,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UNREAD_NOTIFICATION_COUNT],
      });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UNREAD_NOTIFICATION_COUNT],
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UNREAD_NOTIFICATION_COUNT],
      });
    },
  });
};

export const useGetAllUsersAdmin = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS, "admin"],
    queryFn: getAllUsersAdmin,
  });
};

export const useDeleteUserAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => deleteUserAdmin(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeletePostAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId?: string }) =>
      deletePostAdmin(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetChatHistory = () => {
  return useQuery({
    queryKey: ["chatHistory"],
    queryFn: getChatHistory,
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => sendMessageToAI(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
    },
  });
};

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ messageId, feedback }: { 
      messageId: string; 
      feedback: "up" | "down" | null 
    }) => updateMessageFeedback(messageId, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
    },
  });
};

export const useClearChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearChatHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
    },
  });
};

export const useGetUserConversation = (userId: string | null) => {
  return useQuery({
    queryKey: ["userConversation", userId],
    queryFn: () => getUserConversation(userId!),
    enabled: !!userId,
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useGetConversationPartners = () => {
  return useQuery({
    queryKey: ["conversationPartners"],
    queryFn: () => getConversationPartners(),
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useGetUnreadMessageCount = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["unreadMessageCount"],
    queryFn: () => getUnreadMessageCount(),
    enabled: enabled,
    refetchInterval: enabled ? 5000 : false,
    refetchOnWindowFocus: enabled,
    refetchOnMount: enabled,
    retry: 1,
  });
};

export const useSendUserMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ receiverId, content }: { receiverId: string; content: string }) =>
      sendUserMessage(receiverId, content),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["userConversation", variables.receiverId] });
      queryClient.invalidateQueries({ queryKey: ["conversationPartners"] });
      queryClient.invalidateQueries({ queryKey: ["unreadMessageCount"] });
    },
  });
};

export const useMarkConversationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => markConversationAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unreadMessageCount"] });
      queryClient.invalidateQueries({ queryKey: ["conversationPartners"] });
      queryClient.refetchQueries({ queryKey: ["conversationPartners"] });
      queryClient.refetchQueries({ queryKey: ["unreadMessageCount"] });
    },
  });
};
