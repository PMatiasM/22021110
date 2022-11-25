import mongoose, { Document, ObjectId, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

export interface IIcon {
  name: string;
  size: Array<number>;
}

export interface IPlace {
  name: string;
  position: Array<number>;
  icon: IIcon;
  images: Array<ObjectId>;
  videos: Array<ObjectId>;
  title: string;
  text: string;
}

export interface IPlaceModel extends IPlace, Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    position: [Number],
    icon: {
      type: {
        name: String,
        size: [Number],
      },
      required: true,
    },
    images: {
      type: [Schema.Types.ObjectId],
      required: false,
    },
    videos: {
      type: [Schema.Types.ObjectId],
      required: false,
    },
    title: { type: String },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

PlaceSchema.plugin(mongooseUniqueValidator);

export default mongoose.model<IPlaceModel>("places", PlaceSchema);
