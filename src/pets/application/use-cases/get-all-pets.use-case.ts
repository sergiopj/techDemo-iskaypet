import { Pet } from "../../domain/pet";
import { PetRepository } from "../ports/pet.repository";

export class GetAllPetsUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  execute(): Promise<Pet[]> {
    return this.petRepository.findAll();
  }
}
