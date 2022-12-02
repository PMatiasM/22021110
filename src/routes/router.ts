import { Express } from "express";
import files from "./files";
import healthCheck from "./healthCheck";
import notFound from "./notFound";
import places from "./places";

export default (app: Express) => {
  healthCheck(app);
  places(app);
  files(app);
  notFound(app);
};
