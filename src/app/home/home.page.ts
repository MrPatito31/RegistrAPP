import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {NativeAudio} from '@capacitor-community/native-audio'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  

  constructor(private nav:NavController) {}
  

  Login(){
    this.nav.navigateBack(['/login'])
    this.playAudio()
  }

  Setting(){
    this.nav.navigateForward(['/settings'])
    this.playAudio()
  }

  Profile(){
    this.nav.navigateForward(['/profile'])
    this.playAudio()
  }

  Qr(){
    this.nav.navigateForward(['/qr'])
    this.playAudio()
  }

  QrGenerate(){
    this.nav.navigateForward(['/qrgenerate'])
    this.playAudio()
  }

  async playAudio(){
    await NativeAudio.play({
      assetId: 'click',
      // time: 6.0 - seek time
  });
  }


}