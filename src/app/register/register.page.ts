import { Component} from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage{

  usuario = ""
  contrasena = ""
  nombre = ""
  apellido = ""
  correo = ""
  rut = ""
  conexion:any

  constructor(private toastController:ToastController, private nav:NavController, private authService: AuthService) { }

  validarUsuario() {
    if (this.authService.register(this.usuario, this.contrasena, this.nombre, this.apellido, this.correo, this.rut)) {
      this.alerta('registrado correctamente');
    } else {
      // Muestra un mensaje de error indicando que el usuario ya existe
    }
  }

  async alerta(texto:string){
    const toast = await this.toastController.create({
      message: texto,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present()
  }

  loginnav(){
    this.nav.navigateBack(['/login']);
  }
}
