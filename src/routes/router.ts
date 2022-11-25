import { Express } from "express";
import files from "./files";
import notFound from "./notFound";
import places from "./places";

export default (app: Express) => {
  places(app);
  files(app);
  notFound(app);
};
