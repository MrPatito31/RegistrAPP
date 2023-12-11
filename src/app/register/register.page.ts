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
    const userValidationResult = this.validarUser();
    const nombreValidationResult = this.validarNombre();
    const apellidoValidationResult = this.validarApellido();
    const passwordValidationResult = this.validarPasword();
    const correoValidationResult = this.validarCorreo();
    const rutValidationResult = this.validarRut();

    if (
        userValidationResult === 'OK' &&
        nombreValidationResult === 'OK' &&
        apellidoValidationResult === 'OK' &&
        passwordValidationResult === 'OK' &&
        correoValidationResult === 'OK' &&
        rutValidationResult === 'OK'
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
        this.alerta(`Error: ${userValidationResult}, ${nombreValidationResult}, ${apellidoValidationResult}, ${passwordValidationResult}, ${correoValidationResult}, ${rutValidationResult}`);
    }
}

  validarUser(): string {
    const correoP = "@profesorduocuc.cl";
    const correoA = "@duocuc.cl";

    if (this.usuario.length >= 10 && this.usuario.length <= 30 && (this.usuario.includes(correoP) || this.usuario.includes(correoA))) {
        return 'OK';
    } else {
        return 'El usuario no cumple con los requisitos.';
    }
  }

  validarPasword(): string {
    if(this.contrasena.length >= 8 && this.contrasena.length <= 16){
      return 'OK';
    }else{
      return 'La contraseña es de 8 a 16 caracteres';
    }
  }

  validarCorreo(): string {
    const correo = "@gmail.com";
    if(this.correo.includes(correo)){
      return 'OK';
    }else{
      return 'El correo es invalido';
    }    
  }

  validarNombre(): string {
   if(this.nombre.length >= 1 && this.nombre.length <= 20){
    return 'OK';
   }else{
    return 'El nombre es de 1 a 20 caracteres';
   }
  }

  validarApellido(): string{
    if(this.apellido.length >= 1 && this.apellido.length <= 20){
     return 'OK';
    }else{
     return 'El apellido es de 1 a 20 caracteres';
    }
   }

  validarRut(): string {
    const guionV = '-';
    
    // Verificar que el RUT tenga la longitud adecuada
    if (this.rut.length === 10) {
            // Verificar que el guion esté en la posición correcta
            if (this.rut.includes(guionV) && this.rut.indexOf(guionV) === 8) {
                // RUT válido
                return 'OK';   
        }
    }
    // RUT inválido
    return 'El rut no cumple los requisitos (12345678-7)';
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
 
  async alerta(texto:string){
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present()
  }

  loginnav(){
    this.nav.navigateBack(['/login']);
  }

}
