import { unselectBoard } from "@/features/board/boardSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(unselectBoard());
  }, []);

  return (
    <div className="grid place-content-center h-full">
      <h1 className="text-4xl">NO BOARD SELECTED</h1>
    </div>
  );
};

export default HomePage;
