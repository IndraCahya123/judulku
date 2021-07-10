import { motion } from 'framer-motion'

import CollegeIcon from '../../assets/CollegeIcon'
import StaffIcon from '../../assets/StaffIcon'

function WelcomeLanding(props) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 1 }}
      className="card-wrapper welcome-section p-3 d-flex flex-column align-items-center"
      style={{ width: '80%' }}
    >
      <p style={{ fontSize: 32, fontWeight: 'bolder' }}>Pilih Status Anda</p>
      <div className="main w-100 d-flex justify-content-around">
        <div
          className="college-section d-flex flex-column align-items-center"
          onClick={() => {
            props.changeContent('auth')
            props.setRole('college')
          }}
        >
          <CollegeIcon width="250px" height="200px" />
          <p style={{ fontSize: 24, marginTop: 20, fontWeight: 'bolder' }}>
            Mahasiswa
          </p>
        </div>
        <div
          className="staff-section d-flex flex-column align-items-center"
          onClick={() => {
            props.changeContent('auth')
            props.setRole('staff')
          }}
        >
          <StaffIcon width="250px" height="200px" />
          <p style={{ fontSize: 24, marginTop: 20, fontWeight: 'bolder' }}>
            Staff / Dosen
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default WelcomeLanding
