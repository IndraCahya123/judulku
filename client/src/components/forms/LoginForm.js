import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { TextField } from '@material-ui/core'
import { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'

import { BaseUrl, setAuthToken } from '../../api/config'

import { UserContext } from '../../context/userContext'

import Submit from '../buttons/Submit'

function LoginForm(props) {
  const { role, changeForm } = props
  const navigate = useHistory()

  const [user, setUser] = useContext(UserContext)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const disableButton = () => {
    if (form.email === '' || form.password === '') {
      return true
    } else {
      return false
    }
  }

  const login = useMutation('UserLoginCache', async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (role === 'college') {
      const res = await BaseUrl.post('/login/mhs', form, config)
      handleSubmit(res)
    } else {
      const res = await BaseUrl.post('/login/staff', form, config)
      handleSubmit(res)
    }
  })

  const handleSubmit = (res) => {
    setUser({
      type: 'LOGIN',
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
      className="login-form d-flex flex-column align-items-center p-3"
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
        className="form-title w-100 d-flex justify-content-center p-3"
        style={{ marginBottom: '-15px' }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 'bolder',
            letterSpacing: 3,
          }}
        >
          Login
        </span>
      </div>
      <Form className="w-100">
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
            label="Password"
            fullWidth
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Row>
        <Form.Row className="d-flex flex-column w-100 justify-content-center align-items-center">
          {login.isError && (
            <p className="text-danger my-2">
              {login.error?.response?.data?.message}
            </p>
          )}
          <Submit
            title="Login"
            style={{ marginTop: 15, width: '50%' }}
            action={() => login.mutate()}
            disabled={disableButton()}
            load={login.isLoading}
          />
        </Form.Row>
        <Form.Row className="d-flex flex-column align-items-center my-4">
          {role === 'college' && (
            <>
              <span>
                Don't have an Account ?{' '}
                <span
                  style={{
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                  onClick={() => changeForm('register')}
                >
                  Register Here
                </span>
              </span>
            </>
          )}
        </Form.Row>
      </Form>
    </motion.div>
  )
}

export default LoginForm
