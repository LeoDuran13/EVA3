import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Plugins } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from 'capacitor-barcode-scanner';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  coordinates: any;
  parametroIdEmpleado:number | undefined;
  resultadoScan:any='';

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  async localizacion() {
    try {
      this.coordinates = await Geolocation.getCurrentPosition();
    } catch (error) {
      console.error('Error al obtener la localización', error);
    }
  }

  async scan(){
    this.resultadoScan = (await  BarcodeScanner.scan()).code;
    console.log("Resultado scan",JSON.parse(this.resultadoScan));
  }


  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      // La imagen se encuentra en image.dataUrl
      // Puedes mostrar la imagen en tu página o hacer cualquier otra operación que desees.
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }
}
