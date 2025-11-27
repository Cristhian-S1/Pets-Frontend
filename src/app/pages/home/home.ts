import { Component, inject, OnInit } from '@angular/core';
import { Etiqueta } from '../../interfaces/etiqueta.interface';
import { Publicacion } from '../../interfaces/publicacion.interface';
import { Post } from '../../components/post/post';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { TagsService } from '../../services/tags.service';

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

  private postsService = inject(PostsService);
  private tagsService = inject(TagsService);
  // Datos
  tags: Etiqueta[] = [];
  allPosts: Publicacion[] = [];
  posts: Publicacion[] = [];

  ngOnInit(): void {
    this.loadTags();
    this.loadPosts();
  }

  loadTags(): void {
    this.tagsService.getAllTags().subscribe((tags) => {
      console.log(tags);

      this.tags = tags;
    });
  }

  loadPosts(): void {
    this.postsService.getAllPosts().subscribe((posts) => {
      console.log(posts);

      this.allPosts = posts;
      this.posts = [...this.allPosts];
    });
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
      this.selectedTags = this.selectedTags.filter(et_id => et_id !== tagId);
    } else {
      this.selectedTags.push(tagId);
    }
    this.applyFilters();
  }

  removeTag(tagId: number): void {
    this.selectedTags = this.selectedTags.filter(et_id => et_id !== tagId);
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.search = '';
    this.selectedTags = [];
    this.applyFilters();
  }


  getTagName(et_id: number): string {
    return this.tags.find(t => t.et_id === et_id)?.et_nombre || '';
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
          const postTagIds = post.etiquetas.map(et_id => et_id.et_id);
          tagsMatch = this.selectedTags.every(et_id => postTagIds.includes(et_id));

        } else {
          tagsMatch = false;
        }
      }
      return textMatch && tagsMatch;
    });
  }
}
