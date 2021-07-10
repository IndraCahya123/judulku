import { Redirect } from 'react-router-dom'
import { useContext } from 'react'

import { UserContext } from '../../context/userContext'

import ProfileAdminCard from '../../components/cards/ProfileAdminCard'

function ProfileAdmin() {
  const [userContext] = useContext(UserContext)
  console.log(userContext?.user?.role !== 'admin')

  if (userContext?.user?.role !== 'admin') {
    return <Redirect to="/" />
  } else {
    return (
      <div className="main-program-wrapper">
        <ProfileAdminCard />
      </div>
    )
  }
}

export default ProfileAdmin
