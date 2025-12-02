import { bottombarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetUnreadNotificationCount, useGetUnreadMessageCount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const Bottombar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useUserContext();
  const { data: unreadCountData } = useGetUnreadNotificationCount();
  const unreadCount = unreadCountData?.count || 0;
  const { data: unreadMessageCountData } = useGetUnreadMessageCount(isAuthenticated);
  const unreadMessageCount = isAuthenticated ? (unreadMessageCountData?.count ?? 0) : 0;

  return (
    <section className="bottom-bar ">
      {bottombarLinks.map((link) => {
        const isActive = link.route === "/messages" 
          ? pathname.startsWith("/messages")
          : pathname === link.route;
        const isNotifications = link.route === "/notifications";
        const isMessages = link.route === "/messages";
        const showNotificationBadge = isNotifications && unreadCount > 0;
        const showMessageBadge = isMessages && unreadMessageCount > 0;
        return (
          <Link
            href={link.route}
            key={link.label}
            className={`flex-center flex-col gap-1 transition p-2 group relative ${
              isActive && "bg-black invert rounded-[10px]"
            }`}
          >
            <div className="relative">
              <img
                src={link.imgURL}
                alt={link.label}
                className={`group-hover:invert-white ${
                  isActive && "invert-white"
                } h-7`}
              />
              {showNotificationBadge && (
                <span className={`absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xl z-20 ${
                  unreadCount > 9 ? "min-w-[20px] h-5 px-1" : "w-4 h-4"
                }`}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
              {showMessageBadge && (
                <span className={`absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xl z-20 ${
                  unreadMessageCount > 9 ? "min-w-[20px] h-5 px-1" : "w-4 h-4"
                }`}>
                  {unreadMessageCount > 9 ? "9+" : unreadMessageCount}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </section>
  );
};
export default Bottombar;
