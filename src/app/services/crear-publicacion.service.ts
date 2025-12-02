import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Respuesta } from "../interfaces/respuesta.interface";
import {
  CrearPublicacion,
  EtiquetaCrear,
  Publicacion,
} from "../interfaces/publicacion.interface";

@Injectable({
  providedIn: "root",
})
export class CrearPublicacionService {
  private ruta: string = "http://localhost:3000/pets";
  private http = inject(HttpClient);

  //Se ha de implementar la logica de sesion, por el momento se simula con un token que se obtiene al utilizar el endpoint de login en el backend

  crearPublicacion(publicacion: CrearPublicacion): Observable<Respuesta<any>> {
    const rutaEspecifica = `${this.ruta}/publicaciones/crear`;

    const token = localStorage.getItem("authToken");

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    return this.http.post<Respuesta<any>>(rutaEspecifica, publicacion, {
      headers,
    });
  }

  obtenerEtiquetas(): Observable<EtiquetaCrear[]> {
    const rutaEspecifica = `${this.ruta}/tags`;
    return this.http.get<EtiquetaCrear[]>(rutaEspecifica);
  }
}
