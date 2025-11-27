import { bottombarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetUnreadNotificationCount } from "@/lib/react-query/queriesAndMutation";

const Bottombar = () => {
  const pathname = usePathname();
  const { data: unreadCountData } = useGetUnreadNotificationCount();
  const unreadCount = unreadCountData?.count || 0;

  return (
    <section className="bottom-bar ">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        const isNotifications = link.route === "/notifications";
        const showBadge = isNotifications && unreadCount > 0;
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
              {showBadge && (
                <span className={`absolute -top-1.5 -right-1.5 bg-red-600 text-[10px] font-extrabold rounded-full min-w-[18px] h-5 px-1.5 flex items-center justify-center shadow-xl border-2 z-20 ring-1 transition-colors ${
                  isActive 
                    ? "text-black border-black ring-black" 
                    : "text-white border-white ring-dark-1"
                }`}>
                  {unreadCount > 9 ? "9+" : unreadCount}
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
