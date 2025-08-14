import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength,  } from "class-validator";

export class UpdateUsuarioDTO{
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(3)
    numero_control: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    @MinLength(3)   
    nombre: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    @MinLength(3)
    apellidos: string;

    @IsEmail()
    correo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(3)
    username: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    @MinLength(3)
    password?: string;
}