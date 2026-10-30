import { Pet } from "../../domain/pet";
import { PetRepositoryPort } from "../ports/out/pet-repository.port";
import { GetAllPetsUseCasePort } from "../ports/in/get-all-pets.port";

export class GetAllPetsUseCase implements GetAllPetsUseCasePort {
  constructor(private readonly petRepository: PetRepositoryPort) {}

  execute(): Promise<Pet[]> {
    return this.petRepository.findAll();
  }
}
