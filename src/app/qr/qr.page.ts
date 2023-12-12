import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { NavController, ToastController } from '@ionic/angular';
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

  constructor(private toastController:ToastController, private nav:NavController, private authService: AuthService) { }  


  async escanear() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    document.querySelector('body')!.classList.add('scanner-active');
            
    let listaDatos: string[] = [];
            
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
       
          this.resultado = result.content;
              
          // Actualizar listaDatos con el nuevo valor de this.resultado
          listaDatos = JSON.parse(this.resultado);
              
          if (listaDatos.length >= 3) {
            const [dato1, dato2, dato3] = listaDatos;

            // Aquí puedes hacer lo que necesites con las variables independientes
            if (this.authService.newQrA(dato1, dato2, dato3)){
              this.alerta('qr escaneado')
            }else{
              this.alerta('Qr no cumple los requisistos')
            }
          } else {
            console.error("La listaDatos no tiene al menos 3 elementos.");
          }
        
      }
  }

  async detener() {
    document.querySelector('body')!.classList.remove('scanner-active');
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();

    this.resultado = "";
  }


  validarAsist(){
    const guionQrA = '-'
    
    if(this.resultado.includes(guionQrA)  && this.resultado.length == 5){
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

  async alerta(texto:string){
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present()
  }
}
