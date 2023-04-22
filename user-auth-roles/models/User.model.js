const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.']
    },
    role: {
      type: String,
      enum: ["USER", "EDITOR", "ADMIN"],
      default: 'USER'
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
