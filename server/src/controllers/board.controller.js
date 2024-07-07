const Board = require("../models/board.model");
const {
  createOne,
  deleteOne,
  updateOne,
} = require("../services/factory-handler");
const { recordNotFound, badRequest } = require("../utils/response");

exports.setOwner = (req, _res, next) => {
  req.body.owner = req.user._id;
  next();
};

/**
 * @desc create a new board
 * @path POST /v1/boards
 * @access protected
 */
exports.createBoard = createOne(Board);

/**
 * @desc get all boards
 * @path GET /v1/boards/getMyBoards
 * @access protected
 */
exports.getMyBoards = async (req, res, next) => {
  const userId = req.user._id;

  const boards = await Board.find({
    $or: [{ owner: userId }, { members: userId }],
  }).exec();

  res.success({ data: boards });
};

/**
 * @desc get one board with id
 * @path GET /v1/boards/:id
 * @access protected
 */
exports.getBoard = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const board = await Board.findOne({
    _id: id,
    $or: [{ owner: userId }, { members: userId }],
  });

  if (!board) return next(recordNotFound({ message: "Board not found" }));

  res.success({ data: board });
};

/**
 * @desc update one board with id
 * @path PUT /v1/boards/:id
 * @access protected
 */
exports.updateBoard = updateOne(Board);

/**
 * @desc delete one board with id
 * @path DELETE /v1/boards/:id
 * @access protected
 */
exports.deleteBoard = deleteOne(Board);

/**
 * @desc add column to board with id
 * @path POST /v1/boards/:id/addColumn
 * @access protected
 */
exports.addColumnToBoard = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const board = await Board.findByIdAndUpdate(
    id,
    {
      $addToSet: { columns: { name } },
    },
    { new: true }
  );

  if (!board) {
    return next(recordNotFound({ message: "Board not found" }));
  }

  const newColumn = board.columns.find((column) => column.name === name);

  res.success({ data: newColumn });
};

/**
 * @desc update column name in board with id
 * @path PUT /v1/boards/:id/updateColumn
 * @access protected
 */
exports.updateColumnName = async (req, res, next) => {
  const { id } = req.params;
  const { columnId, newName } = req.body;

  const board = await Board.findOneAndUpdate(
    { _id: id, "columns._id": columnId },
    {
      $set: { "columns.$.name": newName },
    },
    { new: true }
  );

  if (!board) {
    return next(recordNotFound({ message: "Board not found" }));
  }

  const updatedColumn = board.columns.find(
    (column) => column._id.toString() === columnId
  );

  res.success({
    message: "Column name updated Successfully",
    data: updatedColumn,
  });
};

/**
 * @desc swap columns
 * @path PUT /v1/boards/:id/swapColumns
 * @access protected
 */
exports.swapColumns = async (req, res, next) => {
  const { id } = req.params;
  const { columnId1, columnId2 } = req.body;

  const board = await Board.findById(id);
  if (!board) {
    return next(recordNotFound({ message: "Board not found" }));
  }

  const column1Index = board.columns.findIndex(
    (column) => column._id.toString() === columnId1
  );
  const column2Index = board.columns.findIndex(
    (column) => column._id.toString() === columnId2
  );

  if (column1Index === -1 || column2Index === -1) {
    return next(badRequest({ message: "invalid columns ids" }));
  }

  // Swap column positions in the columns array
  const [column1] = board.columns.splice(column1Index, 1);
  board.columns.splice(column2Index, 0, column1);

  await board.save(); // Persist changes to the database

  res.success({
    message: "Columns swapped successfully",
    data: {
      columnId1,
      columnId2,
    },
  });
};

/**
 * @desc remove column from board with id
 * @path DELETE /v1/boards/:id/removeColumn
 * @access protected
 */
exports.removeColumnFromBoard = async (req, res, next) => {
  const { id } = req.params;
  const { columnId } = req.body;

  const board = await Board.findByIdAndUpdate(
    id,
    {
      $pull: { columns: { _id: columnId } },
    },
    { new: true }
  );

  if (!board) {
    return next(recordNotFound({ message: "Board not found" }));
  }

  res.success({ data: board.columns });
};
