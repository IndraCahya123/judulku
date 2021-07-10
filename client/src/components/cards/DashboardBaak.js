import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'

import { BaakNavContext } from '../../context/navContext/baakNavContext'

import DownloadIcon from '../../assets/Download'

function DashboardBaak() {
  const navigate = useHistory()
  const [navActive, setNavActive] = useContext(BaakNavContext)

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper d-flex justify-content-center align-items-center"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="user-data-section d-flex flex-column align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setNavActive({
            type: 'PRINT',
          })
          navigate.push('/laporan-judul-baak')
        }}
      >
        <DownloadIcon width="350px" height="300px" />
        <span style={{ fontSize: 32, fontWeight: 'bolder', marginTop: 10 }}>
          Download Judul
        </span>
      </motion.div>
    </motion.div>
  )
}

export default DashboardBaak
