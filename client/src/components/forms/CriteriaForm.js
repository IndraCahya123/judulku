import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { TextField } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'

import { BaseUrl } from '../../api/config'

import Submit from '../buttons/Submit'

function CriteriaForm(props) {
  const isEdit = props.dataForm.data !== null

  const [form, setForm] = useState({
    name: '',
    value: '',
  })

  const editState = () => {
    if (isEdit) {
      setForm({
        name: props.dataForm.data.name,
        value: props.dataForm.data.value,
      })
    } else {
      setForm({
        name: '',
        value: '',
      })
    }
  }

  useEffect(() => {
    editState()
  }, [])

  const addCriteria = useMutation('AddCriteriaCache', async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await BaseUrl.post(`/criteria`, form, config)

    handleSubmit()
  })

  const updateCriteria = useMutation('UpdateCriteriaCache', async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await BaseUrl.patch(`/criteria/${props.dataForm.data.id}`, form, config)

    handleSubmit()
  })

  const handleSubmit = () => {
    props.changeContent({
      ...props.dataForm,
      change: false,
    })
  }

  const disableButton = () => {
    if (form.name === '' || form.value === '') {
      return true
    } else {
      return false
    }
  }

  if (isEdit) {
    //return edit form
    return (
      <>
        <span
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: 24,
            left: 24,
          }}
          onClick={() => {
            setForm({ name: '', value: '' })
            props.changeContent({
              ...props.dataForm,
              data: null,
              change: false,
            })
          }}
        >
          <FontAwesomeIcon icon={faBackward} />
          <span style={{ fontWeight: 'bold' }}> Back</span>
        </span>
        <div>
          <Form style={{ width: '50%' }}>
            <Form.Row style={{ marginTop: 10 }}>
              <TextField
                label="Kriteria"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                fullWidth
              />
            </Form.Row>
            <Form.Row style={{ marginTop: 10 }}>
              <TextField
                label="Bobot"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                fullWidth
              />
            </Form.Row>
            <Form.Row className="d-flex flex-column w-100 justify-content-center align-items-center">
              {updateCriteria.isError && (
                <p className="text-danger my-2">
                  {updateCriteria.error?.response?.data?.message}
                </p>
              )}
              <Submit
                title="Simpan"
                style={{ marginTop: 15, width: '50%' }}
                action={() => updateCriteria.mutate()}
                disabled={disableButton()}
                load={updateCriteria.isLoading}
              />
            </Form.Row>
          </Form>
        </div>
      </>
    )
  } else {
    return (
      <>
        <span
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: 24,
            left: 24,
          }}
          onClick={() =>
            props.changeContent({ ...props.dataForm, change: false })
          }
        >
          <FontAwesomeIcon icon={faBackward} />
          <span style={{ fontWeight: 'bold' }}> Back</span>
        </span>
        <div>
          <Form style={{ width: '50%' }}>
            <Form.Row style={{ marginTop: 10 }}>
              <TextField
                label="Kriteria"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                fullWidth
              />
            </Form.Row>
            <Form.Row style={{ marginTop: 10 }}>
              <TextField
                label="Bobot"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                fullWidth
              />
            </Form.Row>
            <Form.Row className="d-flex flex-column w-100 justify-content-center align-items-center">
              {addCriteria.isError && (
                <p className="text-danger my-2">
                  {addCriteria.error?.response?.data?.message}
                </p>
              )}
              <Submit
                title="Tambah"
                style={{ marginTop: 15, width: '50%' }}
                action={() => addCriteria.mutate()}
                disabled={disableButton()}
                load={addCriteria.isLoading}
              />
            </Form.Row>
          </Form>
        </div>
      </>
    )
  }
}

export default CriteriaForm
