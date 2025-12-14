import { Component, inject, OnInit } from '@angular/core';
import { CrearPublicacionService } from '../../services/crear-publicacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foro',
  imports: [CommonModule],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css'
})
export class ForoComponent implements OnInit {

  private publicacionesServicio = inject(CrearPublicacionService);

  ngOnInit(): void {
    this.cargarForos();
  }

  cargarForos(){
    
  }

}
