import { Gender, Pet as DomainPet, Species } from "../../domain/pet";
import { PetDocument } from "./pet.model";

const SPECIES_BY_PERSISTED_VALUE: ReadonlyMap<string, Species> = new Map([
  [Species.Dog, Species.Dog],
  [Species.Cat, Species.Cat],
  [Species.Fish, Species.Fish],
  [Species.Bird, Species.Bird],
  [Species.Reptile, Species.Reptile],
]);

const LEGACY_SPECIES_COMPATIBILITY: ReadonlyMap<string, Species> = new Map([
  ["pelican", Species.Bird],
]);

const GENDER_BY_PERSISTED_VALUE: ReadonlyMap<string, Gender> = new Map([
  [Gender.Male, Gender.Male],
  [Gender.Female, Gender.Female],
]);

export class PetMapper {
  static toDomain(document: PetDocument): DomainPet {
    return {
      id: document._id.toString(),
      name: document.name,
      species: this.toDomainSpecies(document.species),
      gender: this.toDomainGender(document.gender),
      birthdate: document.birthdate,
    };
  }

  static toDomainSpecies(species: string): Species {
    const normalizedSpecies = species.toLowerCase().trim();
    const domainSpecies =
      LEGACY_SPECIES_COMPATIBILITY.get(normalizedSpecies) ??
      SPECIES_BY_PERSISTED_VALUE.get(normalizedSpecies);

    if (!domainSpecies) {
      throw new Error(`Unsupported pet species in database: ${species}`);
    }

    return domainSpecies;
  }

  static toDomainGender(gender: string): Gender {
    const normalizedGender = gender.toLowerCase().trim();
    const domainGender = GENDER_BY_PERSISTED_VALUE.get(normalizedGender);

    if (!domainGender) {
      throw new Error(`Unsupported pet gender in database: ${gender}`);
    }

    return domainGender;
  }
}
