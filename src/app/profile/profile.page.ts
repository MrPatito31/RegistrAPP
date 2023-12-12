import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit{

  authenticatedUsers: any[] = [];

  constructor(private nav:NavController, private authService: AuthService) { }
  
  ngOnInit(){
    this.authenticatedUsers = this.authService.getAuthenticatedUsers();
  }

  Home(){
    const correoP = "@profesorduocuc.cl";
    if(this.authService.getCurrentUser().includes(correoP)){
      this.nav.navigateBack(['/home-profe'])
    }else{
      this.nav.navigateBack(['/home'])
    }
    
  }
}

