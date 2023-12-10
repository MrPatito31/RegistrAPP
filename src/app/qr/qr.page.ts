import { Component } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage {

  resultado=""
  conexion:any
  claseId=""
  clase=""
  inicioClase=""
  finClase=""

  constructor(private alert:AlertController, private nav:NavController, private sqlite:SQLite,
              private platform:Platform) { }

  

  async escanear(){

    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    document.querySelector('body')!.classList.add('scanner-active');

    const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
    if (result.hasContent) {
      this.resultado = result.content
    }
  }

  async detener() {
    document.querySelector('body')!.classList.remove('scanner-active');
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();

    this.resultado = "";
  }

  salir(){
    document.querySelector('body')!.classList.remove('scanner-active');
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();

    this.resultado = "";
    this.nav.navigateBack(['/home'])
  }
}
