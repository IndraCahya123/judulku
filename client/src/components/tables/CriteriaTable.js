import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import { BaseUrl } from '../../api/config'

import Loading from '../Loading'
import AddData from '../buttons/AddData'
import { useMutation, useQuery } from 'react-query'

function CriteriaTable(props) {
  const [data, setData] = useState({
    criteria: [],
  })

  const { isFetching, refetch } = useQuery(
    'GetAllCriteriaData',
    async () => {
      const res = await BaseUrl.get('/criteria')
      setData({
        criteria: res.data.data.criteria,
      })
    },
    { refetchOnWindowFocus: false },
  )

  const deleteCriteria = useMutation('DeleteCriteriaCache', async (id) => {
    await BaseUrl.delete(`/criteria/${id}`)
    refetch()
  })

  const confirmDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(`Hapus Kriteria dengan id ${id} ?`)

    if (confirmation) {
      deleteCriteria.mutate(id)
    } else {
      alert('Kriteria tidak dihapus')
    }
  }

  if (isFetching) {
    return <Loading />
  } else {
    if (data.criteria.length === 0) {
      return <AddData disableButton={true} />
    } else {
      return (
        <div className="table-criteria-data d-flex flex-column my-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Kriteria</th>
                <th>Bobot</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.criteria.map((item, index) => {
                const dataSetter = {
                  name: item.name,
                  value: item.value,
                  id: item.id,
                }
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                    <td className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() =>
                          props.editForm({ data: dataSetter, change: true })
                        }
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

export default CriteriaTable
