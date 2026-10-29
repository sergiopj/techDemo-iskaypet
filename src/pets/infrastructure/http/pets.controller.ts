import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetAllPetsUseCase } from "../../application/use-cases/get-all-pets.use-case";
import { PetResponseDto } from "./dto/pet-response.dto";

@Controller("pets")
@ApiTags("Pets")
export class PetsController {
  constructor(private readonly getAllPetsUseCase: GetAllPetsUseCase) {}

  @Get()
  @ApiOperation({ summary: "List all pets" })
  @ApiOkResponse({ type: PetResponseDto, isArray: true })
  async findAll(): Promise<PetResponseDto[]> {
    const pets = await this.getAllPetsUseCase.execute();

    return pets.map(PetResponseDto.fromDomain);
  }
}
