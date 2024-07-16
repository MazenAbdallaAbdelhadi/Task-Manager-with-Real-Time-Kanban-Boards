import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";

import { Column as IColumn } from "@/types/board";
import EditColumnButton from "./EditColumnButton";
import DeleteColumnButton from "./DeleteColumnButton";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  column: IColumn;
}

const Column: React.FC<Props> = ({ column, children }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column._id,
    data: { type: "Column", column },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="min-w-[300px] max-w-[300px] bg-secondary rounded border-2 border-pink-600 touch-none relative opacity-40 "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="min-w-[300px] max-w-[300px] min-h-full bg-secondary rounded touch-none relative"
    >
      <div className="sticky w-[300px] flex gap-2 justify-between items-center bg-neutral-600 px-3 py-2 rounded-t">
        <span className="tracking-widest uppercase   rounded-md">
          {column.name}
        </span>

        <div className="flex items-center">
          <EditColumnButton columnId={column._id} name={column.name} />
          <DeleteColumnButton columnId={column._id} />
          <span
            {...attributes}
            {...listeners}
            className="text-muted-foreground rounded-md p-2 block hover:bg-neutral-800 hover:text-secondary-foreground"
          >
            <Grip size={18} />
          </span>
        </div>
      </div>

      {/* tasks goes here */}
      {children}
    </div>
  );
};

export default Column;
