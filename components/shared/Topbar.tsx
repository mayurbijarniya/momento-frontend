import Link from "next/link";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "../ui/button";

const Topbar = () => {
  const { user, isAuthenticated } = useUserContext();

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link href="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/lg-logo.svg"
            alt="Momento"
            className="w-12 h-12"
          />
          <h1 className="text-[28px] font-bold text-white tracking-tight">
            Momento
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-light-1 hover:text-white text-sm base-medium transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-light-1 hover:text-white text-sm base-medium transition-colors md:hidden"
          >
            Privacy
          </Link>

          {isAuthenticated && (
            <div className="flex">
              <Link href={`/profile/${user.id}`} className="flex-center gap-3">
                <img
                  src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="profile"
                  className="h-12 w-12 rounded-full object-cover"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Topbar;
