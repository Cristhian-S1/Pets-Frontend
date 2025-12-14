export interface Foro {
    fo_id: number;
    fo_titulo: string;
    fo_descripcion: string;
    fo_eliminacion: boolean;
    us_id: number;
}

export interface Foros {
    foros: Foro[];
}

export interface CrearForo {
    fo_titulo: string;
    fo_descripcion: string;
    us_id: number;
}