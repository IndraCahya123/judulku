import { motion } from 'framer-motion'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

import ForbiddenIcon from '../assets/ForbiddenIcon'

function Forbidden() {
  const navigate = useHistory()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 99,
        padding: 20,
      }}
      className="forbidden-page-wrapper d-flex justify-content-center align-items-center"
    >
      <div className="forbidden-content d-flex align-items-center">
        <ForbiddenIcon width="450px" height="400px" />
        <div className="forbidden-text d-flex flex-column justify-content-start mx-3">
          <span style={{ fontSize: 45, fontWeight: 'bolder' }}>
            Forbidden Page
          </span>
          <button
            type="button"
            className="forbidden-btn mt-4"
            onClick={() => navigate.goBack()}
          >
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              style={{ marginRight: 10 }}
            />
            Go Back
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Forbidden
