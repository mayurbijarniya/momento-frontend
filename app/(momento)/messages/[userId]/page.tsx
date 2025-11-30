"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetChatHistory,
  useSendMessage,
  useGetUserConversation,
  useSendUserMessage,
  useGetUserById,
  useMarkConversationAsRead,
} from "@/lib/react-query/queriesAndMutation";
import { useQueryClient } from "@tanstack/react-query";
import MessagesList from "@/components/messages/MessagesList";
import ChatHeader from "@/components/messages/ChatHeader";
import MessageBubble from "@/components/messages/MessageBubble";
import ChatInput from "@/components/messages/ChatInput";
import TypingIndicator from "@/components/messages/TypingIndicator";
import Loader from "@/components/shared/Loader";
import { IMessage } from "@/types";

const INITIAL_GREETING: IMessage = {
  _id: "greeting",
  userId: "ai",
  role: "assistant",
  content: "Hey! What's on your mind right now?",
  createdAt: new Date().toISOString(),
};

const ChatPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  const { user, isAuthenticated, isLoading: authLoading } = useUserContext();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [showMessagesList, setShowMessagesList] = useState(false);
  const isAI = userId === "ai";
  const selectedUserId = isAI ? null : userId;

  const { data: chatData, isLoading: historyLoading } = useGetChatHistory();
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();
  const { data: userConversationData, isLoading: conversationLoading } = useGetUserConversation(selectedUserId);
  const { mutate: sendUserMsg, isPending: isSendingUser } = useSendUserMessage();
  const { data: userData } = useGetUserById(selectedUserId || "");
  const { mutate: markAsRead } = useMarkConversationAsRead();

  const aiMessages = chatData?.messages || [];
  const userMessages = userConversationData?.messages || [];
  const displayMessages = isAI ? (aiMessages.length > 0 ? aiMessages : [INITIAL_GREETING]) : userMessages;

  const selectedUserName = isAI ? "Momento AI" : userData?.name || "User";
  const selectedUserImage = isAI ? "/assets/images/momento-ai-avatar.svg" : userData?.imageUrl || "/assets/icons/profile-placeholder.svg";

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      console.log("Redirecting to sign-in from chat page");
      router.push("/sign-in");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, userMessages, isSending, isSendingUser]);

  // Mark messages as read when viewing a conversation
  useEffect(() => {
    if (!isAI && selectedUserId && isAuthenticated) {
      markAsRead(selectedUserId);
    }
  }, [selectedUserId, isAI, isAuthenticated, markAsRead]);

  const handleBackToList = () => {
    setShowMessagesList(true);
  };

  const handleSend = (content: string) => {
    if (isAI) {
      sendMessage(content);
    } else {
      sendUserMsg({ receiverId: userId, content });
    }
  };

  if (authLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="flex w-full h-screen max-h-screen bg-dark-1">
        <div className={`${showMessagesList ? "flex" : "hidden md:flex"} w-full md:w-80 lg:w-96 flex-shrink-0`}>
          <MessagesList selectedUserId={selectedUserId} />
        </div>

        <div className={`${showMessagesList ? "hidden md:flex" : "flex"} flex-1 flex-col h-screen max-h-screen`}>
          <div className="flex-shrink-0">
            <ChatHeader
              userName={selectedUserName}
              userImage={selectedUserImage}
              isAI={isAI}
              onBack={handleBackToList}
              userId={isAI ? undefined : userId}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {(isAI ? historyLoading : conversationLoading) ? (
              <div className="flex-center w-full h-full">
                <Loader />
              </div>
            ) : displayMessages.length > 0 ? (
              <>
                {displayMessages.map((message: any) => {
                  const isUserMessage = isAI ? message.role === "user" : message.senderId === user.id;
                  const messageForBubble: IMessage = {
                    _id: message._id,
                    userId: message.userId || message.senderId,
                    role: isUserMessage ? "user" : "assistant",
                    content: message.content,
                    feedback: message.feedback,
                    createdAt: message.createdAt,
                  };
                  return <MessageBubble key={message._id} message={messageForBubble} />;
                })}
                {(isAI ? isSending : isSendingUser) && <TypingIndicator />}
              </>
            ) : (
              <div className="flex-center w-full h-full">
                <div className="text-center">
                  <img
                    src={selectedUserImage}
                    alt={selectedUserName}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-light-1 mb-2">{selectedUserName}</h3>
                  <p className="text-light-3">No messages yet. Start the conversation!</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex-shrink-0">
            <ChatInput onSend={handleSend} isLoading={isAI ? isSending : isSendingUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
