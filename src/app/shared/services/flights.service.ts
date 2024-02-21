import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private apiUrl = 'https://api-colombia.com/api/v1/';
  private username = 'devdiavisualedwin'; // Reemplaza con tu nombre de usuario de Geonames

  constructor(private http: HttpClient) {}

  getApiColombia(url: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + url);
  }
}
