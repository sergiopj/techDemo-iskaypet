import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  GetAllPetsUseCasePort,
  GET_ALL_PETS_USE_CASE,
} from "../../../application/ports/in/get-all-pets.port";
import { PetResponseDto } from "./dto/pet-response.dto";

@Controller("pets")
@ApiTags("Pets")
export class PetsController {
  constructor(
    @Inject(GET_ALL_PETS_USE_CASE)
    private readonly getAllPetsUseCase: GetAllPetsUseCasePort,
  ) {}

  @Get()
  @ApiOperation({ summary: "List all pets" })
  @ApiOkResponse({ type: PetResponseDto, isArray: true })
  async findAll(): Promise<PetResponseDto[]> {
    const pets = await this.getAllPetsUseCase.execute();

    return pets.map(PetResponseDto.fromDomain);
  }
}
