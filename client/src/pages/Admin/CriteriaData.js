import { Redirect } from 'react-router-dom'
import { useContext } from 'react'

import { UserContext } from '../../context/userContext'

import CriteriaDataCard from '../../components/cards/CriteriaDataCard'

function CriteriaData() {
  const [userContext] = useContext(UserContext)

  if (userContext?.user?.role !== 'admin') {
    return <Redirect to="/" />
  } else {
    return (
      <div className="main-program-wrapper">
        <CriteriaDataCard />
      </div>
    )
  }
}

export default CriteriaData
