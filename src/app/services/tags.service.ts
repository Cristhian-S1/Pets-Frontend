import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etiqueta } from '../interfaces/etiqueta.interface';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);


  getAllTags(): Observable<Etiqueta[]> {
    return this.http.get<Etiqueta[]>(this.apiUrl + '/tags');
  }
}
