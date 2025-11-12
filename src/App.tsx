
import { LanguageSwitcher } from './components/common/LanguageSwitcher'
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { MultiStepForm } from './features/applicationForm/components/MultiStepForm';

function App() {
  const { t } = useTranslation();
  return (
    <ErrorBoundary>
      <div className="min-h-screen h-full flex flex-col items-center bg-gradient-to-b from-violet-200 to-violet-100 pt-8 pb-0 sm:pb-16">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-white text-violet-900 p-2 rounded">
          Skip to main content
        </a>
        <LanguageSwitcher />
        <h1 className="pb-4 z-10 text-violet-900 font-medium">
          {t('app.title')}
        </h1>

        {/* form */}
        <main
          id="main-content"
          className="z-10 w-full h-full max-w-4xl px-10 py-6 bg-white rounded-xl shadow-lg"
        >
          <MultiStepForm />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
