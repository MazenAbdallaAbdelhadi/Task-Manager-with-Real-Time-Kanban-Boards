const mongoose = require("mongoose");
const permissionLevels = require("../config/permissionLevels");

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trime: true,
    },
    description: {
      type: String,
      trime: true,
    },
    columns: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    permessions: {
      type: Object,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const defaultColumns = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "To Do",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "In Progress",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Done",
  },
];

boardSchema.pre("save", async function (next) {
  if (this.isNew) {
    // If the board is new, add default columns
    this.columns = defaultColumns;
  }

  const addedMembers = this.isNew // Check if it's a new board
    ? this.members // All members are considered new for a new board
    : this.modifiedPaths().includes("members") // Check if members array has been modified
    ? this.members.filter(
        (member) => !this.permissions.hasOwnProperty(member._id)
      ) // Find newly added members
    : []; // No changes to members

  if (addedMembers.length > 0) {
    for (const member of addedMembers) {
      this.permissions[member._id] = permissionLevels.EDITOR; // Assign default role
    }
  }

  next();
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
