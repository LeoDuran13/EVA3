import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/services/utils.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Region } from 'src/app/models/regiones';
import { Comuna } from 'src/app/models/comuna';
import { LocacionServicesService } from 'src/app/services/locacionServices.service';
import { StorageService } from 'src/app/services/storage.service';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

  name: string ="";
  email:string = '';
  contrasena:string = '';
  Region: Region [] = [];
  Comuna: Comuna [] = [];
  NRegion: number= 0;
  NComuna: number= 0;
  regionSelec :number = 0;
  comunaSelec :number = 0;
  

  constructor(private auth:AngularFireAuth,
    private router:Router,
    private location: LocacionServicesService,
    private storage: StorageService
    
) { }  
  

  ngOnInit() {
    this.cargarRegion()
  }
  
  async registro(){
    try {
      // Obtener el nombre de usuario desde el formulario
      const NombreUsuario = this.name;
      // Crear un objeto de usuario que incluye correo, contraseña, nombre, región y comuna
      const user = {
        correo: this.email,
        contrasena: this.contrasena,
        name: NombreUsuario,
        region: this.location.selectedRegion, // Obtener la región seleccionada desde LocationService
        comuna: this.location.selectedComuna, // Obtener la comuna seleccionada desde LocationService
      };


      // Registrar al usuario en Firebase Authentication      
      const request = await this.auth.createUserWithEmailAndPassword(this.email,this.contrasena);

      if (request.user) {
        // Agregar el usuario al almacenamiento local
        this.storage.agregarUser([user]);
        //this.helperService.showAlert("Usuario registrado correctamente", "INFORMACIÓN");
        await this.router.navigateByUrl("login");
        
      }    
      
      await this.router.navigateByUrl('login');
      
    } catch (error:any) {
      if(error.code == 'auth/invalid-email'){
        
      }
      if(error.code == 'auth/weak-password'){
        
      }
    }
  }
  
  // Asignar la región seleccionada
  async cargarRegion() {
    const req = await this.location.getRegion();
    this.Region = req.data;
    
    if (this.Region.length > 0) {
      this.location.selectedRegion = this.Region[0];
    }
  }
  // Asignar la comuna seleccionada
  async cargarComuna() {
    const req = await this.location.getComuna(this.regionSelec);
    this.Comuna = req.data;
    
    if (this.Comuna.length > 0) {
      this.location.selectedComuna = this.Comuna[0];
    }
  }





}
