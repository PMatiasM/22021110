import { Express, Request, Response, NextFunction } from "express";

export default (app: Express) => {
  app.get("/01112022", (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json({ message: "Best day of my life" })
  );
};
