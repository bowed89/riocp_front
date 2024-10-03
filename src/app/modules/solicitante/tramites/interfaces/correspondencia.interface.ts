export interface Correspondencia {
    nombre_completo: string;
    correo_electronico: string;
    nombre_entidad: string;
    cite_documento?: string;
    referencia?: string;
    documento?: File;
    ruta_documento?: string;
    firma_digital: boolean;
    estado?: boolean;
    solicitud_id: number;
}
