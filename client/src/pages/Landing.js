import { useState } from 'react'

import WelcomeLanding from '../components/cards/WelcomeLanding'
import AuthCard from '../components/cards/AuthCard'

function Landing() {
  const [content, setContent] = useState('welcome')
  const [role, setRole] = useState('')
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ width: '100vw', height: '100vh' }}
    >
      {content === 'welcome' ? (
        <WelcomeLanding changeContent={setContent} setRole={setRole} />
      ) : (
        <AuthCard role={role} changeContent={setContent} />
      )}
    </div>
  )
}

export default Landing
