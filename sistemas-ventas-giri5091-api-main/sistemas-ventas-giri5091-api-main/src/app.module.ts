import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UtilsService } from './shared/service/utils.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ UsuariosModule, TareasModule, AuthModule],
  controllers:[],
  providers: [UtilsService, JwtService, UsuariosModule]
})
export class AppModule {}
