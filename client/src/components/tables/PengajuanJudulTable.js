/* eslint-disable jsx-a11y/anchor-has-content */
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPlusCircle,
  faEdit,
  faEye,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from 'react-query'

import { BaseUrl } from '../../api/config'

import Loading from '../Loading'
import AddData from '../buttons/AddData'
import Response from '../Response'

function PengajuanJudulTable(props) {

  const { changeForm, setChangeForm } = props

  const [data, setData] = useState({
    judul: [],
  })

  const { isFetching, refetch } = useQuery(
    'GetAllJudulUserData',
    async () => {
      const res = await BaseUrl.get('/my-judul')
      setData({
        judul: res.data.data.judul,
      })
    },
    { refetchOnWindowFocus: false },
  )

  const deleteJudul = useMutation('DeleteKaprodiCache', async (id) => {
    await BaseUrl.delete(`/judul/${id}`)
    refetch()
  })

  const confirmDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(`Hapus Judul dengan id ${id} ?`)

    if (confirmation) {
      deleteJudul.mutate(id)
    } else {
      alert('Judul tidak dihapus')
    }
  }

  if (isFetching) {
    return <Loading />
  } else {
    if (data.judul.length === 0) {
      return (
        <AddData
          disableButton={false}
          action={() => setChangeForm({ ...changeForm, change: true })}
        />
      )
    } else {
      return (
        <div className="table-kaprodi-data d-flex flex-column my-3">
          <div className="criteria-header d-flex justify-content-between align-items-center">
            <span
              style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}
            >
              Data Judul yang Diajukan
            </span>
            <button
              type="button"
              className="submit-criteria-btn pure-btn d-flex align-items-center"
              onClick={() => setChangeForm({ ...changeForm, change: true })}
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
                <th>Judul</th>
                <th>Dosen Pembimbing</th>
                <th>Respon Dospem</th>
                <th>Respon Kaprodi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.judul.map((item, index) => {
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.judul}</td>
                    <td>{item.dospem.Profile.name}</td>
                    <td><Response response={item.detail.dospemStatus} /></td>
                    <td><Response response={item.detail.kaprodiStatus} /></td>
                    <td className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() => {
                          setChangeForm({
                            ...changeForm,
                            change: true,
                            isEdit: true,
                            dataEdit: item,
                          })
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} title="Edit" />
                      </button>
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() =>
                          setChangeForm({
                            ...changeForm,
                            seeDetail: true,
                            dataDetailJudul: item,
                          })
                        }
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          title="Detail Judul"
                        />
                      </button>
                      <button
                        type="button"
                        className="delete-mhs-btn pure-btn"
                        onClick={() => confirmDelete(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} title="Hapus" />
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

export default PengajuanJudulTable
