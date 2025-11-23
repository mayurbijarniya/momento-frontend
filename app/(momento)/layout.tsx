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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="md:w-[90vw] xl:w-[70vw] 2xl:w-[58vw] max-md:w-full mx-auto md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 md:h-screen min-h-[100vh]">
        {children}
      </section>
    </div>
  );
}

