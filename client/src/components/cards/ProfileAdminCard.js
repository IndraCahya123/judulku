import { motion } from 'framer-motion'

import AdminProfileForm from '../forms/AdminProfileForm'

function ProfileAdminCard() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper d-flex flex-column p-5"
      style={{ position: 'relative' }}
    >
      <AdminProfileForm />
    </motion.div>
  )
}

export default ProfileAdminCard
