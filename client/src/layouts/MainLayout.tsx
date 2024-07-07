import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <main>
      <div className="flex">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex-1">
            <ScrollArea>
              <div className="h-[calc(100vh-60px)] pb-4">
                <Outlet />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
