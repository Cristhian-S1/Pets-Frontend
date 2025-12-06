import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Publicacion } from '../../interfaces/publicacion.interface';

@Component({
  selector: 'app-my-posts-page',
  imports: [],
  templateUrl: './my-posts-page.component.html',
  styleUrl: './my-posts-page.component.css'
})
export class MyPostsPageComponent implements OnInit {

  private postsService = inject(PostsService);

  posts: Publicacion[] = [];

  ngOnInit(): void {
    this.postsService.getPostsByUser().subscribe((data) => {
      this.posts = data.datos;
      console.log(this.posts);
    });
  }

  formatearFecha(fecha: any): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  cambiarEstado(id: number, estado: boolean) {
    console.log('Cambiar estado de publicación:', id);
    this.postsService.cambiarEstadoPublicacion(id, estado).subscribe((data) => {
      this.posts = this.posts.map((post) => {
        if (post.pu_id === data.pu_id) {
          post.pu_estado = data.pu_estado;
        }
        return post;
      });
    });
  }

  eliminar(id: number): void {
    console.log('Eliminar publicación:', id);
    // Implementar lógica
  }
}
