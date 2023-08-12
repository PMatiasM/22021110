import mongoose, { Document, ObjectId, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

export interface IIcon {
  file: ObjectId;
  size: Array<number>;
}

export interface IIconModel extends IIcon, Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const IconSchema: Schema = new Schema(
  {
    file: { type: Schema.Types.ObjectId, required: true, unique: true },
    size: { type: [Number], required: true },
  },
  {
    timestamps: true,
  }
);

IconSchema.plugin(mongooseUniqueValidator);

export default mongoose.model<IIconModel>("icons", IconSchema);
