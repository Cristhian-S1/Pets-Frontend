import { Component, inject, OnInit } from '@angular/core';
import { Foro } from '../../interfaces/foro.interface';
import { foroService } from '../../services/foro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-foros',
  imports: [],
  templateUrl: './ver-foros.component.html',
  styleUrl: './ver-foros.component.css'
})
export class VerForosComponent implements OnInit {
  private foroService = inject(foroService);
  listaForos: Foro[] = [];
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarForos();
  }

  cargarForos(){
    this.foroService.obtenerForos().subscribe({
      next: (respuesta) => {
        this.listaForos = respuesta.foros;
        console.log("Foros cargados:", this.listaForos);
      },
      error: (err) => {
        console.error("Error al cargar foros:", err);
      }
    })
  }

  verForo(idForo: number){
    this.router.navigate(["/foro/:idForo"]);
  }

  crearForo(){
    this.router.navigate(["/crear-foro"]);
  }

}
