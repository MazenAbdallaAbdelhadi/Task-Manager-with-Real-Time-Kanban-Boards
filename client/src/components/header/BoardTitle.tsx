import { selectSelectedBoard } from "@/features/board/boardSlice";
import { motion } from "framer-motion";
import { Key } from "react";
import { useSelector } from "react-redux";

const BoardTitle = () => {
  const selectedBoard = useSelector(selectSelectedBoard);

  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
    hide: {
      y: -20,
      opacity: 0,
    },
  };

  return (
    <motion.span
      className="text-2xl font-bold"
      variants={variants}
      animate={"show"}
      initial="hide"
      key={selectedBoard?._id as Key}
    >
      {selectedBoard?.title}
    </motion.span>
  );
};

export default BoardTitle;
