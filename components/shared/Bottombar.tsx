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
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
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
