import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {NativeAudio} from '@capacitor-community/native-audio'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  listQr: any[] = [];
  
  constructor(private nav:NavController, private authService: AuthService) {}
  
  ngOnInit(){
    this.listQr = this.authService.getQr();
  }

  Login(){
    this.authService.logout()
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
  
  getQr(): any[]{
    return this.listQr;
  }

  async playAudio(){
    await NativeAudio.play({
      assetId: 'click',
      // time: 6.0 - seek time
  });
  }


}