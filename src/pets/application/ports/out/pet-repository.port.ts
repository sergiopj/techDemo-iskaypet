import { Pet } from "../../../domain/pet";

export const PET_REPOSITORY = Symbol("PET_REPOSITORY");

export interface PetRepositoryPort {
  findAll(): Promise<Pet[]>;
}
