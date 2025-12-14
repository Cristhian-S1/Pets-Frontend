import { HttpClient } from "@angular/common/http";
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

  crearComentario(pu_id: number, contenido: string) {
    const token = localStorage.getItem("authToken");

    return this.http.post(
      `${this.apiUrl}/comentarios`,
      {
        pu_id,
        cm_contenido: contenido,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }




}


