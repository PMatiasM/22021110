import { Request, Response, NextFunction } from "express";
import Place from "../models/Place";

class PlaceController {
  async createPlace(req: Request, res: Response, next: NextFunction) {
    const place = new Place(req.body);
    const exists = await Place.findOne({ name: place.name });
    if (exists) {
      return res.status(409).json({ message: `"${place.name}" já existe` });
    }
    return place
      .save()
      .then((place) => {
        res.status(201).json(place);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message || error });
      });
  }

  async getPlace(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    return Place.findById(id)
      .populate([
        {
          path: "icon",
          select: "-_id -createdAt -updatedAt -__v ",
        },
      ])
      .select("-createdAt -updatedAt -__v")
      .then((place) => {
        res.status(place ? 200 : 404).json(
          place ?? {
            message: "No place found with this id",
          }
        );
      })
      .catch((error) => {
        res.status(500).json({ message: error.message || error });
      });
  }

  async getPlaces(req: Request, res: Response, next: NextFunction) {
    return Place.find({})
      .populate([
        {
          path: "icon",
          select: "-_id -createdAt -updatedAt -__v ",
        },
      ])
      .select("-createdAt -updatedAt -__v")
      .then((places) => {
        res.status(200).json(places);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message || error });
      });
  }

  async getLastUpdate(req: Request, res: Response, next: NextFunction) {
    return Place.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then((place) => {
        res.status(200).json({ lastUpdate: place[0]?.updatedAt });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message || error });
      });
  }
}

export default new PlaceController();
