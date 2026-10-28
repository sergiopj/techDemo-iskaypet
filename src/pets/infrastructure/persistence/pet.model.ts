import mongoose, { Schema, Document } from "mongoose";
import { Gender, Species } from "../../domain/pet";

export interface IPet extends Document {
  name: string;
  species: Species;
  gender: Gender;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type PetDocument = IPet;

const PetSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    gender: { type: String, required: true },
    birthdate: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const Pet = mongoose.model<IPet>("Pet", PetSchema);
