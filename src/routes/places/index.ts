import { Express } from "express";
import PlaceController from "../../controllers/PlaceController";
import { schemas, validateSchema } from "../../middlewares/validateSchema";

export default (app: Express) => {
  app
    .route("/places")
    .get(PlaceController.getPlaces)
    .post(validateSchema(schemas.place.create), PlaceController.createPlace);
  app.route("/places/id/:id").get(PlaceController.getPlace);
  app.route("/places/lastUpdate").get(PlaceController.getLastUpdate);
};
