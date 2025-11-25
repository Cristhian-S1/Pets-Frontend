import { Component, OnInit } from '@angular/core';
import { Etiqueta } from '../../interfaces/etiqueta.interface';
import { Publicacion } from '../../interfaces/publicacion.interface';
import { Post } from '../../components/post/post';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [Post, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  search: string = '';
  selectedTags: number[] = [];
  showFilterMenu: boolean = false;

  // Datos
  tags: Etiqueta[] = [];
  allPosts: Publicacion[] = [];
  posts: Publicacion[] = [];

  ngOnInit(): void {
    this.loadTags();
    this.loadPosts();
  }

  loadTags(): void {
    this.tags = [
      { et_id: 1, et_nombre: 'Perro' },
      { et_id: 2, et_nombre: 'Gato' },
      { et_id: 3, et_nombre: 'Urgente' },
      { et_id: 4, et_nombre: 'Herido' },
      { et_id: 5, et_nombre: 'Cachorro' }
    ];
  }

  loadPosts(): void {
    this.allPosts = [
      {
        pu_id: 1,
        pu_titulo: 'Perrito Golden perdido',
        pu_descripcion: 'Se perdió en el centro...',
        pu_image: 'https://cdn.royalcanin-weshare-online.io/UCImMmgBaxEApS7LuQnZ/v2/eukanuba-market-image-puppy-beagle?w=5596&h=2317&rect=574,77,1850,1045&auto=compress,enhance',
        pu_fecha: new Date(),
        pu_ubicacion: 'Centro',
        pu_estado: false,
        us_id: 1,
        us_contacto: '12345678',
        us_nombre_completo: 'Juan Perez',
        etiquetas: [
          { et_id: 1, et_nombre: 'Perro' },
          { et_id: 5, et_nombre: 'Cachorro' }
        ]
      },
      {
        pu_id: 2,
        pu_titulo: 'Gato Siamés encontrado',
        pu_descripcion: 'Encontré este gato...',
        pu_image: 'https://cdn.royalcanin-weshare-online.io/UCImMmgBaxEApS7LuQnZ/v2/eukanuba-market-image-puppy-beagle?w=5596&h=2317&rect=574,77,1850,1045&auto=compress,enhance',
        pu_fecha: new Date(),
        pu_ubicacion: 'Norte',
        pu_estado: true,
        us_id: 2,
        us_contacto: '87654321',
        us_nombre_completo: 'Maria Gomez',
        etiquetas: [
          { et_id: 2, et_nombre: 'Gato' },
          { et_id: 3, et_nombre: 'Urgente' }
        ]
      },
      {
        pu_id: 3,
        pu_titulo: 'Pastor Alemán herido',
        pu_descripcion: 'Necesita ayuda veterinaria...',
        pu_image: 'https://cdn.royalcanin-weshare-online.io/UCImMmgBaxEApS7LuQnZ/v2/eukanuba-market-image-puppy-beagle?w=5596&h=2317&rect=574,77,1850,1045&auto=compress,enhance',
        pu_fecha: new Date(),
        pu_ubicacion: 'Sur',
        pu_estado: false,
        us_id: 3,
        us_contacto: '11223344',
        us_nombre_completo: 'Carlos Ruiz',
        etiquetas: [
          { et_id: 1, et_nombre: 'Perro' },
          { et_id: 4, et_nombre: 'Herido' },
          { et_id: 3, et_nombre: 'Urgente' }
        ]
      }
    ];

    this.posts = [...this.allPosts];
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  changeSearchInput(value: string): void {
    this.search = value;
    this.applyFilters();
  }

  toggleTag(tagId: number): void {
    if (this.selectedTags.includes(tagId)) {
      this.selectedTags = this.selectedTags.filter(id => id !== tagId);
    } else {
      this.selectedTags.push(tagId);
    }
    this.applyFilters();
  }

  removeTag(tagId: number): void {
    this.selectedTags = this.selectedTags.filter(id => id !== tagId);
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.search = '';
    this.selectedTags = [];
    this.applyFilters();
  }

  getTagName(tagId: number): string {
    return this.tags.find(t => t.et_id === tagId)?.et_nombre || '';
  }

  applyFilters(): void {
    const term = this.search.toLowerCase().trim();

    this.posts = this.allPosts.filter(post => {
      const titleMatch = post.pu_titulo?.toLowerCase().includes(term);
      const descriptionMatch = post.pu_descripcion?.toLowerCase().includes(term);
      const textMatch = titleMatch || descriptionMatch;

      let tagsMatch = true;

      if (this.selectedTags.length > 0) {
        if (post.etiquetas && post.etiquetas.length > 0) {
          const postTagIds = post.etiquetas.map(t => t.et_id);
          tagsMatch = this.selectedTags.every(tagId => postTagIds.includes(tagId));

        } else {
          tagsMatch = false;
        }
      }
      return textMatch && tagsMatch;
    });
  }
}
