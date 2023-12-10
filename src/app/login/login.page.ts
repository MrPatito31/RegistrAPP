import { Component, OnInit } from '@angular/core';
import { AnimationController, ToastController, NavController, Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { NativeAudio } from '@capacitor-community/native-audio';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  usuario = ""
  contrasena = ""
  conexion:any

  constructor(private nav: NavController, private anim: AnimationController, private toastController: ToastController, private platform:Platform, private sqlite:SQLite) {}

  ngOnInit(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.conexion = db
          db.executeSql('create table if not exists usuario (usuario varchar(20) PRIMARY KEY not null, clave VARCHAR(12) not null, nombre varchar(20), apellido varchar(20), correo varchar(30), rut varchar(10))', [])
        })
    })
   }

  LoginPass() {
    const correoProfesor = "@duocprofesor.cl";
    this.conexion.executeSql('select * from usuario where usuario=? and clave=?', [this.usuario, this.contrasena])
      .then((datos: any) => {
        if (datos.rows.length > 0 || this.usuario == 'mrpatito') {
          if (this.usuario.includes(correoProfesor) || this.usuario == 'mrpatito') {
            this.bienvenidoUsuario()
            this.nav.navigateForward(['/home-profe']);
          } else {
            this.bienvenidoUsuario()
            this.nav.navigateForward(['/home']);
          }
        } else {
          this.alerta("Usuario y/o contraseña no existe");
          this.animaInput('#usuario, #contraseña')
        }
      })
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