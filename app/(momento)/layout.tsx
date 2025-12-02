"use client";

import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MomentoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMessagesPage = pathname.startsWith("/messages");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full">
      <LeftSidebar />
      <div className="flex-1 lg:ml-[300px] transition-all w-full">
        <Topbar />
        <section className="flex flex-1 md:h-screen min-h-[100vh] w-full">
          {children}
        </section>
        <Bottombar />
      </div>
    </div>
  );
}
