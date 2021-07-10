import { Redirect } from 'react-router-dom'
import { useContext } from 'react'

import { UserContext } from '../../context/userContext'

import UserDataCard from '../../components/cards/UserDataCard'

function UserData() {
  const [userContext] = useContext(UserContext)
  console.log(userContext?.user?.role !== 'admin')

  if (userContext?.user?.role !== 'admin') {
    return <Redirect to="/" />
  } else {
    return (
      <div className="main-program-wrapper">
        <UserDataCard />
      </div>
    )
  }
}

export default UserData
