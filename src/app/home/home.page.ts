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

  listQrA: any[] = [];
  darkMode = false;
  
  constructor(private nav:NavController, private authService: AuthService) {}
  
  ngOnInit(){
    this.listQrA = this.authService.getQrA();
  }

  checkAppMode(){
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);  
  }

  toggleDarkMode(){
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode)
    if(this.darkMode){
      localStorage.setItem('darkModeActivated', 'true');
    }else{
      localStorage.setItem('darkModeActivated', 'false');
    }
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
  
  getQrA(): any[]{
    return this.listQrA;
  }

  async playAudio(){
    await NativeAudio.play({
      assetId: 'click',
      // time: 6.0 - seek time
  });
  }


}