import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import FileManager from "../common/FileManager";

class FileController {
  async getFile(req: Request, res: Response) {
    try {
      const { id, bucketName } = req.params;
      const file = await FileManager.download(id, bucketName);
      return res.sendFile(file, () => {
        if (existsSync(file)) {
          unlinkSync(file);
        }
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || error });
    }
  }

  async getFiles(req: Request, res: Response) {
    try {
      const { bucketName } = req.params;
      const files = await FileManager.findAll(bucketName);
      res.status(200).json(files);
    } catch (error: any) {
      res.status(500).json({ message: error.message || error });
    }
  }

  async createFile(req: Request, res: Response) {
    try {
      const { bucketName } = req.params;
      const file = req.files;

      if (file) {
        const newfiles = await FileManager.upload(file, bucketName);
        return res.status(201).json({
          ids: newfiles,
          message: "Success",
        });
      } else {
        return res.status(500).json({ message: "No file found" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message || error });
    }
  }
}

export default new FileController();
