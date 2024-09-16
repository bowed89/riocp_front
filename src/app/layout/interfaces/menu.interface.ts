export interface Menu {
    id?: number;
    nombre: string;
    tipo: string;
    url: string;
    icono: string;
    rol: number;
    estado: boolean;
    created_at?: string | null;
    updated_at?: string | null;
}