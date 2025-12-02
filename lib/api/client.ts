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
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, {
      email: user.email,
      password: user.password,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const signOutAccount = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    if (!response.data) {
      return null;
    }
    const user = response.data;

    try {
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
    } catch (savesError) {
      return {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl || "",
        bio: user.bio || "",
        role: user.role || "USER",
        save: [],
      };
    }
  } catch (error: any) {
    throw error;
  }
};

export const getUserById = async (userId: string) => {
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const uploadProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosWithFormData.post(
      `${USERS_API}/upload`,
      formData
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateUser = async (user: IUpdateUser) => {
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const getUsers = async (limit?: number) => {
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const createPost = async (post: INewPost) => {
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const getRecentPosts = async () => {
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const getUserPosts = async (userId?: string) => {
  if (!userId) return { documents: [] };
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const getLikedPosts = async (userId: string) => {
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const likePost = async (postId: string, likeArray: string[]) => {
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const savePost = async (postId: string, userId: string) => {
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const deleteSavedPost = async (postId: string) => {
  try {
    await axiosWithCredentials.delete(`${HTTP_SERVER}/saves`, {
      data: { postId },
    });
    return { status: "ok" };
  } catch (error: any) {
    throw error;
  }
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
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const deletePost = async (postId: string, imageId: string) => {
  try {
    await axiosWithCredentials.delete(`${POSTS_API}/${postId}`);
    return { status: "ok" };
  } catch (error: any) {
    throw error;
  }
};

export const getInfinitePosts = async ({
  pageParam = 0,
  sortBy = "latest",
}: {
  pageParam?: number;
  sortBy?: string;
}) => {
  try {
    const limit = 10;
    const skip = pageParam * limit;
    const response = await axiosWithCredentials.get(
      `${POSTS_API}?limit=${limit}&skip=${skip}&sortBy=${sortBy}`
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
  } catch (error: any) {
    throw error;
  }
};

export const searchPosts = async (searchTerm: string) => {
  try {
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
  } catch (error: any) {
    throw error;
  }
};

export const deleteUserAccount = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const searchExternal = async (query: string, page?: number) => {
  try {
    const response = await axiosWithCredentials.get(
      `${HTTP_SERVER}/external/search`,
      {
        params: { q: query, page: page || 1 },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getExternalDetails = async (id: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${HTTP_SERVER}/external/details/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const followUser = async (followingId: string) => {
  try {
    const response = await axiosWithCredentials.post(`${HTTP_SERVER}/follows`, {
      followingId,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const unfollowUser = async (followingId: string) => {
  try {
    const response = await axiosWithCredentials.delete(
      `${HTTP_SERVER}/follows/${followingId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getFollowers = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${HTTP_SERVER}/follows/followers/${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getFollowing = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${HTTP_SERVER}/follows/following/${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const createReview = async (review: {
  postId?: string;
  externalContentId?: string;
  review: string;
  rating?: number;
}) => {
  try {
    const response = await axiosWithCredentials.post(
      `${HTTP_SERVER}/reviews`,
      review
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getReviewsByPost = async (postId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${HTTP_SERVER}/reviews/post/${postId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getReviewsByExternalContent = async (
  externalContentId: string
) => {
  try {
    const response = await axiosWithCredentials.get(
      `${HTTP_SERVER}/reviews/external/${externalContentId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateReview = async (
  reviewId: string,
  review: { review?: string; rating?: number }
) => {
  try {
    const response = await axiosWithCredentials.put(
      `${HTTP_SERVER}/reviews/${reviewId}`,
      review
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    const response = await axiosWithCredentials.delete(
      `${HTTP_SERVER}/reviews/${reviewId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getNotifications = async () => {
  try {
    const response = await axiosWithCredentials.get(
      `${HTTP_SERVER}/notifications`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUnreadNotificationCount = async () => {
  try {
    const response = await axiosWithCredentials.get(
      `${HTTP_SERVER}/notifications/unread-count`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const response = await axiosWithCredentials.put(
      `${HTTP_SERVER}/notifications/${notificationId}/read`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axiosWithCredentials.put(
      `${HTTP_SERVER}/notifications/read-all`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    const response = await axiosWithCredentials.delete(
      `${HTTP_SERVER}/notifications/${notificationId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getAllUsersAdmin = async () => {
  try {
    const response = await axiosWithCredentials.get(`${HTTP_SERVER}/admin/users`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteUserAdmin = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deletePostAdmin = async (postId: string, imageId?: string) => {
  try {
    const response = await axiosWithCredentials.delete(`${POSTS_API}/${postId}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

const MESSAGES_API = `${HTTP_SERVER}/messages`;

export const sendMessageToAI = async (content: string) => {
  try {
    const response = await axiosWithCredentials.post(
      `${MESSAGES_API}/chat`,
      { content }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getChatHistory = async () => {
  try {
    const response = await axiosWithCredentials.get(MESSAGES_API);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateMessageFeedback = async (
  messageId: string, 
  feedback: "up" | "down" | null
) => {
  try {
    const response = await axiosWithCredentials.put(
      `${MESSAGES_API}/${messageId}/feedback`,
      { feedback }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const clearChatHistory = async () => {
  try {
    const response = await axiosWithCredentials.delete(MESSAGES_API);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

const CONVERSATIONS_API = `${HTTP_SERVER}/conversations`;

export const sendUserMessage = async (receiverId: string, content: string) => {
  try {
    const response = await axiosWithCredentials.post(
      `${CONVERSATIONS_API}/send`,
      { receiverId, content }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUserConversation = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${CONVERSATIONS_API}/${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getConversationPartners = async () => {
  try {
    const response = await axiosWithCredentials.get(CONVERSATIONS_API);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUnreadMessageCount = async () => {
  try {
    const response = await axiosWithCredentials.get(`${CONVERSATIONS_API}/unread-count`);
    return response.data || { count: 0 };
  } catch (error: any) {
    return { count: 0 };
  }
};

export const markConversationAsRead = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.put(`${CONVERSATIONS_API}/${userId}/read`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
