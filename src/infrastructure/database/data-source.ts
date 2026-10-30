import "dotenv/config";
import { DataSource } from "typeorm";
import { PetEntity } from "../../pets/infrastructure/out/persistence/pet.entity";

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [PetEntity],
  migrations: ["src/infrastructure/database/migrations/*.ts"],
  synchronize: false,
});
