import { useQuery } from "@tanstack/react-query";
import { getLoggedUserBoards } from "../boardApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { CircuitBoard, LucideIcon } from "lucide-react";
import { Nav } from "@/components/nav";
import { useSelector } from "react-redux";
import { selectSelectedBoard } from "../boardSlice";

interface Props {
  isCollapsed: boolean;
}

type BoardLink = {
  title: string;
  to: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
};
const BoardList: React.FC<Props> = ({ isCollapsed }) => {
  const selectedBoard = useSelector(selectSelectedBoard);

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getLoggedUserBoards,
    queryKey: ["boards"],
  });

  const boardLinks = useMemo(() => {
    if (isSuccess && data.data) {
      const linkArr = data.data.map((board) => {
        return {
          title: board.title,
          to: `/${board._id}`,
          icon: CircuitBoard,
          variant:
            selectedBoard && selectedBoard._id === board._id
              ? "default"
              : "ghost",
        } as unknown as BoardLink;
      });

      return linkArr;
    }
  }, [isSuccess, data, selectedBoard]);

  if (isLoading) return <Skeleton className="w-[--sidebar-w] h-[500px]" />;

  return <Nav isCollapsed={isCollapsed} links={boardLinks || []} />;
};

export default BoardList;
