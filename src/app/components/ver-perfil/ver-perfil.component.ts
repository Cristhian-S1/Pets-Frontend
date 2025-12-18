import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.inteface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ver-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  usuario!: Usuario;
  cargando: boolean = true;
  errorMsg: string | null = null;
  editando: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.cargando = true;
    this.usuarioService.obtenerPerfil().subscribe({
      next: (res) => {
        this.usuario = res.datos;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMsg = "No se pudo obtener el perfil";
        this.cargando = false;
        console.error(err);
      }
    });
  }

  guardar() {
    if (!this.usuario) return;

    const { us_nombre, us_apellido, us_contacto } = this.usuario;

    this.usuarioService.actualizarPerfil({ us_nombre, us_apellido, us_contacto })
      .subscribe({
        next: (res) => {
          this.usuario = res.datos;
          this.editando = false;
        },
        error: (err) => {
          console.error("Error al actualizar perfil:", err);
          this.errorMsg = "Error al actualizar perfil";
        }
      });
  }

  cancelar() {
    this.editando = false;
    this.cargarPerfil(); // vuelve a cargar datos originales
  }
    salir() {
    this.router.navigate(['/home']);
  }
}
