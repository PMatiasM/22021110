import { Request, Response, NextFunction } from "express";
import Icon from "../models/Icon";

class IconController {
  async createIcon(req: Request, res: Response, next: NextFunction) {
    const icon = new Icon(req.body);
    const exists = await Icon.findOne({ file: icon.file });
    if (exists) {
      return res.status(200).json(exists);
    }
    return icon
      .save()
      .then((icon) => {
        res.status(201).json(icon);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message || error });
      });
  }

  async getIcon(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    return Icon.findById(id)
      .select("-createdAt -updatedAt -__v")
      .then((icon) => {
        res.status(icon ? 200 : 404).json(
          icon ?? {
            message: "No place found with this id",
          }
        );
      })
      .catch((error) => {
        res.status(500).json({ message: error.message || error });
      });
  }

  async getIcons(req: Request, res: Response, next: NextFunction) {
    return Icon.find({})
      .select("-createdAt -updatedAt -__v")
      .then((icons) => {
        res.status(200).json(icons);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message || error });
      });
  }

  async getLastUpdate(req: Request, res: Response, next: NextFunction) {
    return Icon.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then((icon) => {
        res.status(200).json({ lastUpdate: icon[0]?.updatedAt });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message || error });
      });
  }
}

export default new IconController();
