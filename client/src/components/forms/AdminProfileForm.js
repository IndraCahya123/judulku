/* eslint-disable no-restricted-globals */
import { useQuery, useMutation } from 'react-query'
import { Form } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
import { useState, useContext } from 'react'

import { UserContext } from '../../context/userContext'

import { BaseUrl } from '../../api/config'

import Submit from '../buttons/Submit'
import Loading from '../Loading'

function AdminProfileForm() {
  const [user] = useContext(UserContext)

  const [form, setForm] = useState({
    email: '',
  })

  const { isFetching, refetch } = useQuery(
    'GetAdminData',
    async () => {
      const res = await BaseUrl.get(`/staff/${user?.user?.id}`)
      setForm({ email: res.data.data.staff.email })
      return res.data
    },
    { refetchOnWindowFocus: false },
  )

  const [changePassword, setChangePassword] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    prevPassword: '',
    newPassword: '',
  })

  const disableButton = () => {
    if (form.email === '') {
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

  const editProfile = useMutation('UpdateAdminProfileCache', async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await BaseUrl.patch('/admin', form, config)
    updateEmail()
  })

  const updateEmail = () => {
    const confirmation = confirm('Yakin ingin mengubah data anda ?')

    if (confirmation) {
      refetch()
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

    await BaseUrl.patch(`/reset-password/${user.user.id}`, passwordForm, config)
    changedPassword()
  })

  const changedPassword = () => {
    const confirmation = confirm('Yakin ingin mengubah password anda ?')

    if (confirmation) {
      refetch()
    } else {
      alert('Batal mengubah')
    }
  }

  return (
    <div className="w-100 d-flex flex-column">
      <span style={{ fontSize: 32, fontWeight: 'bolder', marginBottom: 50 }}>
        Profile Admin
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
                disabled={disableButton()}
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
          ) : (
            <span
              style={{
                color: 'red',
                fontSize: 20,
                cursor: 'pointer',
                width: '50%',
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
  )
}

export default AdminProfileForm
