import { Module } from "@nestjs/common";
import { PetsModule } from "./pets/pets.module";
import { DatabaseModule } from "./infrastructure/database/database.module";

@Module({ imports: [PetsModule, DatabaseModule] })
export class NestAppModule {}
