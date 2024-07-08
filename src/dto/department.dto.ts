import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import "reflect-metadata";

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  name: string;
}
