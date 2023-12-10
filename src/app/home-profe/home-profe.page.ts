import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {NativeAudio} from '@capacitor-community/native-audio'

@Component({
  selector: 'app-home-profe',
  templateUrl: './home-profe.page.html',
  styleUrls: ['./home-profe.page.scss'],
})
export class HomeProfePage {

  constructor(private nav:NavController) { }

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

  setCurrentTab(event: any){
    console.log(event);
    this.playAudio();
  }

  async playAudio(){
    await NativeAudio.play({
      assetId: 'click',
      // time: 6.0 - seek time
  });
  }
}
