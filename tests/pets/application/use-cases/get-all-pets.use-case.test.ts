import { describe, expect, it, jest } from "@jest/globals";
import { GetAllPetsUseCase } from "../../../../src/pets/application/use-cases/get-all-pets.use-case";
import { PetRepository } from "../../../../src/pets/application/ports/pet.repository";
import { Gender, Pet, Species } from "../../../../src/pets/domain/pet";

describe("GetAllPetsUseCase", () => {
  it("returns pets from the repository", async () => {
    // Arrange
    const pets: Pet[] = [
      {
        id: "pet-1",
        name: "Luna",
        species: Species.Cat,
        gender: Gender.Female,
        birthdate: new Date("2020-05-10"),
      },
    ];
    const petRepository: PetRepository = {
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
