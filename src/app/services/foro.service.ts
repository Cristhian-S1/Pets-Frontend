import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CrearForo, Foro, Foros } from "../interfaces/foro.interface";

@Injectable({
  providedIn: "root",
})
export class foroService {
    private apiUrl: string = "http://localhost:3000/pets/";
    private http = inject(HttpClient);

    obtenerForos(): Observable<Foros>{
        return this.http.get<Foros>(`${this.apiUrl}foros`);
    }

    obtenerForo(idForo: number): Observable<Foro>{
        return this.http.get<Foro>(`${this.apiUrl}foros/${idForo}`);
    }

    crearForo(nuevoForo: CrearForo): Observable<Foro>{
        return this.http.post<Foro>(`${this.apiUrl}foros`, nuevoForo);
    }
}