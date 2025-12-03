"use client";
import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetUsers,
  useGetFollowing,
  useGetConversationPartners,
  useMarkConversationAsRead,
} from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { formatMessageTime } from "@/lib/utils";

const isUserActive = (lastLogin: string | Date | null | undefined): boolean => {
  if (!lastLogin) {
    return false;
  }
  const loginDate = new Date(lastLogin);
  const now = new Date();
  const diffInMs = now.getTime() - loginDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  return diffInMinutes < 1;
};

interface MessagesListProps {
  selectedUserId: string | null;
}

const MessagesList = ({ selectedUserId }: MessagesListProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: usersData } = useGetUsers();
  const { user: currentUser } = useUserContext();
  const { data: followingData } = useGetFollowing(currentUser?.id || "");
  const { data: conversationPartnersData } = useGetConversationPartners();
  const { mutate: markAsRead } = useMarkConversationAsRead();

  const allUsers = usersData?.documents || [];
  const following = Array.isArray(followingData) ? followingData : [];
  const conversationPartners = conversationPartnersData?.partners || [];

  const partnerDataMap = useMemo(() => {
    const map = new Map();
    conversationPartners.forEach((partner: any) => {
      map.set(partner.partnerId, {
        lastMessageTime: partner.lastMessageTime,
        lastMessageContent: partner.lastMessageContent,
        lastMessageSenderId: partner.lastMessageSenderId,
        unreadCount: partner.unreadCount || 0,
      });
    });
    return map;
  }, [conversationPartners]);

  const filteredUsers = useMemo(() => {
    const followingIds = new Set(
      following.map((user: any) => user._id || user.id)
    );

    const usersWithConversations = allUsers
      .filter((user: any) => user.id !== currentUser?.id)
      .map((user: any) => {
        const partnerData = partnerDataMap.get(user.id);
        return {
          ...user,
          lastMessageTime: partnerData?.lastMessageTime,
          lastMessageContent: partnerData?.lastMessageContent,
          lastMessageSenderId: partnerData?.lastMessageSenderId,
          unreadCount: partnerData?.unreadCount || 0,
        };
      })
      .filter((user: any) => user.lastMessageTime);

    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      const searchedFollowing = allUsers
        .filter((user: any) => {
          return (
            user.id !== currentUser?.id &&
            followingIds.has(user.id) &&
            !partnerDataMap.has(user.id) &&
            (user.name.toLowerCase().includes(searchLower) ||
              user.username.toLowerCase().includes(searchLower))
          );
        })
        .map((user: any) => ({
          ...user,
          lastMessageTime: null,
          lastMessageContent: null,
          lastMessageSenderId: null,
          unreadCount: 0,
        }));

      const searchedConversations = usersWithConversations.filter(
        (user: any) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower)
      );

      return [...searchedConversations, ...searchedFollowing].sort(
        (a: any, b: any) => {
          if (a.lastMessageTime && !b.lastMessageTime) return -1;
          if (!a.lastMessageTime && b.lastMessageTime) return 1;
          if (!a.lastMessageTime && !b.lastMessageTime) return 0;
          return (
            new Date(b.lastMessageTime).getTime() -
            new Date(a.lastMessageTime).getTime()
          );
        }
      );
    }

    return usersWithConversations.sort((a: any, b: any) => {
      if (!a.lastMessageTime && !b.lastMessageTime) return 0;
      if (!a.lastMessageTime) return 1;
      if (!b.lastMessageTime) return -1;
      return (
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
      );
    });
  }, [
    allUsers,
    following,
    conversationPartners,
    partnerDataMap,
    currentUser?.id,
    searchQuery,
  ]);

  return (
    <div className="flex flex-col h-full w-full bg-dark-1 border-r border-dark-4">
      <div className="p-4 border-b border-dark-4">
        <h2 className="text-xl font-bold text-light-1 mb-4">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-4 text-light-1 placeholder-light-3 rounded-lg px-4 py-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary-500 border border-dark-3"
          />
          <svg
            className="absolute left-3 top-3 text-light-3"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div
          onClick={() => router.push("/messages/ai")}
          className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-dark-2 transition-colors border-b border-dark-4 ${
            selectedUserId === null ? "bg-dark-2" : ""
          }`}
        >
          <div className="relative">
            <img
              src="/assets/images/momento-ai-avatar.svg"
              alt="Momento AI"
              className="w-14 h-14 rounded-full"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-1" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-semibold text-light-1">Momento AI</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  stroke="#0095F6"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </div>
            <p className="text-sm text-light-3 truncate">
              Your AI assistant for social media
            </p>
          </div>
        </div>

        {filteredUsers.map((user: any) => {
          const userIsActive = isUserActive(user.lastLogin);
          const hasUnread = user.unreadCount > 0;
          const isLastMessageFromUser =
            user.lastMessageSenderId === currentUser?.id;

          return (
            <div
              key={user.id}
              onClick={() => {
                if (user.unreadCount > 0) {
                  markAsRead(user.id);
                }
                router.push(`/messages/${user.id}`);
              }}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-dark-2 transition-colors border-b border-dark-4 ${
                selectedUserId === user.id
                  ? "bg-dark-2"
                  : hasUnread
                  ? "bg-dark-2/50"
                  : ""
              }`}
            >
              <div className="relative">
                <img
                  src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt={user.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
                />
                {userIsActive && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-1" />
                )}
                {hasUnread && (
                  <span
                    className={`absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg z-10 ${
                      user.unreadCount > 9 ? "min-w-[20px] h-5 px-1" : "w-5 h-5"
                    }`}
                  >
                    {user.unreadCount > 9 ? "9+" : user.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`${
                      hasUnread ? "font-bold" : "font-semibold"
                    } text-light-1`}
                  >
                    {user.name}
                  </span>
                  {user.lastMessageTime && (
                    <span
                      className={`text-xs ${
                        hasUnread ? "text-light-1 font-medium" : "text-light-3"
                      } whitespace-nowrap ml-2`}
                    >
                      {formatMessageTime(user.lastMessageTime)}
                    </span>
                  )}
                </div>
                {user.lastMessageContent ? (
                  <p
                    className={`text-sm truncate ${
                      hasUnread ? "text-light-1 font-medium" : "text-light-3"
                    }`}
                  >
                    {isLastMessageFromUser ? "You: " : ""}
                    {user.lastMessageContent}
                  </p>
                ) : (
                  <p className="text-sm text-light-3 truncate">
                    @{user.username}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesList;
