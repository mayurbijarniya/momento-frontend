import Link from "next/link";
import { useUserContext } from "@/context/AuthContext";
import { Camera } from "lucide-react";

const Topbar = () => {
  const { user, isAuthenticated } = useUserContext();

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 border border-white rounded-lg flex-shrink-0">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-3xl font-bold text-white tracking-tight leading-tight">
              Momento
            </span>
            <span className="text-xs text-accent tracking-widest leading-tight">
              CAPTURE EVERY MOMENT
            </span>
          </div>
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
