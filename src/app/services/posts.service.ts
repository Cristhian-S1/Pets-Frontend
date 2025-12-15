import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Post } from "../components/post/post";
import { Observable } from "rxjs";
import { Publicacion } from "../interfaces/publicacion.interface";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private apiUrl = "http://localhost:3000/pets";
  private http = inject(HttpClient);

  getAllPosts(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl + "/posts");
  }

  obtenerDetalles(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/verDetalles/${id}`);
  }

  getPostsByUser(): Observable<any> {
    const token = localStorage.getItem("authToken");

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    return this.http.get(`${this.apiUrl}/my-posts`, { headers });
  }

  cambiarEstadoPublicacion(id: number, estado: boolean): Observable<any> {
    const token = localStorage.getItem("authToken");

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    // En el body solo enviamos el estado, el ID va en la URL
    const body = { pu_estado: estado };

    return this.http.put(`${this.apiUrl}/my-posts/${id}`, body, { headers });
  }

  darLike(pu_id: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/publicaciones/reaccionar`, {pu_id});
  }
}
