import { Etiqueta } from "./etiqueta.interface";

export interface Publicacion {
  pu_id: number;
  pu_titulo: string;
  pu_descripcion: string;
  pu_image: string;
  pu_fecha: string | Date;
  pu_publicacion: boolean;
  pu_estado: boolean;
  pu_ubicacion: string;
  us_id: number;
  fo_id: number | null;
  us_nombre_completo: string;
  us_contacto: string;
  etiquetas?: Etiqueta[];
  total_likes: number;
  dio_like: boolean;
  procesando?: boolean;
}

export interface PublicacionCrear {
  pu_titulo: string;
  pu_descripcion: string;
  pu_image: string;
  pu_fecha: string;
  pu_estado: boolean;
  pu_ubicacion: string;
  us_nombre: string;
  us_contacto: number;
}

export interface CrearPublicacion {
  pu_titulo: string;
  pu_descripcion: string;
  pu_ubicacion: string;
  pu_imagen: string;
  pu_imagenes?: string[];
  pu_etiquetas?: number[];
}

export interface EtiquetaCrear {
  et_id: number;
  et_nombre: string;
}
