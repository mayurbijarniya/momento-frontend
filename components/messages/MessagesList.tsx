"use client";
import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetUsers, useGetFollowing, useGetConversationPartners } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

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

  const allUsers = usersData?.documents || [];
  const following = Array.isArray(followingData) ? followingData : [];
  const conversationPartnerIds = conversationPartnersData?.partnerIds || [];

  // Filter users to show only those we follow or have conversed with
  const filteredUsers = useMemo(() => {
    // Get IDs of users we follow
    const followingIds = new Set(
      following.map((user: any) => user._id || user.id)
    );

    // Combine: users we follow OR users we've had conversations with
    const allowedUserIds = new Set([
      ...Array.from(followingIds),
      ...conversationPartnerIds,
    ]);

    return allUsers.filter(
      (user: any) =>
        user.id !== currentUser?.id &&
        allowedUserIds.has(user.id) &&
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [allUsers, following, conversationPartnerIds, currentUser?.id, searchQuery]);

  return (
    <div className="flex flex-col h-full w-full bg-dark-2 border-r border-dark-4">
      <div className="p-4 border-b border-dark-4">
        <h2 className="text-xl font-bold text-light-1 mb-4">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-4 text-light-1 placeholder-light-3 rounded-lg px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg
            className="absolute left-3 top-2.5 text-light-3"
            width="20"
            height="20"
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
          className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-dark-3 transition-colors border-b border-dark-4 ${
            selectedUserId === null ? "bg-dark-3" : ""
          }`}
        >
          <div className="relative">
            <img
              src="/assets/images/momento-ai-avatar.svg"
              alt="Momento AI"
              className="w-14 h-14 rounded-full"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-2" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-semibold text-light-1">Momento AI</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  stroke="#0095F6"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </div>
            <p className="text-sm text-light-3 truncate">Your AI assistant for social media</p>
          </div>
        </div>

        {filteredUsers.map((user: any) => (
          <div
            key={user.id}
            onClick={() => router.push(`/messages/${user.id}`)}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-dark-3 transition-colors border-b border-dark-4 ${
              selectedUserId === user.id ? "bg-dark-3" : ""
            }`}
          >
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-light-1">{user.name}</span>
                <span className="text-xs text-light-3">Now</span>
              </div>
              <p className="text-sm text-light-3 truncate">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
