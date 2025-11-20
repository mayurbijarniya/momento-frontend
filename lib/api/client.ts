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
  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl || "",
    bio: user.bio || "",
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
    })),
  };
};

export const createPost = async (post: INewPost) => {
  return null;
};

export const getRecentPosts = async () => {
  return { documents: [] };
};

export const getUserPosts = async (userId?: string) => {
  return { documents: [] };
};

export const likePost = async (postId: string, likeArray: string[]) => {
  return null;
};

export const savePost = async (postId: string, userId: string) => {
  return null;
};

export const deleteSavedPost = async (savedRecordId: string) => {
  return null;
};

export const getPostById = async (postId: string) => {
  return null;
};

export const updatePost = async (post: IUpdatePost) => {
  return null;
};

export const deletePost = async (postId: string, imageId: string) => {
  return null;
};

export const getInfinitePosts = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  return { documents: [] };
};

export const searchPosts = async (searchTerm: string) => {
  return { documents: [] };
};

export const deleteUserAccount = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};
