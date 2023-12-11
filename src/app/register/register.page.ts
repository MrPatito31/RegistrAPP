import { Component} from '@angular/core';
import { ToastController, NavController, AnimationController } from '@ionic/angular';
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

  constructor(private toastController:ToastController, private nav:NavController, private authService: AuthService, private anim: AnimationController) { }

  validarUsuario() {
    // Realizar validaciones antes de intentar el registro
    if (
        this.validarUser() &&
        this.validarNombre() &&
        this.validarPasword() &&
        this.validarCorreo() &&
        this.validarRut()
    ) {
        // Intentar el registro solo si las validaciones son exitosas
        if (this.authService.register(this.usuario, this.contrasena, this.nombre, this.apellido, this.correo, this.rut)) {
            // Registro exitoso
            this.alerta('Registrado correctamente');
        } else {
            // Registro fallido (usuario ya existe)
            this.alerta('Usuario ya registrado');
        }
    } else {
        // Mostrar mensaje de error si las validaciones no son exitosas
        this.alerta('Datos incorrectos');
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

  validarUser(){
    const correoP = "@profesorduocuc.cl"
    const correoA = "@duocuc.cl"
    if(this.usuario.length >= 10 && this.usuario.length <= 30 && this.usuario.includes(correoP) || this.usuario.includes(correoA)){
      return true;
    }else{
      return false;
    }
  }

  validarPasword(){
    if(this.contrasena.length >= 8 && this.contrasena.length <= 16){
      return true
    }else{
      return false
    }
  }

  validarCorreo(){
    const correo = "@gmail.com";
    if(this.correo.includes(correo)){
      return true
    }else{
      return false
    }    
  }

  validarNombre(){
   if(this.nombre.length >= 1 && this.nombre.length <= 20 && this.apellido.length >= 1 && this.apellido.length <= 20 ){
    return true
   }else{
    return false
   }
  }

  validarRut() {
    const guionV = '-';
    
    // Verificar que el RUT tenga la longitud adecuada
    if (this.rut.length === 10) {
            // Verificar que el guion esté en la posición correcta
            if (this.rut.includes(guionV) && this.rut.indexOf(guionV) === 8) {
                // RUT válido
                return true;   
        }
    }
    // RUT inválido
    return false;
}

  animaInput(input: string) {
    let usuario = document.querySelector(input) as HTMLInputElement
    usuario.focus()
    this.anim.create().addElement(usuario)
      .duration(100).iterations(3)
      .keyframes([
        { offset: 0, transform: 'rotate(-3deg)' },
        { offset: 0.5, transforma: 'rotate(3deg)' },
        { offset: 1, transform: 'rotate(0)' }
      ]).play()
  }
  
}
