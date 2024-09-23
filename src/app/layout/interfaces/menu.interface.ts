export interface Menu {
    id?: number;
    nombre: string;
    url: string;
    icono: string;
    rol?: string;
    tipo?: string;
    estado: boolean;
    rol_id: number;
    tipo_id: number;
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
}