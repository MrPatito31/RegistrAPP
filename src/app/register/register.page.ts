import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'
import { Platform, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{

  usuario = ""
  contrasena = ""
  nombre = ""
  apellido = ""
  correo = ""
  rut = ""
  conexion:any

  constructor(private sqlite:SQLite, private platform:Platform, private toastController:ToastController,
              private nav:NavController) { }

  ngOnInit(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.conexion = db
        })
        .catch(e => console.log(e));
    })
  }

  crearUsuario(){
    this.conexion.executeSql('insert into usuario values(?,?,?,?,?,?)', [this.usuario, this.contrasena, this.nombre, 
                                                                         this.apellido, this.correo, this.rut])
            .then(() => this.alerta('Usuario creado exitosamente'));
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

  validarUsuario(){
    if(!this.comprobarUsuario() || !this.comprobarPassword() || !this.comprobarCorreo()){
      this.alerta('Alguno de los datos no es correcto!, intenta otra vez')
    }else{
      this.crearUsuario()
      this.alerta('Usuario correctamente creado!')
    }
  }

  comprobarUsuario(){
    const correoAlumno = "@duocuc.cl";
    const correoProfesor = "@duocprofesor.cl";
    if (this.usuario.length >= 11 && this.usuario.length <= 30 ){
      if(this.usuario.includes(correoAlumno) || this.usuario.includes(correoProfesor)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  comprobarPassword(){
    if(this.contrasena.length >=6 && this.contrasena.length <=12){
      return true;
    }else{
      return false;
    }
  }

  comprobarCorreo(){
    const correo = "@gmail.com";
    if (this.correo.includes(correo)) {
      return true;
    }else{
      return false;
    }
  }
}
