import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { TextField } from '@material-ui/core'
import { useMutation } from 'react-query'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router'

import { BaseUrl, setAuthToken } from '../../api/config'

import { UserContext } from '../../context/userContext'

import Submit from '../buttons/Submit'

function RegisterForm(props) {
  const { role, changeForm } = props
  const navigate = useHistory()
  const [user, setUser] = useContext(UserContext)

  const [form, setForm] = useState({
    email: '',
    name: '',
    nim: '',
    password: '',
  })

  const disableButton = () => {
    if (
      form.email === '' ||
      form.password === '' ||
      form.name === '' ||
      form.nim === ''
    ) {
      return true
    } else {
      return false
    }
  }

  const register = useMutation('MahasiswaRegisterCache', async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await BaseUrl.post('/mahasiswa-register', form, config)

    handleSubmit(res)
  })

  const handleSubmit = (res) => {
    setUser({
      type: 'REGISTER',
      payload: res.data.data,
    })

    setAuthToken(res.data.data.user.token)

    navigate.push('/')
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="register-form d-flex flex-column align-items-center"
      style={{ ...props.formStyle }}
    >
      <span
        style={{
          cursor: 'pointer',
          position: 'relative',
          top: 0,
          left: '-160px',
        }}
        onClick={() => props.changeContent('welcome')}
      >
        <FontAwesomeIcon icon={faBackward} />
        <span style={{ fontWeight: 'bold' }}> Back</span>
      </span>
      <div
        className="form-title w-100 d-flex justify-content-center"
        style={{ marginBottom: '-15px' }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 'bolder',
            letterSpacing: 3,
          }}
        >
          Register
        </span>
      </div>
      <Form className="w-100 px-2">
        <Form.Row style={{ marginTop: 10 }}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Form.Row>
        <Form.Row style={{ marginTop: 10 }}>
          <TextField
            label="Nama Lengkap"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Form.Row>
        <Form.Row style={{ marginTop: 10 }}>
          <TextField
            label="NIM"
            fullWidth
            value={form.nim}
            onChange={(e) => setForm({ ...form, nim: e.target.value })}
          />
        </Form.Row>
        <Form.Row style={{ marginTop: 10 }}>
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Row>
        <Form.Row className="d-flex flex-column w-100 justify-content-center align-items-center">
          {register.isError && (
            <p className="text-danger my-2">
              {register?.error?.response?.data?.message}
            </p>
          )}
          <Submit
            title="Register"
            style={{ marginTop: 15, width: '50%' }}
            disabled={disableButton()}
            load={register.isLoading}
            action={() => register.mutate()}
          />
        </Form.Row>
        <Form.Row className="d-flex flex-column align-items-center my-4">
          {role === 'college' && (
            <>
              <span>
                Already have Account ?{' '}
                <span
                  style={{
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                  onClick={() => changeForm('login')}
                >
                  Login
                </span>
              </span>
            </>
          )}
        </Form.Row>
      </Form>
    </motion.div>
  )
}

export default RegisterForm
