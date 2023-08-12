import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import Logging from "../library/Logging";
import { IPlace } from "../models/Place";
import { IIcon } from "../models/Icon";

export const validateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      Logging.error(error);
      return res.status(422).json({ message: error.message || error });
    }
  };
};

export const schemas = {
  place: {
    create: Joi.object<IPlace>({
      name: Joi.string().required(),
      position: Joi.array()
        .min(2)
        .max(2)
        .items(Joi.number().required())
        .required(),
      icon: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      images: Joi.array().items(
        Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
      ),
      videos: Joi.array().items(
        Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
      ),
      title: Joi.string().allow(""),
      text: Joi.string().allow(""),
    }),
  },
  icon: {
    create: Joi.object<IIcon>({
      file: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      size: Joi.array().min(2).max(2).items(Joi.number().required()).required(),
    }),
  },
};
