const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [100, "Task title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
      maxlength: [500, "Task description cannot exceed 500 characters"],
    },

    status: {
      type: String,
      enum: ["todo", "inProgress", "completed"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["low", "normal", "high"],
      default: "normal",
    },

    dueDate: {
      type: Date,
      required: [true, "Task due date is required"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must belong to a user"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// optional: clean output
taskSchema.method("toJSON", function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
});

const Task = model("Task", taskSchema);

module.exports = { Task };