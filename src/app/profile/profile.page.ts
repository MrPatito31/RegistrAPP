import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public usuarios: any[] = [];
  conexion:any
  constructor(private nav:NavController, private sqlite:SQLite, private platform:Platform) { }

  ngOnInit(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.conexion = db
          this.conexion.executeSql('select * from usuario', [])
          .then((result: any) => {
            for (let i = 0; i < result.rows.length; i++){
              this.usuarios.push(result.rows.item(i));
            }
          })
        })
    })
  }

  Home(){
    this.nav.navigateBack(['/home'])
  }
}

