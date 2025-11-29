import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Publicacion, CrearPublicacion } from "../models/publicacion.interface";
import { Respuesta } from "../models/respuesta.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PublicacionService {
  private ruta: string = "http://localhost:3000/pets";
  private http = inject(HttpClient);

  //Se ha de implementar la logica de sesion, por el momento se simula con un token que se obtiene al utilizar el endpoint de login en el backend
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpYUBnb21lei5jb20iLCJjb250YWN0byI6OTExMTExMTExLCJpYXQiOjE3NjQ0MzcxNzUsImV4cCI6MTc2NDQ0MDc3NX0.OKhd0JwIQ6j7NhDlUoW0UnwLyxCHomF9zxLjJ-0MDJI";

  obtenerPublicaciones(): Observable<Respuesta<Publicacion[]>> {
    const rutaEspecifica = `${this.ruta}/publicaciones`;
    return this.http.get<Respuesta<Publicacion[]>>(rutaEspecifica);
  }

  crearPublicacion(publicacion: CrearPublicacion): Observable<Respuesta<any>> {
    const rutaEspecifica = `${this.ruta}/publicaciones/crear`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    });

    return this.http.post<Respuesta<any>>(rutaEspecifica, publicacion, {
      headers,
    });
  }
}
