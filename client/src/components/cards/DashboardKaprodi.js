import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'

import { KaprodiNavContext } from '../../context/navContext/kaprodiNavContext'

import AnalizeIcon from '../../assets/Analize'
import GuideIcon from '../../assets/Guide'

function DashboardKaprodi() {
  const navigate = useHistory()
  const [navActive, setNavActive] = useContext(KaprodiNavContext)

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper d-flex justify-content-evenly align-items-center"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="user-data-section d-flex flex-column align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setNavActive({
            type: 'KAPRODI_RES',
          })
          navigate.push('/judul-laporan-kaprodi')
        }}
      >
        <AnalizeIcon width="350px" height="300px" />
        <span style={{ fontSize: 32, fontWeight: 'bolder', marginTop: 10 }}>
          Judul Terkumpul
        </span>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="user-data-section d-flex flex-column align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setNavActive({
            type: 'GUIDE',
          })
          navigate.push('/guide')
        }}
      >
        <GuideIcon width="350px" height="300px" />
        <span style={{ fontSize: 32, fontWeight: 'bolder', marginTop: 10 }}>
          Panduan
        </span>
      </motion.div>
    </motion.div>
  )
}

export default DashboardKaprodi
