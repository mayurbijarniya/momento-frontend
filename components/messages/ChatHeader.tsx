"use client";

import Link from "next/link";

interface ChatHeaderProps {
  userName: string;
  userImage: string;
  isAI?: boolean;
  onBack?: () => void;
  userId?: string;
  lastLogin?: string | Date | null;
}

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

const formatLastLogin = (lastLogin: string | Date | null | undefined): string => {
  if (!lastLogin) {
    return "Never logged in";
  }

  const loginDate = new Date(lastLogin);
  const now = new Date();
  const diffInMs = now.getTime() - loginDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "Active now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else {
    // Format as date for older logins
    return loginDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: loginDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }
};

const ChatHeader = ({ userName, userImage, isAI = false, onBack, userId, lastLogin }: ChatHeaderProps) => {
  const isActive = isUserActive(lastLogin);
  
  const ProfileContent = () => (
    <>
      <div className="relative">
        <img 
          src={userImage || "/assets/icons/profile-placeholder.svg"} 
          alt={userName} 
          className="w-10 h-10 rounded-full object-cover" 
        />
        {(isAI || isActive) && (
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-2" />
        )}
      </div>
      <div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-light-1">{userName}</span>
          {isAI && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                stroke="#0095F6"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          )}
        </div>
        <span className="text-xs text-light-3">
          {isAI ? "Online" : formatLastLogin(lastLogin)}
        </span>
      </div>
    </>
  );

  return (
    <div className="flex items-center justify-between p-4 border-b border-dark-4 bg-dark-2">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="md:hidden p-2 hover:bg-dark-4 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {!isAI && userId ? (
          <Link href={`/profile/${userId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ProfileContent />
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <ProfileContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
