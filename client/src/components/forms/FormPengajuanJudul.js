import { Form } from 'react-bootstrap'
import Select from 'react-select'
import { useMutation, useQuery } from 'react-query'
import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

import { BaseUrl } from '../../api/config'

import { UserContext } from '../../context/userContext'

import Submit from '../buttons/Submit'
import Loading from '../Loading'

function FormPengajuanJudul(props) {
  const { changeForm, setChangeForm } = props

  const [userLogged] = useContext(UserContext)

  const { isEdit, dataEdit } = changeForm

  const [form, setForm] = useState({
    pdf: null,
    dospemId: 0,
  })

  const [options, setOptions] = useState({
    data: [],
  })

  useEffect(() => {
    if (isEdit) {
      setForm({
        ...form,
        dospemId: dataEdit.dospem.id,
      })
    } else {
      setForm({
        pdf: null,
        dospemId: 0,
      })
    }
  }, [])

  const { isFetching } = useQuery(
    'GetDospemOptions',
    async () => {
      const res = await BaseUrl.get('/dospem-options')

      const valueOptions = res.data.data.dospem.map((item) => ({
        value: item.id,
        label: item.Profile.name,
      }))

      setOptions({ data: valueOptions })
    },
    { refetchOnWindowFocus: false },
  )

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

  const addNewJudul = useMutation('AddJudulCache', async () => {
    const body = new FormData()

    body.append('pdf', form.pdf)
    body.append('userId', userLogged.user.id)
    body.append('dospemId', form.dospemId)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    await BaseUrl.post('/judul', body, config)

    setChangeForm({ ...changeForm, change: false })
  })

  const updateJudul = useMutation('UpdateJudulCache', async () => {
    const body = new FormData()

    body.append('pdf', form.pdf)
    body.append('dospemId', form.dospemId)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    await BaseUrl.patch(`/judul/mhs/${dataEdit.id}`, body, config)

    setChangeForm({ ...changeForm, change: false })
  })

  if (isFetching) {
    return <Loading />
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
          onClick={() => {
            setChangeForm({
              change: false,
              isEdit: false,
              dataEdit: null,
            })
            setForm({
              pdf: null,
              dospemId: 0,
            })
          }}
        >
          <FontAwesomeIcon icon={faBackward} />
          <span style={{ fontWeight: 'bold' }}> Back</span>
        </span>
        <div className="w-50">
          <Form encType="multipart/form-data">
            <Form.Row style={{ marginBottom: 15 }} className="">
              <Form.File
                label={
                  isEdit
                    ? dataEdit.judul + ' (File sebelumnya)'
                    : 'Upload file pdf'
                }
                className="d-flex flex-column"
                onChange={(e) => setForm({ ...form, pdf: e.target.files[0] })}
              />
            </Form.Row>
            <Form.Row style={{ marginBottom: 15 }}>
              <Select
                options={options.data}
                placeholder="Pilih Dosen Pembimbing"
                className="form-selection"
                styles={customSelectStyle}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                placeholder={
                  isEdit
                    ? dataEdit.dospem.Profile.name
                    : 'Pilih Dosen Pembimbing'
                }
                onChange={(e) =>
                  setForm({ ...form, dospemId: parseInt(e.value) })
                }
              />
            </Form.Row>
            <Form.Row
              className="d-flex flex-column align-items-center"
              style={{ marginBottom: 15 }}
            >
              {addNewJudul.isError && (
                <p className="text-danger my-2">
                  {addNewJudul.error?.response?.data?.message}
                </p>
              )}
              {updateJudul.isError && (
                <p className="text-danger my-2">
                  {updateJudul.error?.response?.data?.message}
                </p>
              )}
              <Submit
                title="Kirim"
                action={() =>
                  isEdit ? updateJudul.mutate() : addNewJudul.mutate()
                }
                style={{ width: '30%' }}
              />
            </Form.Row>
          </Form>
        </div>
      </>
    )
  }
}

export default FormPengajuanJudul
