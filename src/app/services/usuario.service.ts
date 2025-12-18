import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../interfaces/usuario.inteface";
@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private ruta: string = "http://localhost:3000/pets";
  private http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("authToken"); // tu token guardado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }

  // Obtener perfil del usuario
  public obtenerPerfil(): Observable<{ cod: number; msj: string; datos: Usuario }> {
    return this.http.get<{ cod: number; msj: string; datos: Usuario }>(
      `${this.ruta}/perfil`,
      { headers: this.getHeaders() }
    );
  }

  public actualizarPerfil(usuario: Partial<Usuario>): Observable<{ cod: number; msj: string; datos: Usuario }> {
    return this.http.put<{ cod: number; msj: string; datos: Usuario }>(
      `${this.ruta}/perfil`,
      usuario,
      { headers: this.getHeaders() }
    );
  }
}
