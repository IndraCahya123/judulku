/* eslint-disable no-restricted-globals */
import { useQuery, useMutation } from 'react-query'
import { Form } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'

import { UserContext } from '../../context/userContext'

import { BaseUrl } from '../../api/config'

import Submit from '../buttons/Submit'
import Loading from '../Loading'

function UserProfileUpdateForm(props) {
  const [user] = useContext(UserContext)
  const role = user.user.role

  const { isAdmin, userId, isStaff, setIsStaff } = props

  const [form, setForm] = useState({
    email: '',
    name: '',
    role: '',
    nim: '',
    nidn: '',
  })

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

  const { isFetching, refetch } = useQuery(
    'GetUserDataByRole',
    async () => {
      if (role === 'mahasiswa') {
        const res = await BaseUrl.get(`/mahasiswa/${user?.user?.id}`)
        setForm({
          ...form,
          email: res.data.data.mahasiswa.email,
          name: res.data.data.mahasiswa.name,
          nim: res.data.data.mahasiswa.nim,
          role: 'mahasiswa',
        })
      } else if (role === 'admin') {
        if (isStaff) {
          const res = await BaseUrl.get(`/staff/${userId}`)
          setForm({
            ...form,
            email: res.data.data.staff.email,
            name: res.data.data.staff.name,
            nidn: res.data.data.staff.nidn,
            role: res.data.data.staff.role,
          })
        } else {
          const res = await BaseUrl.get(`/mahasiswa/${userId}`)
          setForm({
            ...form,
            email: res.data.data.mahasiswa.email,
            name: res.data.data.mahasiswa.name,
            nim: res.data.data.mahasiswa.nim,
            role: 'mahasiswa',
          })
        }
      } else {
        if (isAdmin) {
          const res = await BaseUrl.get(`/staff/${userId}`)
          setForm({
            ...form,
            email: res.data.data.staff.email,
            name: res.data.data.staff.name,
            role: res.data.data.staff.role,
            nidn: res.data.data.staff.nidn,
          })
        } else {
          const res = await BaseUrl.get(`/staff/${user?.user?.id}`)
          setForm({
            ...form,
            email: res.data.data.staff.email,
            name: res.data.data.staff.name,
            nidn: res.data.data.staff.nidn,
          })
        }
      }
    },
    { refetchOnWindowFocus: false },
  )

  const [changePassword, setChangePassword] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    prevPassword: '',
    newPassword: '',
  })

  const disableButtonMhs = () => {
    if (form.email === '' || form.name === '' || form.nim === '') {
      return true
    } else {
      return false
    }
  }
  const disableButtonStaff = () => {
    if (form.email === '' || form.name === '' || form.nidn === '') {
      return true
    } else {
      return false
    }
  }

  const disableButton2 = () => {
    if (passwordForm.prevPassword === '' || passwordForm.newPassword === '') {
      return true
    } else {
      return false
    }
  }

  const editProfile = useMutation('UpdateUserProfileCache', async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (form.role === 'mahasiswa') {
      const body = {
        email: form.email,
        name: form.name,
        nim: form.nim,
      }
      if (isAdmin) {
        await BaseUrl.patch(`/mahasiswa/${userId}`, body, config)
      } else {
        await BaseUrl.patch(`/mahasiswa/${user?.user?.id}`, body, config)
      }
      updated()
    } else {
      if (isAdmin) {
        const body = {
          email: form.email,
          name: form.name,
          role: form.role,
          nidn: form.nidn,
        }
        await BaseUrl.patch(`/staff/${userId}`, body, config)
      } else {
        const body = {
          email: form.email,
          name: form.name,
          nidn: form.nidn,
        }
        await BaseUrl.patch(`/staff/${user?.user?.id}`, body, config)
      }
      updated()
    }
  })

  const updated = () => {
    const confirmation = confirm('Yakin ingin mengubah data anda ?')

    if (confirmation) {
      if (isAdmin) {
        props.backAction(false)
        props.setEditForm({
          change: false,
          userId: '',
        })
      } else {
        refetch()
      }
    } else {
      alert('Batal mengubah')
    }
  }

  const updatePassword = useMutation('UpdateAdminPasswordCache', async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (isAdmin) {
      await BaseUrl.patch(`/reset-password/${userId}`, passwordForm, config)
    } else {
      await BaseUrl.patch(
        `/reset-password/${user.user.id}`,
        passwordForm,
        config,
      )
    }

    changedPassword()
  })

  const changedPassword = () => {
    const confirmation = confirm('Yakin ingin mengubah password ?')

    if (confirmation) {
      if (isAdmin) {
        setChangePassword(false)
      } else {
        refetch()
        setChangePassword(false)
      }
    } else {
      alert('Batal mengubah')
    }
  }

  return (
    <>
      {isAdmin ? (
        <span
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: 24,
            left: 24,
          }}
          onClick={() => {
            props.backAction(false)
            props.setEditForm({
              change: false,
              userId: '',
            })
            setIsStaff(false)
          }}
        >
          <FontAwesomeIcon icon={faBackward} />
          <span style={{ fontWeight: 'bold' }}> Back</span>
        </span>
      ) : null}
      <div className="w-100 d-flex flex-column">
        <span style={{ fontSize: 32, fontWeight: 'bolder', marginBottom: 50 }}>
          Profile
        </span>
        {isFetching ? (
          <Loading />
        ) : (
          <div className="w-100 d-flex  justify-content-between">
            <Form className="w-50 p-2">
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
                  label="Nama"
                  fullWidth
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Row>
              {isAdmin && form.role !== 'mahasiswa' ? (
                <Form.Row style={{ marginTop: 15 }}>
                  <Select
                    options={options}
                    styles={customSelectStyle}
                    defaultValue={form.role}
                    placeholder={`${form.role}`}
                    onChange={(e) => setForm({ ...form, role: e.value })}
                  />
                </Form.Row>
              ) : null}
              <Form.Row style={{ marginTop: 10 }}>
                {form.role === 'mahasiswa' ? (
                  <TextField
                    label="NIM"
                    fullWidth
                    type="text"
                    value={form.nim}
                    onChange={(e) => setForm({ ...form, nim: e.target.value })}
                  />
                ) : (
                  <TextField
                    label="NIDN"
                    fullWidth
                    type="text"
                    value={form.nidn}
                    onChange={(e) => setForm({ ...form, nidn: e.target.value })}
                  />
                )}
              </Form.Row>
              <Form.Row className="d-flex flex-column w-100 justify-content-center align-items-center">
                {editProfile.isError && (
                  <p className="text-danger my-2">
                    {editProfile.error?.response?.data?.message}
                  </p>
                )}
                <Submit
                  title="Save"
                  style={{ marginTop: 15, width: '50%' }}
                  action={() => editProfile.mutate()}
                  disabled={
                    form.role === 'mahasiswa'
                      ? disableButtonMhs()
                      : disableButtonStaff()
                  }
                  load={editProfile.isLoading}
                />
              </Form.Row>
            </Form>
            {changePassword ? (
              <Form className="w-50 p-2">
                <Form.Row style={{ marginTop: 10 }}>
                  <TextField
                    label="Old Password"
                    fullWidth
                    type="password"
                    value={passwordForm.prevPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        prevPassword: e.target.value,
                      })
                    }
                  />
                </Form.Row>
                <Form.Row style={{ marginTop: 10 }}>
                  <TextField
                    label="New Password"
                    fullWidth
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </Form.Row>
                <Form.Row className="d-flex flex-column w-100 justify-content-center align-items-center">
                  {updatePassword.isError && (
                    <p className="text-danger my-2">
                      {updatePassword.error?.response?.data?.message}
                    </p>
                  )}
                  <Submit
                    title="Change Password"
                    style={{ marginTop: 15, width: '50%' }}
                    action={() => updatePassword.mutate()}
                    disabled={disableButton2()}
                    load={updatePassword.isLoading}
                  />
                </Form.Row>
              </Form>
            ) : isAdmin && form.role === 'mahasiswa' ? null : (
              <span
                style={{
                  color: 'red',
                  fontSize: 20,
                  cursor: 'pointer',
                  width: '50%',
                  height: 30,
                  paddingLeft: 30,
                }}
                onClick={() => setChangePassword(true)}
              >
                Reset password ?
              </span>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default UserProfileUpdateForm
