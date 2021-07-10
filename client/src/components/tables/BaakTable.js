import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPlusCircle,
  faEdit,
} from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from 'react-query'

import { BaseUrl } from '../../api/config'

import Loading from '../Loading'
import AddData from '../buttons/AddData'

function BaakTable(props) {
  const { addNewUser } = props
  const [data, setData] = useState({
    baak: [],
  })

  const { isFetching, refetch } = useQuery(
    'GetAllBAAKUserData',
    async () => {
      const res = await BaseUrl.get('/staffs/baak')
      setData({
        baak: res.data.data.staff,
      })
    },
    { refetchOnWindowFocus: false },
  )

  const deleteBaak = useMutation('DeleteBaakCache', async (id) => {
    await BaseUrl.delete(`/user/${id}`)
    refetch()
  })

  const confirmDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(
      `Hapus Biro Administrasi Akademik dan Kemahasiswaan dengan id ${id} ?`,
    )

    if (confirmation) {
      deleteBaak.mutate(id)
    } else {
      alert('Biro Administrasi Akademik dan Kemahasiswaan tidak dihapus')
    }
  }

  if (isFetching) {
    return <Loading />
  } else {
    if (data.baak.length === 0) {
      return <AddData disableButton={false} action={() => addNewUser(true)} />
    } else {
      return (
        <div className="table-baak-data d-flex flex-column my-3">
          <div className="criteria-header d-flex justify-content-between align-items-center">
            <span
              style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}
            >
              Data Biro Administrasi Akademik dan Kemahasiswaan
            </span>
            <button
              type="button"
              className="submit-criteria-btn pure-btn d-flex align-items-center"
              onClick={() => addNewUser(true)}
            >
              Tambah Data
              <FontAwesomeIcon icon={faPlusCircle} style={{ marginLeft: 5 }} />
            </button>
          </div>
          <hr className="w-100" style={{ marginTop: '-10px' }} />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Nama</th>
                <th>NIDN</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.baak.map((item, index) => {
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.nidn}</td>
                    <td className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() => {
                          props.setEditForm({ change: true, userId: item.id })
                          addNewUser(true)
                          props.setIsStaff(true)
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        type="button"
                        className="delete-mhs-btn pure-btn"
                        onClick={() => confirmDelete(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default BaakTable
