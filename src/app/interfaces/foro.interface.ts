export interface Foro {
  fo_id: number;
  fo_titulo: string;
  fo_descripcion: string;
  fo_visible: boolean;
  fo_icono: string | null;
  fo_eliminacion: boolean;
  us_id: number;
  us_nombre: string;
}

export interface Foros {
  foros: Foro[];
}

export interface CrearForo {
  fo_titulo: string;
  fo_descripcion: string;
  fo_visible: boolean;
  fo_icono: string | null;
}
