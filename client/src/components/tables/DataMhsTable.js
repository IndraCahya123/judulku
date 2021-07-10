import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from 'react-query'

import { BaseUrl } from '../../api/config'

import Loading from '../Loading'
import AddData from '../buttons/AddData'

function DataMhsTable(props) {
  const [data, setData] = useState({
    mhs: [],
  })

  const { isFetching, refetch } = useQuery(
    'GetAllMahasiswaUserData',
    async () => {
      const res = await BaseUrl.get('/mahasiswa-data')
      setData({
        mhs: res.data.data.mahasiswa,
      })
    },
    { refetchOnWindowFocus: false },
  )

  const deleteMahasiswa = useMutation('DeleteMahasiswaCache', async (id) => {
    await BaseUrl.delete(`/user/${id}`)
    refetch()
  })

  const confirmDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(`Hapus Mahasiswa dengan id ${id} ?`)

    if (confirmation) {
      deleteMahasiswa.mutate(id)
    } else {
      alert('Mahasiswa tidak dihapus')
    }
  }

  if (isFetching) {
    return <Loading />
  } else {
    return (
      <div className="table-mhs-data d-flex flex-column my-3">
        <span style={{ fontSize: 27, fontWeight: 'bold' }}>Data Mahasiswa</span>
        {data.mhs.length === 0 ? (
          <AddData disableButton={true} />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Nama</th>
                <th>Nim</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.mhs.map((mahasiswa, index) => {
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>{mahasiswa.email}</td>
                    <td>{mahasiswa.name}</td>
                    <td>{mahasiswa.nim}</td>
                    <td className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() => {
                          props.setEditForm({
                            change: true,
                            userId: mahasiswa.id,
                          })
                          props.addNewUser(true)
                          props.setIsStaff(false)
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        type="button"
                        className="delete-mhs-btn pure-btn"
                        onClick={() => confirmDelete(mahasiswa.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </div>
    )
  }
}

export default DataMhsTable
