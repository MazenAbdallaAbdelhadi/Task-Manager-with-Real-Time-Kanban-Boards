import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { Column as IColumn } from "@/types/board";
import { selectSelectedBoard } from "../../boardSlice";
import { useSwapColumnsService } from "../../services/swapColumnsService";
import Column from "./Column";


const ColumnList: React.FC = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const columns = selectedBoard?.columns!;

  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col._id), [columns]);
  const { mutate } = useSwapColumnsService();

  function handleDragStart(e: DragStartEvent) {
    console.log("drag start", e);
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveColumn(null);

    const { active, over } = e;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    mutate({
      columnId1: activeColumnId.toString(),
      columnId2: overColumnId.toString(),
    });
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={columnsId}>
        {columns.map((col) => (
          <Column key={col._id} column={col} />
        ))}
      </SortableContext>

      {createPortal(
        <DragOverlay dropAnimation={null}>
          {activeColumn && <Column column={activeColumn} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default ColumnList;
