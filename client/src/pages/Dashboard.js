import { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { UserContext } from '../context/userContext'

import AdminDasboard from '../components/cards/AdminDasboard'
import DasboardMhs from '../components/cards/DasboardMhs'
import DashboardDospem from '../components/cards/DashboardDospem'
import DashboardKaprodi from '../components/cards/DashboardKaprodi'
import DashboardBaak from '../components/cards/DashboardBaak'

function Dashboard() {
  const [user] = useContext(UserContext)
  return (
    <div className="main-program-wrapper">
      {DashboardRole(user?.user?.role)}
    </div>
  )
}

const DashboardRole = (role) => {
  switch (role) {
    case 'admin':
      return <AdminDasboard />

    case 'mahasiswa':
      return <DasboardMhs />

    case 'dospem':
      return <DashboardDospem />

    case 'kaprodi':
      return <DashboardKaprodi />

    case 'baak':
      return <DashboardBaak />

    default:
      return <Redirect to="/" />
  }
}

export default Dashboard
