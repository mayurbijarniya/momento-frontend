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

const LeftSidebar = () => {
  const pathname = usePathname();
  const { mutate: signOutMutation, isSuccess } = useSignOutAccount();
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useUserContext();
  const { data: unreadCountData } = useGetUnreadNotificationCount();
  const unreadCount = unreadCountData?.count || 0;
  const { data: unreadMessageCountData } = useGetUnreadMessageCount(isAuthenticated);
  const unreadMessageCount = isAuthenticated ? (unreadMessageCountData?.count ?? 0) : 0;

  const isMessagesPage = pathname.startsWith("/messages");

  useEffect(() => {
    if (isSuccess) {
      signOut().then(() => {
        router.push("/sign-in");
      });
    }
  }, [isSuccess, router, signOut]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-6 items-center lg:pr-10">
        <Link href="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            width={200}
            height={36}
            className={isMessagesPage ? "hidden" : "max-lg:hidden"}
          />
          <img
            src="/assets/images/lg-logo.svg"
            alt="Logo"
            width={35}
            height={40}
            className={isMessagesPage ? "" : "lg:hidden"}
          />
        </Link>

        <Link
          href={`/profile/${user.id}`}
          className={`flex gap-3 item-center ${
            isAuthenticated ? "" : "hidden"
          }`}
        >
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-12 w-12 rounded-full max-lg:w-[50px] max-lg:h-[50px] object-cover"
          />
          <div className={`flex flex-col justify-center ${isMessagesPage ? "hidden" : "max-lg:hidden"}`}>
            <p className="base-semibold">{user.name}</p>
            <p className="text-[13px] text-light-1">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-4 ">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = link.route === "/messages" 
              ? pathname.startsWith("/messages")
              : pathname === link.route;
            const isNotifications = link.route === "/notifications";
            const isMessages = link.route === "/messages";
            const showNotificationBadge = isNotifications && unreadCount > 0;
            const showMessageBadge = isMessages && unreadMessageCount > 0;
            return (
              <li
                key={link.label}
                className={` group body-bold leftsidebar-link ${
                  isActive ? "text-black bg-white " : " text-light-1"
                }`}
              >
                <Link
                  href={link.route}
                  className="flex gap-2 item-center p-2 relative"
                >
                  <div className="relative">
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      className={`group-hover:invert max-lg:w-[30px] max-lg:h-[30px] ${
                        isActive && "invert"
                      }`}
                    />
                    {showNotificationBadge && (
                      <span className={`absolute -top-2 -right-2 bg-blue-500 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-xl z-20 ${
                        unreadCount > 9 ? "min-w-[24px] h-6 px-1.5" : "w-5 h-5"
                      }`}>
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                    {showMessageBadge && (
                      <span className={`absolute -top-2 -right-2 bg-blue-500 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-xl z-20 ${
                        unreadMessageCount > 9 ? "min-w-[24px] h-6 px-1.5" : "w-5 h-5"
                      }`}>
                        {unreadMessageCount > 9 ? "9+" : unreadMessageCount}
                      </span>
                    )}
                  </div>
                  <p className={isMessagesPage ? "hidden" : "max-lg:hidden body-bold"}>{link.label}</p>
                </Link>
              </li>
            );
          })}
          {isAuthenticated && user.role === "ADMIN" && (
            <li
              className={`group body-bold leftsidebar-link ${
                pathname === "/admin" ? "text-black bg-white " : " text-light-1"
              }`}
            >
              <Link
                href="/admin"
                className="flex gap-2 item-center p-2 relative"
              >
                <div className="relative">
                  <img
                    src="/assets/icons/filter.svg"
                    alt="Admin"
                    className={`invert group-hover:invert max-lg:w-[30px] max-lg:h-[30px] ${
                      pathname === "/admin" && "invert"
                    }`}
                  />
                </div>
                <p className={isMessagesPage ? "hidden" : "max-lg:hidden body-bold"}>Admin</p>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {isAuthenticated ? (
        <Button
          variant="ghost"
          className="hover:bg-white group flex justify-start gap-3 py-2"
          onClick={() => signOutMutation()}
        >
          <img
            className="group-hover:invert max-lg:w-[30px] max-lg:h-[30px] "
            src="/assets/icons/logout.svg"
            alt="logout"
          />
          <p
            className={`base-semibold group-hover:text-black  text-light-1  ${isMessagesPage ? "hidden" : "max-lg:hidden"}`}
          >
            Logout
          </p>
        </Button>
      ) : (
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="hover:bg-white group flex justify-start border border-dark-4 w-full gap-3 py-2"
            >
              <img
                src="/assets/icons/account.svg"
                className="group-hover:invert max-lg:w-[30px] max-lg:h-[30px] "
              />
              <p
                className={`base-semibold group-hover:text-black  text-light-1  ${isMessagesPage ? "hidden" : "max-lg:hidden"}`}
              >
                Sign-in
              </p>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              variant="ghost"
              className="hover:bg-white group flex justify-start bg-dark-4 border border-dark-4  w-full gap-3 py-2"
            >
              <img
                src="/assets/icons/sign-up.svg"
                className="group-hover:invert max-lg:w-[30px] max-lg:h-[30px] "
              />
              <p
                className={`base-semibold group-hover:text-black  text-light-1  ${isMessagesPage ? "hidden" : "max-lg:hidden"}`}
              >
                Sign-up
              </p>
            </Button>
          </Link>
        </div>
      )}

      <div className={`flex gap-4 mt-4 ${isMessagesPage ? "hidden" : "max-lg:hidden"}`}>
        <Link 
          href="/about" 
          className="text-light-3 hover:text-light-1 text-xs transition"
        >
          About
        </Link>
        <Link 
          href="/privacy" 
          className="text-light-3 hover:text-light-1 text-xs transition"
        >
          Privacy Policy
        </Link>
      </div>
    </nav>
  );
};

export default LeftSidebar;
