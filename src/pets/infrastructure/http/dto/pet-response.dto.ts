import { ApiProperty } from "@nestjs/swagger";
import { Gender, Species } from "../../../domain/pet";

export class PetResponseDto {
  @ApiProperty({ format: "uuid", example: "b3b0b3b1-5b2a-4b2a-9b1a-123456789abc" })
  id!: string;

  @ApiProperty({ example: "Luna" })
  name!: string;

  @ApiProperty({ enum: Species, example: Species.Dog })
  species!: Species;

  @ApiProperty({ enum: Gender, example: Gender.Female })
  gender!: Gender;

  @ApiProperty({
    format: "date-time",
    example: "2020-03-15T00:00:00.000Z",
  })
  birthdate!: string;
}
