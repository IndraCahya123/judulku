import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faBookOpen,
  faEdit,
  faInfo,
} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { DospemNavContext } from '../../context/navContext/dospemNavContext'

function DospemNav() {
  const navigate = useHistory()
  const [active, setActive] = useContext(DospemNavContext)
  return (
    <div className="link-wrapper d-flex flex-column">
      <button
        type="button"
        className={`nav-btn d-flex align-items-center mb-3 ${
          active.home ? 'nav-btn-active' : ''
        }`}
        onClick={() => {
          setActive({
            type: 'HOME',
          })
          navigate.push('/')
        }}
      >
        <FontAwesomeIcon
          icon={faHome}
          color={'#060707'}
          style={{
            marginRight: 5,
            backgroundColor: '#fff',
            borderRadius: '50%',
            padding: 3,
            width: 22,
            height: 22,
          }}
          rotate={90}
        />
        <span style={active.home ? { color: '#fff' } : { color: '#000' }}>
          Home
        </span>
      </button>
      <button
        type="button"
        className={`nav-btn d-flex align-items-center mb-3 ${
          active.guide ? 'nav-btn-active' : ''
        }`}
        onClick={() => {
          setActive({
            type: 'GUIDE',
          })
          navigate.push('/guide')
        }}
      >
        <FontAwesomeIcon
          icon={faInfo}
          color={'#060707'}
          style={{
            marginRight: 5,
            backgroundColor: '#fff',
            borderRadius: '50%',
            padding: 3,
            width: 22,
            height: 22,
          }}
          rotate={90}
        />
        <span style={active.guide ? { color: '#fff' } : { color: '#000' }}>
          Panduan
        </span>
      </button>
      <button
        type="button"
        className={`nav-btn d-flex align-items-center mb-3 ${
          active.dospemResponse ? 'nav-btn-active' : ''
        }`}
        onClick={() => {
          setActive({
            type: 'DOSPEM_RES',
          })
          navigate.push('/judul-laporan-dospem')
        }}
      >
        <FontAwesomeIcon
          icon={faBookOpen}
          color={'#060707'}
          style={{
            marginRight: 5,
            backgroundColor: '#fff',
            borderRadius: '50%',
            padding: 3,
            width: 22,
            height: 22,
          }}
          rotate={90}
        />
        <span
          style={active.dospemResponse ? { color: '#fff' } : { color: '#000' }}
        >
          Judul
        </span>
      </button>
      <button
        type="button"
        className={`nav-btn d-flex align-items-center mb-3 ${
          active.profile ? 'nav-btn-active' : ''
        }`}
        onClick={() => {
          setActive({
            type: 'PROFILE',
          })
          navigate.push('/profile-dospem')
        }}
      >
        <FontAwesomeIcon
          icon={faEdit}
          color={'#060707'}
          style={{
            marginRight: 5,
            backgroundColor: '#fff',
            borderRadius: '50%',
            padding: 3,
            width: 22,
            height: 22,
          }}
          rotate={90}
        />
        <span style={active.profile ? { color: '#fff' } : { color: '#000' }}>
          Profile
        </span>
      </button>
    </div>
  )
}

export default DospemNav
