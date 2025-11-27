"use client";

import { useGetNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead, useDeleteNotification } from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, UserPlus, MessageSquare, X } from "lucide-react";

const Notifications = () => {
  const { data: notificationsData, isLoading } = useGetNotifications();
  const { isAuthenticated, isLoading: isAuthLoading } = useUserContext();
  const router = useRouter();
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead } = useMarkAllNotificationsAsRead();
  const { mutate: deleteNotif } = useDeleteNotification();

  const notifications = notificationsData?.documents || [];

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated, isAuthLoading, router]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "LIKE":
        return <Heart className="w-5 h-5 text-red-500" fill="currentColor" />;
      case "FOLLOW":
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case "REVIEW":
        return <MessageSquare className="w-5 h-5 text-yellow-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationMessage = (notification: any) => {
    const actorName = notification.actor?.name || "Someone";
    const actorUsername = notification.actor?.username || "";

    switch (notification.type) {
      case "LIKE":
        return (
          <>
            <span className="font-semibold">{actorName}</span> liked your post
          </>
        );
      case "FOLLOW":
        return (
          <>
            <span className="font-semibold">{actorName}</span> started following you
          </>
        );
      case "REVIEW":
        return (
          <>
            <span className="font-semibold">{actorName}</span> reviewed your post
          </>
        );
      default:
        return "New notification";
    }
  };

  const getNotificationLink = (notification: any) => {
    if (notification.type === "FOLLOW") {
      return `/profile/${notification.actor?._id || notification.actor?.id || notification.actor}`;
    }
    if (notification.post) {
      return `/posts/${notification.post._id || notification.post.id || notification.post}`;
    }
    return "#";
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification._id || notification.id);
    }
  };

  const handleDelete = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    deleteNotif(notificationId);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="notifications-container">
      <div className="flex-between w-full max-w-5xl mb-6">
        <div className="flex gap-2 items-center">
          <img
            src="/assets/icons/chat.svg"
            width={36}
            height={36}
            alt="notifications"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left">Notifications</h2>
        </div>
        {notifications.length > 0 && (
          <Button
            onClick={() => markAllAsRead()}
            variant="outline"
            className="text-light-1 border-dark-4 hover:bg-dark-4"
          >
            Mark all as read
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex-center w-full py-10">
          <Loader />
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex-center flex-col gap-4 py-20">
          <img
            src="/assets/icons/chat.svg"
            width={80}
            height={80}
            alt="no notifications"
            className="opacity-50 invert-white"
          />
          <p className="text-light-3 text-center">No notifications yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full max-w-5xl">
          {notifications.map((notification: any) => {
            const notificationId = notification._id || notification.id;
            const isUnread = !notification.read;
            const link = getNotificationLink(notification);

            return (
              <Link
                key={notificationId}
                href={link}
                onClick={() => handleNotificationClick(notification)}
                className={`flex items-start gap-4 p-4 rounded-lg transition ${
                  isUnread
                    ? "bg-dark-4 hover:bg-dark-3 border-l-4 border-blue-500"
                    : "bg-dark-2 hover:bg-dark-3"
                }`}
              >
                <div className="flex-shrink-0">
                  {notification.actor?.imageUrl ? (
                    <img
                      src={notification.actor.imageUrl}
                      alt={notification.actor.name || "User"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-dark-4 flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getNotificationIcon(notification.type)}
                        <p className="text-light-1 small-medium lg:base-regular">
                          {getNotificationMessage(notification)}
                        </p>
                      </div>
                      <p className="text-light-3 text-xs">
                        {timeAgo(notification.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDelete(e, notificationId)}
                      className="flex-shrink-0 p-1 hover:bg-dark-4 rounded-full transition"
                      aria-label="Delete notification"
                    >
                      <X className="w-4 h-4 text-light-3" />
                    </button>
                  </div>

                  {notification.post?.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={notification.post.imageUrl}
                        alt="Post"
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>

                {isUnread && (
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;

