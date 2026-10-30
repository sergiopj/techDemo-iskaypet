import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GetAllPetsUseCase } from "./application/use-cases/get-all-pets.use-case";
import { PetEntity } from "./infrastructure/out/persistence/pet.entity";
import { TypeOrmPetRepository } from "./infrastructure/out/persistence/typeorm-pet.repository";
import { PetsController } from "./infrastructure/in/http/pets.controller";
import {
  PetRepositoryPort,
  PET_REPOSITORY,
} from "./application/ports/out/pet-repository.port";
import { GET_ALL_PETS_USE_CASE } from "./application/ports/in/get-all-pets.port";

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  providers: [
    {
      provide: PET_REPOSITORY,
      useClass: TypeOrmPetRepository,
    },
    {
      provide: GET_ALL_PETS_USE_CASE,
      useFactory: (repository: PetRepositoryPort) =>
        new GetAllPetsUseCase(repository),
      inject: [PET_REPOSITORY],
    },
  ],
  controllers: [PetsController],
})
export class PetsModule {}
