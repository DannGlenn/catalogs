export interface Catalog {
    id: number;
    name: string;
    is_primary: boolean;
    vertical_id: number;
    locale_ids: string;
    created_at: string;
    updated_at: string;
    indexed_at: string;
    deleted_at: string | null;
}

export interface Vertical {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Locale {
    id: number;
    locale_id: string;
    created_at: string;
    updated_at: string;
}
  