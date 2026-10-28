import { PetRepository } from "../../application/ports/pet.repository";
import { PetMapper } from "./pet.mapper";
import { Pet as MongoosePet } from "./pet.model";
import { Pet as DomainPet } from "../../domain/pet";

export class MongoosePetRepository implements PetRepository {
  async findAll(): Promise<DomainPet[]> {
    const documents = await MongoosePet.find().sort({ _id: 1 }).exec();

    return documents.map((document) => PetMapper.toDomain(document));
  }
}
