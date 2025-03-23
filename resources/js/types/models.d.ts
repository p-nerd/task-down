export type TUser = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};

export type TImage = {
    id: string;
    user_id: string;
    filename: string;
    path: string;
    url: string;
    size: number | null;
    mime_type: string | null;
    created_at: string;
    updated_at: string;
};

export type TNote = {
    id: string;
    user_id: string;

    name: string;
    content: string;
    order: number;

    created_at: string;
    updated_at: string;
};
