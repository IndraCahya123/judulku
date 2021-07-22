import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBookOpen, faEdit, faInfo } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { BaakNavContext } from '../../context/navContext/baakNavContext'

function BaakNav() {
  const navigate = useHistory()
  const [active, setActive] = useContext(BaakNavContext)
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
          active.print ? 'nav-btn-active' : ''
        }`}
        onClick={() => {
          setActive({
            type: 'PRINT',
          })
          navigate.push('/judul-laporan-baak')
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
        <span style={active.print ? { color: '#fff' } : { color: '#000' }}>
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
          navigate.push('/profile-baak')
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

export default BaakNav
