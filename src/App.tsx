import { MultiStepForm } from './components/MultiStepForm'

function App() {
  return (
    <div className="relative min-h-screen h-full w-full flex flex-col items-center overflow-hidden bg-gradient-to-b from-violet-200 to-violet-100 overflow-hidden pt-8 pb-16">

      <h1 className='pb-4 z-10 text-violet-900 font-medium'>Smart Step</h1>

      {/* form */}
      <div className="relative z-10 w-full max-w-4xl px-10 py-6 bg-white rounded-xl h-full shadow-lg">
        <MultiStepForm />
      </div>
    </div>
  )
}

export default App
