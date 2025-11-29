"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";

const MessagesPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useUserContext();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        console.log("Redirecting to sign-in from /messages");
        router.push("/sign-in");
      } else {
        console.log("Redirecting to /messages/ai from /messages");
        router.push("/messages/ai");
      }
    }
  }, [authLoading, isAuthenticated, router]);

  return (
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  );
};

export default MessagesPage;
