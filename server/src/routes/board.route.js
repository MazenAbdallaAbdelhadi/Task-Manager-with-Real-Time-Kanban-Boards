const { Router } = require("express");
const {
  createBoard,
  getMyBoards,
  getBoard,
  updateBoard,
  deleteBoard,
  setOwner,
  addColumnToBoard,
  swapColumns,
  updateColumnName,
  removeColumnFromBoard,
} = require("../controllers/board.controller");
const {
  createBoardValidator,
  updateBoardValidator,
  deleteBoardValidator,
  addColumnToBoardValidator,
  updateColumnNameValidator,
  swapColumnsValidator,
  removeColumnFromBoardValidator,
} = require("../utils/validator/board.validator");
const { protect } = require("../services/auth");

const router = Router();

router.use(protect);

router.route("/").post(createBoardValidator, setOwner, createBoard);
router.get("/getMyBoards", getMyBoards);

router
  .route("/:id")
  .get(getBoard)
  .put(updateBoardValidator, updateBoard)
  .delete(deleteBoardValidator, deleteBoard);

router.post("/:id/addColumn", addColumnToBoardValidator, addColumnToBoard);
router.put("/:id/updateColumn", updateColumnNameValidator, updateColumnName);
router.put("/:id/swapColumns", swapColumnsValidator, swapColumns);
router.delete(
  "/:id/removeColumn",
  removeColumnFromBoardValidator,
  removeColumnFromBoard
);

module.exports = router;
