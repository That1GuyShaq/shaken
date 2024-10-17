import '../css/app.css';
import './bootstrap';

import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ThemeProvider } from "@/Components/theme-provider";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

window.onload = () => {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    let csrfToken: string | null = null;

    if (tokenElement && tokenElement instanceof HTMLMetaElement) {
        csrfToken = tokenElement.getAttribute('content');

        if (csrfToken) {
            // Set the CSRF token in Axios headers
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
        }
    }

    // Axios interceptor to prevent requests if CSRF token is missing
    axios.interceptors.request.use((config) => {
        if (!csrfToken) {
            // Block the request if no CSRF token
            // console.error('Blocking Axios request: CSRF token not found.');
            return Promise.reject(new Error('CSRF token is missing. Request blocked.'));
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
        showSpinner: true,
        includeCSS: true,
    },
});
