import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../components/post/post';
import { Observable } from 'rxjs';
import { Publicacion } from '../interfaces/publicacion.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);


  getAllPosts(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl + '/posts');
  }
}
