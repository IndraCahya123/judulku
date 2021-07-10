import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
import { useMutation } from 'react-query'
import { useState } from 'react'
import Select from 'react-select'

import { BaseUrl } from '../../api/config'

import Submit from '../buttons/Submit'

function AddNewUserForm(props) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
    nidn: '',
  })
  console.log(form)

  const disableButton = () => {
    if (
      form.email === '' ||
      form.password === '' ||
      form.role === '' ||
      form.name === '' ||
      form.nidn === ''
    ) {
      return true
    } else {
      return false
    }
  }

  const register = useMutation('StaffRegisterCache', async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await BaseUrl.post('/staff', form, config)

    handleSubmit()
  })

  const handleSubmit = () => {
    props.backAction(false)
  }

  const options = [
    { value: 'dospem', label: 'Dosen Pembimbing' },
    { value: 'kaprodi', label: 'Kepala Program Studi' },
    { value: 'baak', label: 'Biro Administrasi Akademik dan Kemahasiswaan' },
  ]

  const customSelectStyle = {
    control: (styles) => ({
      ...styles,
      borderRadius: 0,
      borderBottom: '1px solid #000',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      paddingLeft: 0,
    }),
  }

  return (
    <>
      <span
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: 24,
          left: 24,
        }}
        onClick={() => props.backAction(false)}
      >
        <FontAwesomeIcon icon={faBackward} />
        <span style={{ fontWeight: 'bold' }}> Back</span>
      </span>
      <div className="d-flex flex-column">
        <span
          style={{
            fontSize: 32,
            fontWeight: 'bolder',
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          Staff / Dosen Registrasi
        </span>

        <Form className="w-50 px-2">
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
          <Form.Row style={{ marginTop: 15 }}>
            <Select
              options={options}
              styles={customSelectStyle}
              placeholder="Pilih Status Staff"
              onChange={(e) => setForm({ ...form, role: e.value })}
            />
          </Form.Row>
          <Form.Row style={{ marginTop: 10 }}>
            <TextField
              label="NIDN"
              fullWidth
              value={form.nidn}
              onChange={(e) => setForm({ ...form, nidn: e.target.value })}
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
        </Form>
      </div>
    </>
  )
}

export default AddNewUserForm
