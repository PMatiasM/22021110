import { Express } from "express";
import files from "./files";
import healthCheck from "./healthCheck";
import notFound from "./notFound";
import places from "./places";
import icons from "./icons";

export default (app: Express) => {
  healthCheck(app);
  places(app);
  files(app);
  icons(app);
  notFound(app);
};
