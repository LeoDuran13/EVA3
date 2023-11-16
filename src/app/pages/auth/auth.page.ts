import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  //form = new FormGroup({
    ///password: new FormControl('', [Validators.required,])
  //})

  email:string = "";
  password:string = "";

  constructor(private router:Router, 
    private helperService:HelperService,
    private auth:AngularFireAuth,
    private storage:StorageService,) { }



  //servicios
  //firebaseSvc = inject(FirebaseService);
  //utilsSvc = inject(UtilsService);
  

  ngOnInit() {
  }

  async login(){
    const loader = await this.helperService.showLoading("cargando");
    try {
    this.storage.userCorreo = this.email;
    
    const request = await this.auth.signInWithEmailAndPassword(this.email,this.password);
    console.log("TOKEN", await request.user?.getIdToken());
    //this.helperService.showAlert("inicio de sesion correcto","Exito!");
    await this.router.navigateByUrl("perfil");
    await loader.dismiss();
    } catch (error:any) {
      if(error.code == 'auth/invalid-email'){
        await loader.dismiss();
        await this.helperService.showAlert("error en el formato","ERROR")
      } 
      if(error.code == 'auth/user-not-found'){
        await loader.dismiss();
        await this.helperService.showAlert("usuario no encontrado","ERROR")
      }
      if(error.code == 'auth/wrong-password'){
        await loader.dismiss();
        await this.helperService.showAlert("contraseña invalida","ERROR")
      }

      if(error.code == 'auth/weak-password'){
        await loader.dismiss();
        await this.helperService.showAlert("el largo de la contraseña es incorrecto","ERROR")
      }
    }
  }
  recuperar(){
      this.router.navigateByUrl("recuperar")
  }
  registro(){
      this.router.navigateByUrl("sing-up");
  }

  //async submit() {
    //const app = await initializeApp(environment.firebaseConfig);

    //--actulizacion de nombre
    //const loading = await this.utilsSvc.loading();
    //await loading.present();

    //if(this.form.valid){
      //this.firebaseSvc.singIN(this.form.value as User).then(res =>{

        //console.log(res);
        
      //}).catch(error =>{
        //console.log(error);

        //this.utilsSvc.presentToast({
          //message: error.message,
          //duration: 3500,
          //color: 'primary',
          //icon: 'alert-circle-outline'
        //})
        
      //}).finally(()=>{
        //loading.dismiss();
      //})
    //}
  //}




}
