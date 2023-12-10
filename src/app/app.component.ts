import { Component } from '@angular/core';
import {NativeAudio} from '@capacitor-community/native-audio';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.preloadAudio();
  }

  async preloadAudio(){
    await NativeAudio.preload({
      assetId: "click",
      assetPath: "click.mp3",
      audioChannelNum: 1,
      isUrl: false
    });

    await NativeAudio.preload({
      assetId: "inicio",
      assetPath: "inicio.mp3",
      audioChannelNum: 1,
      isUrl: false
    });
  }

  
    
}
