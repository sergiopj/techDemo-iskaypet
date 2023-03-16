"use strict";
import * as express from "express";
const Router = express.Router();
import { check } from "express-validator";
import {
  getPetById,
  getMostNumerousSpecies,
  getSpeciesAverageAge,
  getAllPets,
  addNewPet,
} from "../controllers/pets.controller";
import { paramsValidator } from "../middlewares/ParamsValidator";

Router.get("/", getAllPets);
Router.get(
  "/:id",
  [check("id", "The id field is required").not().isEmpty(), paramsValidator],
  getPetById
);
Router.get("/species/most_numerous_species", getMostNumerousSpecies);
Router.get("/species/average_age", getSpeciesAverageAge);
Router.post(
  "/",
  [
    check("name", "The name field is required").not().isEmpty(),
    check("species", "The species field is required").not().isEmpty(),
    check("gender", "The gender field is required and must be either male or female")
      .not()
      .isEmpty()
      .custom((value: string) => {
        const lowercaseValue: string = value.toLowerCase();
        return lowercaseValue === "male" || lowercaseValue === "female";
      }),
    check(
      "birthdate",
      "The birthdate field is required and must be a valid date in the format YYYY-MM-DD"
    )
      .not()
      .isEmpty()
      .isDate({ format: "YYYY-MM-DD" }),
    paramsValidator,
  ],
  addNewPet
);


export default Router;
