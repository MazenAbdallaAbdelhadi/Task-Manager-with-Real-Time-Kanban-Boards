const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles = require("../config/roles");
const { enumFormObject } = require("../utils/helper/enum-from-object");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: String,
    profileImage: String,
    passwordChangedAt: Date,
    passwordResetSecret: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
      type: Number,
      enum: enumFormObject(roles),
      default: roles.USER,
    },
  },
  { timestamps: true }
);

// hash password before saving it to database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Remove password from the JSON representation of the user
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;

  delete obj.password;
  delete obj._id;
  delete obj.__v;
  delete obj.passwordChangedAt;
  delete obj.passwordResetSecret;
  delete obj.passwordResetExpires;
  delete obj.passwordResetVerified;

  return obj;
};

// Compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
