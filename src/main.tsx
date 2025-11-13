import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './i18n/config'
import App from './App.tsx'
import i18n from './i18n/config';
import { useTranslation } from 'react-i18next';

// Dynamically update document title when language changes
i18n.on('languageChanged', () => {
    const title = i18n.t('app.title');
    if (title) document.title = title;
});

// Set initial title
document.title = i18n.t('app.title');

const RootWithI18nFallback = () => {
    const { t } = useTranslation();
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">{t('messages.loading')}</div>}>
            <App />
        </Suspense>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RootWithI18nFallback />
    </StrictMode>
);