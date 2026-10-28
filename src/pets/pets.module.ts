import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GetAllPetsUseCase } from "./application/use-cases/get-all-pets.use-case";
import { PetEntity } from "./infrastructure/persistence/pet.entity";
import { TypeOrmPetRepository } from "./infrastructure/persistence/typeorm-pet-repository";
import { PetRepository } from "./application/ports/pet.repository";
import { PetsController } from "./infrastructure/http/pets.controller";

// Token used by NestJS to inject the PetRepository port adapter.
export const PET_REPOSITORY = Symbol("PET_REPOSITORY");

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  providers: [
    {
      provide: PET_REPOSITORY,
      useClass: TypeOrmPetRepository,
    },
    {
      provide: GetAllPetsUseCase,
      useFactory: (repository: PetRepository) =>
        new GetAllPetsUseCase(repository),
      inject: [PET_REPOSITORY],
    },
  ],
  controllers: [PetsController],
})
export class PetsModule {}
