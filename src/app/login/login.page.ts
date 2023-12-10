import { Component } from '@angular/core';
import { AnimationController, ToastController, NavController } from '@ionic/angular';
import { NativeAudio } from '@capacitor-community/native-audio';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  usuario: string = ""
  contrasena: string = ""

  constructor(private nav: NavController, private anim: AnimationController, private toastController: ToastController,private authService: AuthService) {}

  LoginPass() {
    if (this.authService.login(this.usuario, this.contrasena)) {
      this.bienvenidoUsuario();
      this.nav.navigateForward(['/home'])
    } else {
      this.alerta('los datos son erroneos');
    }
  }
  

  bienvenidoUsuario() {
    this.alerta("Bienvenido " + this.usuario);
    this.playAudio();
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

  registronav() {
    this.nav.navigateForward(['/register']);
  }

  async alerta(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present()
  }

  async playAudio() {
    await NativeAudio.play({
      assetId: 'inicio',
    });
  }
}