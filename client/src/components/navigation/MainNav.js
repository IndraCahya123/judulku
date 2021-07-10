import { Redirect, useLocation, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { useContext } from 'react'

import { AdminNavContext } from '../../context/navContext/adminNavContext'
import { MhsNavContext } from '../../context/navContext/mhsNavContext'
import { DospemNavContext } from '../../context/navContext/dospemNavContext'
import { BaakNavContext } from '../../context/navContext/baakNavContext'

import AdminNav from './AdminNav'
import MhsNav from './MhsNav'
import DospemNav from './DospemNav'
import KaprodiNav from './KaprodiNav'
import BaakNav from './BaakNav'

function MainNav(props) {
  const { user, userDispatch } = props
  const location = useLocation()
  const navigate = useHistory()

  const [_, adminNavContext] = useContext(AdminNavContext)
  const [__, mhsNavContext] = useContext(MhsNavContext)
  const [___, dospemNavContext] = useContext(DospemNavContext)
  const [____, baakNavContext] = useContext(BaakNavContext)

  const logout = () => {
    adminNavContext({ type: 'HOME' })
    mhsNavContext({ type: 'HOME' })
    dospemNavContext({ type: 'HOME' })
    baakNavContext({ type: 'HOME' })
    userDispatch({ type: 'LOGOUT' })
    navigate.push('/')
  }

  if (user.loginStatus && location.pathname !== '/forbidden') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="nav-wrapper d-flex flex-column justify-content-between align-items-center py-5"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 200,
          height: '100vh',
        }}
      >
        {RoleNav(user?.user?.role)}
        <button
          type="button"
          className="logout-btn d-flex align-items-center"
          onClick={() => logout()}
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            color={'#060707'}
            style={{
              marginRight: 5,
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: 3,
              width: 22,
              height: 22,
            }}
          />
          <span style={{ color: '#fff' }}>Logout</span>
        </button>
      </motion.div>
    )
  } else {
    return null
  }
}

const RoleNav = (role) => {
  switch (role) {
    case 'admin':
      return <AdminNav />

    case 'mahasiswa':
      return <MhsNav />

    case 'dospem':
      return <DospemNav />

    case 'kaprodi':
      return <KaprodiNav />

    case 'baak':
      return <BaakNav />

    default:
      return <Redirect to="/" />
  }
}

export default MainNav
