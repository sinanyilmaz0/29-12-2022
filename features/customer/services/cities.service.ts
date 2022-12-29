import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cities } from '../../models/customers/cities';

@Injectable({
  providedIn: 'root'
})

export class CitiesService {
  controllerUrl = `${environment.apiUrl}/cities`
  constructor(private httpClient:HttpClient) { }
  getList(): Observable<Cities[]>{
    return this.httpClient.get<Cities[]>(this.controllerUrl);
      }
}
