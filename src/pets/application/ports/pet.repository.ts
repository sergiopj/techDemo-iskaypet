import { Pet } from "../../domain/pet";

export interface PetRepository {
  findAll(): Promise<Pet[]>;
}
