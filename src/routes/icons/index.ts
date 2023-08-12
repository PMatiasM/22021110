import { Express } from "express";
import IconController from "../../controllers/IconController";
import { schemas, validateSchema } from "../../middlewares/validateSchema";

export default (app: Express) => {
  app
    .route("/icons")
    .get(IconController.getIcons)
    .post(validateSchema(schemas.icon.create), IconController.createIcon);
  app.route("/icons/id/:id").get(IconController.getIcon);
  app.route("/icons/lastUpdate").get(IconController.getLastUpdate);
};
