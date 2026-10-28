import { InjectRepository } from "@nestjs/typeorm";
import { PetRepository } from "../../application/ports/pet.repository";
import { PetEntity } from "./pet.entity";
import { Repository } from "typeorm";
import { Pet as DomainPet } from "../../domain/pet";

export class TypeOrmPetRepository implements PetRepository {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petEntityRepository: Repository<PetEntity>,
  ) {}

  async findAll(): Promise<DomainPet[]> {
    const entities = await this.petEntityRepository.find();

    return entities.map((entity) => ({
      id: entity.id,
      name: entity.name,
      species: entity.species,
      gender: entity.gender,
      birthdate: new Date(entity.birthdate),
    }));
  }
}
