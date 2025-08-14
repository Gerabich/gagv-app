import { Injectable } from '@nestjs/common';
import { CreateUsuarioDTO } from './dto/create-usuario.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto';


@Injectable()
export class UsuariosService {
    constructor(private prisma: PrismaService) { }


    listar() {
        return this.prisma.usuario.findMany({
            select: {
                cveUsuario: true,
                numero_control: true,
                nombre: true,
                apellidos: true,
                username: true,
                fechaRegistro: true,
                correo: true,
                password: true
            }
        });
    }

    crear(usuario: CreateUsuarioDTO) {
        return this.prisma.usuario.create({
            data: usuario,
            select: {
                cveUsuario: true,
                numero_control: true,
                nombre: true,
                apellidos: true,
                username: true,
                fechaRegistro: true,
                correo: true,
                password: true
            }
        });
    }

    actualizar(cveUsuario: number, usuario: UpdateUsuarioDTO) {
        return this.prisma.usuario.update({
            where: { cveUsuario },
            data: {
                numero_control: usuario.numero_control,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                username: usuario.username,
                correo: usuario.correo,
                ...(usuario.password ? { password: usuario.password } : {}),
            },
            select: {
                cveUsuario: true,
                numero_control: true,
                nombre: true,
                apellidos: true,
                username: true,
                fechaRegistro: true,
                correo: true,
                password: true
            }
        });
    }

    async eliminar(cveUsuario: number) {

        return await this.prisma.usuario.delete({
            where: {
                cveUsuario: cveUsuario
            },
            select: {
                cveUsuario: true,
                numero_control: true,
                nombre: true,
                apellidos: true,
                username: true,
                fechaRegistro: true,
                correo: true,
                password: true
            }
        })
    }

}
