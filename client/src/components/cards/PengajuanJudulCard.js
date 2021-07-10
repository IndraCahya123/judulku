import { motion } from 'framer-motion'
import { useState } from 'react'

import FormPengajuanJudul from '../forms/FormPengajuanJudul'
import PengajuanJudulTable from '../tables/PengajuanJudulTable'
import DetailJudul from './DetailJudul'

function PengajuanJudulCard() {
  const [changeForm, setChangeForm] = useState({
    change: false,
    isEdit: false,
    dataEdit: null,
    seeDetail: false,
    dataDetailJudul: null,
  })

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper"
      style={{ position: 'relative', padding: '70px 30px 20px' }}
    >
      {changeForm.change ? (
        <FormPengajuanJudul
          changeForm={changeForm}
          setChangeForm={setChangeForm}
        />
      ) : changeForm.seeDetail ? (
        <DetailJudul changeForm={changeForm} setChangeForm={setChangeForm} />
      ) : (
        <PengajuanJudulTable
          changeForm={changeForm}
          setChangeForm={setChangeForm}
        />
      )}
    </motion.div>
  )
}

export default PengajuanJudulCard
