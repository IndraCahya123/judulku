import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faInfo,
  faTasks,
  faEdit,
} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { MhsNavContext } from '../../context/navContext/mhsNavContext'

function MhsNav() {
  const navigate = useHistory()
  const [active, setActive] = useContext(MhsNavContext)
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
          active.judul ? 'nav-btn-active' : ''
        }`}
        onClick={() => {
          setActive({
            type: 'JUDUL',
          })
          navigate.push('/judul')
        }}
      >
        <FontAwesomeIcon
          icon={faTasks}
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
        <span style={active.judul ? { color: '#fff' } : { color: '#000' }}>
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
          navigate.push('/profile-mhs')
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

export default MhsNav
