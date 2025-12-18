import { Component, inject, OnInit } from "@angular/core";
import { CrearPublicacionService } from "../../services/crear-publicacion.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-foro",
  imports: [CommonModule],
  templateUrl: "./foro.component.html",
  styleUrl: "./foro.component.css",
})
export class ForoComponent implements OnInit {
  private publicacionesServicio = inject(CrearPublicacionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  foroId: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.foroId = params["idForo"];
      console.log("ID del foro:", this.foroId);
    });

    this.cargarForos();
  }

  cargarForos(): void {
    console.log("Cargando publicaciones del foro...");
  }
}
