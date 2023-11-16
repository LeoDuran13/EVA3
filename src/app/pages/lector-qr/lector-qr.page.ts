import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from 'capacitor-barcode-scanner';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQRPage implements OnInit {

  parametroIdEmpleado:number | undefined;
  resultadoScan:any='';
  constructor(private activatedRoute:ActivatedRoute) { } 


  ngOnInit() {
    this.parametroIdEmpleado = this.activatedRoute.snapshot.params['idempleado'];
    console.log("Parametro",this.parametroIdEmpleado);
  }

/*   {
    "nombre":"Javier",
    "Edad":21
  } */


  async scan(){
    this.resultadoScan = (await  BarcodeScanner.scan()).code;
    console.log("Resultado scan",JSON.parse(this.resultadoScan));
  }
}