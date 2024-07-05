import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  line1: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;
}

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  line1: string;

  @IsString()
  @IsOptional()
  pincode: string;
}
