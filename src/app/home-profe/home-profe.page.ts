import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {NativeAudio} from '@capacitor-community/native-audio'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-profe',
  templateUrl: './home-profe.page.html',
  styleUrls: ['./home-profe.page.scss'],
})
export class HomeProfePage implements OnInit{

  listQr: any[] = [];

  constructor(private nav:NavController, private authService: AuthService) { }

  ngOnInit(){
    this.listQr = this.authService.getQr();
  }

  getQr(): any[]{
    return this.listQr;
  }

  Login(){
    this.authService.logout()
    this.nav.navigateBack(['/login'])
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
