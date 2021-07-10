import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Add from '../../assets/Add'

function AddData(props) {
  const { disableButton, action } = props
  return (
    <div className="empty-add-data d-flex justify-content-center align-items-center">
      <Add width="400px" height="350px" />
      <div className="d-flex flex-column mx-3">
        <span style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}>
          Data Kosong
        </span>
        {!disableButton && (
          <button
            type="button"
            className="add-btn pure-btn d-flex align-items-center"
            style={{
              backgroundColor: '#060707',
              borderRadius: 20,
              padding: '7px 20px',
              color: '#fff',
            }}
            onClick={() => action()}
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{
                marginRight: 5,
                backgroundColor: '#fff',
                borderRadius: '50%',
                padding: 3,
                width: 22,
                height: 22,
              }}
            />
            Tambah Data
          </button>
        )}
      </div>
    </div>
  )
}

export default AddData
