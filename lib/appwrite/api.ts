export async function createUserAccount(user: any) {
  return null;
}

export async function signInAccount(user: { email: string; password: string }) {
  return null;
}

export async function getCurrentUser() {
  return null;
}

export async function signOutAccount() {
  return null;
}

export async function createPost(post: any) {
  return null;
}

export async function getRecentPosts() {
  return { documents: [] };
}

export async function getUserPosts(userId?: string) {
  return { documents: [] };
}

export async function likePost(postId: string, likeArray: string[]) {
  return null;
}

export async function savePost(postId: string, userId: string) {
  return null;
}

export async function deleteSavedPost(savedRecordId: string) {
  return null;
}

export async function getPostById(postId: string) {
  return null;
}

export async function updatePost(post: any) {
  return null;
}

export async function deletePost(postId: string, imageId: string) {
  return null;
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  return { documents: [] };
}

export async function searchPosts(searchTerm: string) {
  return { documents: [] };
}

export async function getUsers(limit?: number) {
  return { documents: [] };
}

export async function getUserById(userId: string) {
  return null;
}

export async function updateUser(user: any) {
  return null;
}

