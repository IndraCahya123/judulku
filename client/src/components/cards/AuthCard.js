import { useState } from 'react'
import { motion } from 'framer-motion'

import LoginForm from '../forms/LoginForm'
import RegisterForm from '../forms/RegisterForm'

import CollegeIcon from '../../assets/CollegeIcon'
import StaffIcon from '../../assets/StaffIcon'

function AuthCard(props) {
  const [form, setForm] = useState('login')
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 1 }}
      className="card-wrapper welcome-section p-3 d-flex"
      style={{ width: '80%' }}
    >
      {form === 'login' ? (
        <LoginForm
          formStyle={{ width: '50%' }}
          role={props.role}
          changeContent={props.changeContent}
          changeForm={setForm}
        />
      ) : (
        <RegisterForm
          formStyle={{ width: '50%' }}
          role={props.role}
          changeContent={props.changeContent}
          changeForm={setForm}
        />
      )}
      {props.role === 'college' ? <College /> : <Staff />}
    </motion.div>
  )
}

const College = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ width: '50%' }}
    >
      <CollegeIcon width="350px" height="300px" />
      <p style={{ fontSize: 24, marginTop: 20, fontWeight: 'bolder' }}>
        Mahasiswa
      </p>
    </div>
  )
}

const Staff = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ width: '50%' }}
    >
      <StaffIcon width="350px" height="300px" />
      <p style={{ fontSize: 24, marginTop: 20, fontWeight: 'bolder' }}>
        Staff / Dosen
      </p>
    </div>
  )
}

export default AuthCard
