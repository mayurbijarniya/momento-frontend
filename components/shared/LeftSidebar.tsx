"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  useSignOutAccount,
  useGetUnreadNotificationCount,
  useGetUnreadMessageCount,
} from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import {
  Home,
  Compass,
  Users,
  Bookmark,
  PlusSquare,
  MessageCircle,
  Bell,
  LogOut,
} from "lucide-react";

const iconMap: Record<string, any> = {
  "/": Home,
  "/explore": Compass,
  "/all-users": Users,
  "/messages": MessageCircle,
  "/notifications": Bell,
  "/saved": Bookmark,
  "/create-post": PlusSquare,
};

const LeftSidebar = () => {
  const pathname = usePathname();
  const { mutate: signOutMutation, isSuccess } = useSignOutAccount();
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useUserContext();
  const { data: unreadCountData } = useGetUnreadNotificationCount();
  const unreadCount = unreadCountData?.count || 0;
  const { data: unreadMessageCountData } =
    useGetUnreadMessageCount(isAuthenticated);
  const unreadMessageCount = isAuthenticated
    ? unreadMessageCountData?.count ?? 0
    : 0;

  const isMessagesPage = pathname.startsWith("/messages");

  useEffect(() => {
    if (isSuccess) {
      signOut().then(() => {
        router.push("/sign-in");
      });
    }
  }, [isSuccess, router, signOut]);

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[245px] flex-col bg-dark-3 border-r border-dark-4 z-50">
      {/* Logo Section */}
      <div className="px-6 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/assets/images/lg-logo.svg"
            alt="Momento"
            className="w-14 h-14 flex-shrink-0"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-[28px] font-bold text-white tracking-tight leading-tight">
              Momento
            </h1>
            <p className="text-[9px] font-normal text-light-3 tracking-wider uppercase leading-tight mt-0.5">
              CAPTURE EVERY MOMENT
            </p>
          </div>
        </Link>
      </div>

      {/* User Profile Section */}
      {isAuthenticated && (
        <div className="px-6 py-4 border-b border-dark-4">
          <Link
            href={`/profile/${user.id}`}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-light-3 truncate">@{user.username}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link: INavLink) => {
            const isActive =
              link.route === "/messages"
                ? pathname.startsWith("/messages")
                : pathname === link.route;
            const isNotifications = link.route === "/notifications";
            const isMessages = link.route === "/messages";
            const showNotificationBadge = isNotifications && unreadCount > 0;
            const showMessageBadge = isMessages && unreadMessageCount > 0;
            const IconComponent = iconMap[link.route] || Home;

            return (
              <li key={link.label}>
                <Link
                  href={link.route}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 relative ${
                    isActive
                      ? "bg-white text-black font-semibold"
                      : "text-white hover:bg-dark-4"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <IconComponent
                      className="h-6 w-6"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {showNotificationBadge && (
                      <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-4.5 px-1">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                    {showMessageBadge && (
                      <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-4.5 px-1">
                        {unreadMessageCount > 9 ? "9+" : unreadMessageCount}
                      </span>
                    )}
                  </div>
                  <span className="text-base">{link.label}</span>
                </Link>
              </li>
            );
          })}
          {isAuthenticated && user.role === "ADMIN" && (
            <li>
              <Link
                href="/admin"
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === "/admin"
                    ? "bg-white text-black font-semibold"
                    : "text-white hover:bg-dark-4"
                }`}
              >
                <img
                  src="/assets/icons/filter.svg"
                  alt="Admin"
                  className={`w-6 h-6 ${pathname === "/admin" ? "invert" : ""}`}
                />
                <span className="text-base">Admin</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3">
        {isAuthenticated ? (
          <button
            onClick={() => signOutMutation()}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-dark-4 transition-all duration-200"
          >
            <LogOut className="h-6 w-6" strokeWidth={2} />
            <span className="text-base">Logout</span>
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <Link href="/sign-in" className="w-full">
              <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-dark-4 transition-all duration-200 border border-dark-4">
                <LogOut className="h-6 w-6" strokeWidth={2} />
                <span className="text-base">Sign-in</span>
              </button>
            </Link>
            <Link href="/sign-up" className="w-full">
              <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-dark-4 transition-all duration-200 border border-dark-4 bg-dark-4">
                <LogOut className="h-6 w-6" strokeWidth={2} />
                <span className="text-base">Sign-up</span>
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="px-6 py-4 border-t border-dark-4">
        <div className="flex gap-4 text-xs text-light-3">
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
