import { Component } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage {

  resultado=""
  claseId=""
  clase=""
  inicioClase=""
  finClase=""
  listQr: any[] = [];

  constructor(private alert:AlertController, private nav:NavController,
              private platform:Platform,private authService: AuthService) { }

  

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


  validarAsist(){
    
    if(this.resultado == localStorage.getItem('seccion')){
      return true
    }else{
      return false
    }
  }

  salir(){
    document.querySelector('body')!.classList.remove('scanner-active');
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();

    this.resultado = "";
    this.nav.navigateBack(['/home'])
  }
}
