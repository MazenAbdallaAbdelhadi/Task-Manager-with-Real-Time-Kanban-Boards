import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import { getBoardById } from "../../boardApi";
import { selectBoard, selectSelectedBoard } from "../../boardSlice";
import AddCoulumnButton from "./AddColumnButton";
import ColumnList from "./ColumnList";

const Board: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => getBoardById(id!),
    queryKey: ["boards", id],
  });

  const selectedBoard = useSelector(selectSelectedBoard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(selectBoard(data.data));
    }
  }, [data, isSuccess]);

  if (isLoading)
    return (
      <div className="h-full grid place-content-center">
        <Loader size={24} className="animate-spin text-primary" />
      </div>
    );

    if(!selectedBoard) return null;

  return (
    <div className="p-4 h-full flex gap-4">
      <ColumnList/>
      <AddCoulumnButton />
    </div>
  );
};

export default Board;
