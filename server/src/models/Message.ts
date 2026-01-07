import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  messageId: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  messageId: {
    type: String,
    required: true,
    unique: true,
  },
  roomId: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800, // Auto-delete after 7 days (optional)
  },
});

// Index for efficient querying
MessageSchema.index({ roomId: 1, timestamp: -1 });

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
