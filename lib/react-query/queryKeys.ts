export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_ID = "getUserById",

  // POST KEYS
  GET_POSTS = "getPosts",
  GET_INFINITE_POSTS = "getInfinitePosts",
  GET_RECENT_POSTS = "getRecentPosts",
  GET_POST_BY_ID = "getPostById",
  GET_USER_POSTS = "getUserPosts",
  GET_FILE_PREVIEW = "getFileView",

  //  SEARCH KEYS
  SEARCH_POSTS = "getSearchPosts",

  // EXTERNAL API KEYS
  SEARCH_EXTERNAL = "searchExternal",
  GET_EXTERNAL_DETAILS = "getExternalDetails",

  // FOLLOW KEYS
  GET_FOLLOWERS = "getFollowers",
  GET_FOLLOWING = "getFollowing",

  // REVIEW KEYS
  GET_REVIEWS_BY_POST = "getReviewsByPost",
  GET_REVIEWS_BY_EXTERNAL = "getReviewsByExternal",

  // NOTIFICATION KEYS
  GET_NOTIFICATIONS = "getNotifications",
  GET_UNREAD_NOTIFICATION_COUNT = "getUnreadNotificationCount",
}
