import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'

import { AdminNavContext } from '../../context/navContext/adminNavContext'

import KriteriaIcon from '../../assets/Kriteria'
import UserDataIcon from '../../assets/UserData'

function AdminDasboard() {
  const navigate = useHistory()

  const [navActive, setNavActive] = useContext(AdminNavContext)

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper d-flex justify-content-around align-items-center"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="user-data-section d-flex flex-column align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setNavActive({
            type: 'USER_DATA',
          })
          navigate.push('/user-data')
        }}
      >
        <UserDataIcon width="350px" height="300px" />
        <span style={{ fontSize: 32, fontWeight: 'bolder', marginTop: 10 }}>
          Data User
        </span>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="kriteria-data-section d-flex flex-column align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setNavActive({
            type: 'KRITERIA_DATA',
          })
          navigate.push('/criteria-data')
        }}
      >
        <KriteriaIcon width="350px" height="300px" />
        <span style={{ fontSize: 32, fontWeight: 'bolder', marginTop: 10 }}>
          Data Kriteria
        </span>
      </motion.div>
    </motion.div>
  )
}

export default AdminDasboard
