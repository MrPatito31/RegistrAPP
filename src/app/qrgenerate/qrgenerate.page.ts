import { Component, ViewChild, ElementRef } from '@angular/core';
import  QRCode  from 'easyqrcodejs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qrgenerate',
  templateUrl: './qrgenerate.page.html',
  styleUrls: ['./qrgenerate.page.scss'],
})
export class QrgeneratePage {

  @ViewChild('qrcode', { static: false })
  private qrcode!: ElementRef;
  qr: QRCode
  idQR = ""  
  nombreClase=""
  inicioC=""
  finC=""
  textoQR=""

  constructor(private nav:NavController) { }

  async generarQR() {
    await new Promise(resolve => setTimeout(resolve, 200));
    let options = {
      text: this.idQR,
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

  salir(){
    this.nav.navigateBack(['/home-profe'])
  }

}
