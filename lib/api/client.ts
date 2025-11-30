import axios from "axios";
import { INewUser, IUpdateUser, INewPost, IUpdatePost } from "@/types";

const axiosWithCredentials = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosWithFormData = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const USERS_API = `${HTTP_SERVER}/users`;
const POSTS_API = `${HTTP_SERVER}/posts`;

export const createUserAccount = async (user: INewUser) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, {
    email: user.email,
    password: user.password,
  });

  return response.data;
};

export const signOutAccount = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  if (!response.data) {
    return null;
  }
  const user = response.data;

  const savesResponse = await axiosWithCredentials.get(
    `${HTTP_SERVER}/saves/user/${user._id}`
  );
  const saves = savesResponse.data.save || [];

  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl || "",
    bio: user.bio || "",
    role: user.role || "USER",
    save: saves,
  };
};

export const getUserById = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
  const user = response.data;
  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl || "",
    bio: user.bio || "",
    lastLogin: user.lastLogin || null,
  };
};

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosWithFormData.post(
    `${USERS_API}/upload`,
    formData
  );
  return response.data;
};

export const updateUser = async (user: IUpdateUser) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user.userId}`,
    {
      name: user.name,
      bio: user.bio,
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    }
  );
  const updatedUser = response.data;
  return {
    id: updatedUser._id,
    name: updatedUser.name,
    username: updatedUser.username,
    email: updatedUser.email,
    imageUrl: updatedUser.imageUrl || "",
    bio: updatedUser.bio || "",
  };
};

export const getUsers = async (limit?: number) => {
  const response = await axiosWithCredentials.get(`${USERS_API}`);
  let users = response.data;
  if (limit) {
    users = users.slice(0, limit);
  }
  return {
    documents: users.map((user: any) => ({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      imageUrl: user.imageUrl || "",
      bio: user.bio || "",
      lastLogin: user.lastLogin || null,
    })),
  };
};

export const createPost = async (post: INewPost) => {
  const formData = new FormData();
  formData.append("file", post.file[0]);
  formData.append("caption", post.caption);
  formData.append("location", post.location || "");
  formData.append("tags", post.tags || "");

  const response = await axiosWithFormData.post(`${POSTS_API}`, formData);
  const postData = response.data;
  return {
    $id: postData._id,
    id: postData._id,
    creator: {
      $id: postData.creator._id,
      id: postData.creator._id,
      name: postData.creator.name,
      username: postData.creator.username,
      imageUrl: postData.creator.imageUrl || "",
    },
    caption: postData.caption,
    imageUrl: postData.imageUrl,
    imageId: postData.imageId,
    location: postData.location,
    tags: postData.tags,
    likes: postData.likes || [],
    $createdAt: postData.createdAt,
    createdAt: postData.createdAt,
  };
};

export const getRecentPosts = async () => {
  const response = await axiosWithCredentials.get(`${POSTS_API}`);
  const posts = response.data.documents || [];
  return {
    documents: posts.map((post: any) => ({
      $id: post._id,
      id: post._id,
      creator: {
        $id: post.creator._id,
        id: post.creator._id,
        name: post.creator.name,
        username: post.creator.username,
        imageUrl: post.creator.imageUrl || "",
      },
      caption: post.caption,
      imageUrl: post.imageUrl,
      imageId: post.imageId,
      location: post.location,
      tags: post.tags || [],
      likes: post.likes || [],
      $createdAt: post.createdAt,
      createdAt: post.createdAt,
    })),
  };
};

export const getUserPosts = async (userId?: string) => {
  if (!userId) return { documents: [] };
  const response = await axiosWithCredentials.get(
    `${POSTS_API}/user/${userId}`
  );
  const posts = response.data.documents || [];
  return {
    documents: posts.map((post: any) => ({
      $id: post._id,
      id: post._id,
      creator: {
        $id: post.creator._id,
        id: post.creator._id,
        name: post.creator.name,
        username: post.creator.username,
        imageUrl: post.creator.imageUrl || "",
      },
      caption: post.caption,
      imageUrl: post.imageUrl,
      imageId: post.imageId,
      location: post.location,
      tags: post.tags || [],
      likes: post.likes || [],
      $createdAt: post.createdAt,
      createdAt: post.createdAt,
    })),
  };
};

export const getLikedPosts = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${POSTS_API}/user/${userId}/liked`
  );
  const posts = response.data.documents || [];
  return {
    documents: posts.map((post: any) => ({
      $id: post._id,
      id: post._id,
      creator: {
        $id: post.creator._id,
        id: post.creator._id,
        name: post.creator.name,
        username: post.creator.username,
        imageUrl: post.creator.imageUrl || "",
      },
      caption: post.caption,
      imageUrl: post.imageUrl,
      imageId: post.imageId,
      location: post.location,
      tags: post.tags || [],
      likes: post.likes || [],
      $createdAt: post.createdAt,
      createdAt: post.createdAt,
    })),
  };
};

