import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/apiRegiones';
import { Region } from '../models/regiones';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comuna } from '../models/comuna';


@Injectable({
  providedIn: 'root'
})
export class LocacionServicesService {

  // Variable para mantener la región seleccionada

  selectedRegion: Region | undefined; 
  selectedComuna: Comuna | undefined;

  constructor(private http:HttpClient) { }
  async getRegion(){
    return await lastValueFrom(this.http.get<ApiResponse<Region>>(`${environment.apiUrl}region`));
  }

  //async getNomRegion(){
    //return await lastValueFrom(this.http.get<ApiResponse<Region>>(`${environment.apiUrl}region`));


  //}

  async getComuna(regionId:number){
    return await lastValueFrom(this.http.get<ApiResponse<Region>>(`${environment.apiUrl}comuna/` + regionId));
  }
}
