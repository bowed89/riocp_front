export interface Monedas {
    id?: number;
    tipo: string;
    sigla: string;
    estado: boolean;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
}