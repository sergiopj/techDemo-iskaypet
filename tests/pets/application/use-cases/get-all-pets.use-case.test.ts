import { describe, expect, it, jest } from "@jest/globals";
import { GetAllPetsUseCase } from "../../../../src/pets/application/use-cases/get-all-pets.use-case";
import { Gender, Pet, Species } from "../../../../src/pets/domain/pet";
import { PetRepositoryPort } from "../../../../src/pets/application/ports/out/pet-repository.port";

describe("GetAllPetsUseCase", () => {
  it("returns pets from the repository", async () => {
    // Arrange
    const pets: Pet[] = [
      {
        id: "pet-1",
        name: "Luna",
        species: Species.Cat,
        gender: Gender.Female,
        birthdate: "2020-05-10",
      },
    ];
    const petRepository: PetRepositoryPort = {
      findAll: jest.fn<() => Promise<Pet[]>>().mockResolvedValue(pets),
    };
    const useCase = new GetAllPetsUseCase(petRepository);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual(pets);
    expect(petRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
