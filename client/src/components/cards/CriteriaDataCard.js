import { motion } from 'framer-motion'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import CriteriaTable from '../tables/CriteriaTable'
import CriteriaForm from '../forms/CriteriaForm'

function CriteriaDataCard() {
  const [formContent, setFormContent] = useState({
    data: null,
    change: false,
  })
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper d-flex flex-column justify-content-center p-5"
      style={{ position: 'relative' }}
    >
      {formContent.change ? (
        <CriteriaForm dataForm={formContent} changeContent={setFormContent} />
      ) : (
        <>
          <div className="criteria-header d-flex justify-content-between align-items-center">
            <span
              style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}
            >
              Data Kriteria
            </span>
            <button
              type="button"
              className="submit-criteria-btn pure-btn d-flex align-items-center"
              onClick={() => setFormContent({ ...formContent, change: true })}
            >
              Tambah Data
              <FontAwesomeIcon icon={faPlusCircle} style={{ marginLeft: 5 }} />
            </button>
          </div>
          <hr className="w-100" style={{ marginTop: '-10px' }} />

          <CriteriaTable editForm={setFormContent} />
        </>
      )}
    </motion.div>
  )
}

export default CriteriaDataCard
