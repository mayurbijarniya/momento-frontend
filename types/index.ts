export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId?: string;
  imageUrl?: URL | string;
  imageData?: string;
  imageMimeType?: string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
  role?: "USER" | "ADMIN";
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
  role?: "USER" | "ADMIN";
};

export interface IMessage {
  _id: string;
  userId: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string | null;
  feedback?: "up" | "down" | null;
  createdAt: string;
}

export interface IChatHistory {
  messages: IMessage[];
}

export interface IUserConversation {
  messages: Array<{
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    imageUrl?: string | null;
    createdAt: string;
    read?: boolean;
  }>;
}
