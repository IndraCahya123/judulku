import { motion } from 'framer-motion'

import UserProfileUpdateForm from '../forms/UserProfileUpdateForm'

function UserProfileCard() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper d-flex flex-column p-5"
      style={{ position: 'relative' }}
    >
      <UserProfileUpdateForm isAdmin={false} />
    </motion.div>
  )
}

export default UserProfileCard
