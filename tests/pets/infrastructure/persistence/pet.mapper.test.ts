import { describe, expect, it } from "@jest/globals";
import { PetMapper } from "../../../../src/pets/infrastructure/persistence/pet.mapper";
import { Pet } from "../../../../src/pets/infrastructure/persistence/pet.model";
import { Gender, Species } from "../../../../src/pets/domain/pet";

describe("PetsMapper", () => {
  it("correct pets mapping", async () => {
    // Arrange
    const birthdate = new Date("2020-12-24T00:00:00.000Z");
    const document = new Pet({
      name: "test",
      species: Species.Bird,
      gender: Gender.Female,
      birthdate,
    });
    // Act
    const mapResult = PetMapper.toDomain(document);
    // Assert
    expect(mapResult).toEqual({
      id: document._id.toString(),
      name: "test",
      species: Species.Bird,
      gender: Gender.Female,
      birthdate,
    });
  });
});
