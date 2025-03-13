import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm';
import formikForm from './components/formikForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <formikForm />
       <RegistrationForm />
    </>
  )
}

export default App
