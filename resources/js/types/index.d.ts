export interface User {
    id: number;
    email: string;
    initials: string;
    first_name: string;
    last_name:  string;
    email_verified: boolean;
    profile_photo_url?: string;
}
interface App {
    name: string;
    owner: {
        name: string;
        url: string;
    };
    slogan: string;
}
export type PageProps< T extends Record<string, unknown> = Record<string, unknown>, App extends Record<string, unknown> = Record<string, unknown>> = T & {
    app: App;
    auth: {
        user: User; // Make sure to allow null, since unauthenticated users might access some pages
    };
};