export const likePost = async (postId: string, likeArray: string[]) => {
  const response = await axiosWithCredentials.put(
    `${POSTS_API}/${postId}/like`,
    {
      likesArray: likeArray,
    }
  );
  const postData = response.data;
  return {
    $id: postData._id,
    id: postData._id,
    likes: postData.likes || [],
  };
};

export const savePost = async (postId: string, userId: string) => {
  const response = await axiosWithCredentials.post(`${HTTP_SERVER}/saves`, {
    postId,
  });
  return {
    $id: response.data._id,
    id: response.data._id,
    post: {
      $id: response.data.post,
      id: response.data.post,
    },
  };
};

export const deleteSavedPost = async (postId: string) => {
  await axiosWithCredentials.delete(`${HTTP_SERVER}/saves`, {
    data: { postId },
  });
  return { status: "ok" };
};

export const getPostById = async (postId: string) => {
  try {
    const response = await axiosWithCredentials.get(`${POSTS_API}/${postId}`);
    const postData = response.data;

    if (!postData) {
      throw new Error("Post not found");
    }

    return {
      $id: postData._id,
      id: postData._id,
      creator: {
        $id: postData.creator._id,
        id: postData.creator._id,
        name: postData.creator.name,
        username: postData.creator.username,
        imageUrl: postData.creator.imageUrl || "",
      },
      caption: postData.caption,
      imageUrl: postData.imageUrl,
      imageId: postData.imageId,
      location: postData.location,
      tags: postData.tags || [],
      likes: postData.likes || [],
      $createdAt: postData.createdAt,
      createdAt: postData.createdAt,
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Post not found");
    }
    throw error;
  }
};

export const updatePost = async (post: IUpdatePost) => {
  const formData = new FormData();
  if (post.file && post.file.length > 0) {
    formData.append("file", post.file[0]);
  }
  formData.append("caption", post.caption);
  formData.append("location", post.location || "");
  formData.append("tags", post.tags || "");

  const response = await axiosWithFormData.put(
    `${POSTS_API}/${post.postId}`,
    formData
  );
  const postData = response.data;
  return {
    $id: postData._id,
    id: postData._id,
    creator: {
      $id: postData.creator._id,
      id: postData.creator._id,
      name: postData.creator.name,
      username: postData.creator.username,
      imageUrl: postData.creator.imageUrl || "",
    },
    caption: postData.caption,
    imageUrl: postData.imageUrl,
    imageId: postData.imageId,
    location: postData.location,
    tags: postData.tags || [],
    likes: postData.likes || [],
    $createdAt: postData.createdAt,
    createdAt: postData.createdAt,
  };
};

export const deletePost = async (postId: string, imageId: string) => {
  await axiosWithCredentials.delete(`${POSTS_API}/${postId}`);
  return { status: "ok" };
};

export const getInfinitePosts = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}) => {
  const limit = 10;
  const skip = pageParam * limit;
  const response = await axiosWithCredentials.get(
    `${POSTS_API}?limit=${limit}&skip=${skip}`
  );
  const posts = response.data.documents || [];
  return {
    documents: posts.map((post: any) => ({
      $id: post._id,
      id: post._id,
      creator: {
        $id: post.creator._id,
        id: post.creator._id,
        name: post.creator.name,
        username: post.creator.username,
        imageUrl: post.creator.imageUrl || "",
      },
      caption: post.caption,
      imageUrl: post.imageUrl,
      imageId: post.imageId,
      location: post.location,
      tags: post.tags || [],
      likes: post.likes || [],
      $createdAt: post.createdAt,
      createdAt: post.createdAt,
    })),
  };
};

