import { CreateUserDto } from "../../auth/dto/create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserDto extends PartialType(CreateUserDto){

}