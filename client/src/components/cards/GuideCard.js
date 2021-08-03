import { motion } from 'framer-motion'
import { useContext } from 'react'
import { Redirect } from 'react-router'

import MhsGuide from './MhsGuide'
import DospemGuide from './DospemGuide'
import BaakGuide from './BaakGuide'
import KaprodiGuide from './KaprodiGuide'
import AdminGuide from './AdminGuide'

import { UserContext } from '../../context/userContext'

function GuideCard() {
  const [user] = useContext(UserContext)
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper p-5"
    >
      <Content role={user.user.role} />
    </motion.div>
  )
}

const Content = (props) => {
  const { role } = props
  switch (role) {
    case 'admin':
      return <AdminGuide />

    case 'mahasiswa':
      return <MhsGuide />

    case 'dospem':
      return <DospemGuide />

    case 'kaprodi':
      return <KaprodiGuide />

    case 'baak':
      return <BaakGuide />

    default:
      return <Redirect to="/" />
  }
}

export default GuideCard
