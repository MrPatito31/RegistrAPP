import { Component, ViewChild, ElementRef} from '@angular/core';
import  QRCode  from 'easyqrcodejs';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-qrgenerate',
  templateUrl: './qrgenerate.page.html',
  styleUrls: ['./qrgenerate.page.scss'],
})
export class QrgeneratePage {

  @ViewChild('qrcode', { static: false })
  private qrcode!: ElementRef;
  qr: QRCode
  seccion=""
  clase=""
  hora=""
  datos=[this.seccion, this.clase,this.hora]

  constructor(private nav:NavController,private toastController:ToastController, private authService: AuthService) { }

  async generarQR() {
    await new Promise(resolve => setTimeout(resolve, 200));
    let options = {
      text: JSON.stringify(this.datos), 
      logoBackgroundTransparent: true,
      title: "RegistrAPP",//Texto del titulo
      titleFont: "bold 26px Arial",//Fuente del titulo
      titleColor: "#fdb92f",//Color del texto del titulo
      titleBackgroundColor: "#ffffff10",//Color de fondo del titulo
      titleHeight: 50,//El alto del espacio donde va el titulo
      titleTop: 25,//El espacio desde el borde al titulo
      width: 256,//Ancho (max256)
      height: 256,//Alto (max(256)
      colorDark: "#ffff",//Color de los puntitos
      colorLight: "#ffffff10",//color de fondo
      quietZone: 10,//padding
      quietZoneColor: 'transparent',
      dotScale: .7,//Tamaño de los puntitos
      tooltip: false,
      crossOrigin: null,
    };
    if (this.qr) {
      this.qr.clear()
    }
    this.qr = new QRCode(this.qrcode.nativeElement, options);
  }

  validarQr() {
    // Realizar validaciones antes de intentar el registro
    if (
        this.validarIdQr() &&
        this.validarClase() &&
        this.validarHora()
        
    ) {
      this.datos=[this.seccion, this.clase,this.hora];
        // Intentar el registro solo si las validaciones son exitosas
        if (this.authService.newQr(this.seccion, this.clase, this.hora)) {
            // Registro exitoso
            this.alerta('QR generado correctamente');
            this.generarQR();
        } else {
            // Registro fallido (usuario ya existe)
            this.alerta('Datos incorrectos1');
        }
    } else {
        // Mostrar mensaje de error si las validaciones no son exitosas
        this.alerta('Datos incorrectos2');
    }
}

  validarIdQr(){
    const guionQr = '-'
    if (this.seccion.includes(guionQr)  && this.seccion.length == 5){
      return true      
    }else{
      return false
    }
  }
  
  validarClase(){
    if (this.clase.length >=4 && this.clase.length <=25){
      return true
    }else{
      return false
    }
  }

  validarHora(){
    if(this.hora.includes(':') && this.hora.includes('-') ){
      return true
    }else{
      return false
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

  salir(){
    this.nav.navigateBack(['/home-profe'])
  }

}