export const searchPosts = async (searchTerm: string) => {
  const response = await axiosWithCredentials.get(`${POSTS_API}/search`, {
    params: { searchTerm },
  });
  const posts = response.data.documents || [];
  return {
    documents: posts.map((post: any) => ({
      $id: post._id,
      id: post._id,
      creator: {
        $id: post.creator._id,
        id: post.creator._id,
        name: post.creator.name,
        username: post.creator.username,
        imageUrl: post.creator.imageUrl || "",
      },
      caption: post.caption,
      imageUrl: post.imageUrl,
      imageId: post.imageId,
      location: post.location,
      tags: post.tags || [],
      likes: post.likes || [],
      $createdAt: post.createdAt,
      createdAt: post.createdAt,
    })),
  };
};

export const deleteUserAccount = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const searchExternal = async (query: string, page?: number) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/external/search`,
    {
      params: { q: query, page: page || 1 },
    }
  );
  return response.data;
};

export const getExternalDetails = async (id: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/external/details/${id}`
  );
  return response.data;
};

export const followUser = async (followingId: string) => {
  const response = await axiosWithCredentials.post(`${HTTP_SERVER}/follows`, {
    followingId,
  });
  return response.data;
};

export const unfollowUser = async (followingId: string) => {
  const response = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/follows/${followingId}`
  );
  return response.data;
};

export const getFollowers = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/follows/followers/${userId}`
  );
  return response.data;
};

export const getFollowing = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/follows/following/${userId}`
  );
  return response.data;
};

export const createReview = async (review: {
  postId?: string;
  externalContentId?: string;
  review: string;
  rating?: number;
}) => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/reviews`,
    review
  );
  return response.data;
};

export const getReviewsByPost = async (postId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/reviews/post/${postId}`
  );
  return response.data;
};

export const getReviewsByExternalContent = async (
  externalContentId: string
) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/reviews/external/${externalContentId}`
  );
  return response.data;
};

export const updateReview = async (
  reviewId: string,
  review: { review?: string; rating?: number }
) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/reviews/${reviewId}`,
    review
  );
  return response.data;
};

export const deleteReview = async (reviewId: string) => {
  const response = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/reviews/${reviewId}`
  );
  return response.data;
};

export const getNotifications = async () => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/notifications`
  );
  return response.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/notifications/unread-count`
  );
  return response.data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/notifications/${notificationId}/read`
  );
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/notifications/read-all`
  );
  return response.data;
};

export const deleteNotification = async (notificationId: string) => {
  const response = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/notifications/${notificationId}`
  );
  return response.data;
};

export const getAllUsersAdmin = async () => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/admin/users`);
  return response.data;
};

export const deleteUserAdmin = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const deletePostAdmin = async (postId: string, imageId?: string) => {
  const response = await axiosWithCredentials.delete(`${POSTS_API}/${postId}`);
  return response.data;
};

const MESSAGES_API = `${HTTP_SERVER}/messages`;

export const sendMessageToAI = async (content: string) => {
  const response = await axiosWithCredentials.post(
    `${MESSAGES_API}/chat`,
    { content }
  );
  return response.data;
};

export const getChatHistory = async () => {
  const response = await axiosWithCredentials.get(MESSAGES_API);
  return response.data;
};

export const updateMessageFeedback = async (
  messageId: string, 
  feedback: "up" | "down" | null
) => {
  const response = await axiosWithCredentials.put(
    `${MESSAGES_API}/${messageId}/feedback`,
    { feedback }
  );
  return response.data;
};

export const clearChatHistory = async () => {
  const response = await axiosWithCredentials.delete(MESSAGES_API);
  return response.data;
};

const CONVERSATIONS_API = `${HTTP_SERVER}/conversations`;

export const sendUserMessage = async (receiverId: string, content: string) => {
  const response = await axiosWithCredentials.post(
    `${CONVERSATIONS_API}/send`,
    { receiverId, content }
  );
  return response.data;
};

export const getUserConversation = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${CONVERSATIONS_API}/${userId}`
  );
  return response.data;
};

export const getConversationPartners = async () => {
  const response = await axiosWithCredentials.get(CONVERSATIONS_API);
  return response.data;
};

export const getUnreadMessageCount = async () => {
  try {
    const response = await axiosWithCredentials.get(`${CONVERSATIONS_API}/unread-count`);
    return response.data || { count: 0 };
  } catch (error: any) {
    // Return default structure if error
    return { count: 0 };
  }
};

export const markConversationAsRead = async (userId: string) => {
  const response = await axiosWithCredentials.put(`${CONVERSATIONS_API}/${userId}/read`);
  return response.data;
};
