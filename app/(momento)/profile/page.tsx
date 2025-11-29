"use client";

import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/shared/Loader";

/**
 * /profile route - Redirects to the current logged-in user's profile
 * If not logged in, redirects to sign-in page
 */
export default function ProfileRedirect() {
  const { user, isAuthenticated, isLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user.id) {
        // Redirect to own profile with ID
        router.replace(`/profile/${user.id}`);
      } else {
        // Not logged in - redirect to sign-in
        router.replace("/sign-in");
      }
    }
  }, [isAuthenticated, isLoading, user.id, router]);

  return (
    <div className="flex-center w-full h-screen">
      <Loader />
    </div>
  );
}
