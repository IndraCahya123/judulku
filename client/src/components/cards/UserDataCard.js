import { motion } from 'framer-motion'
import { useState } from 'react'

import UserDataNav from '../navigation/UserDataNav'
import DataMhsTable from '../tables/DataMhsTable'
import DataDospemTable from '../tables/DataDospemTable'
import KaprodiTable from '../tables/KaprodiTable'
import BaakTable from '../tables/BaakTable'
import AddNewUserForm from '../forms/AddNewUserForm'
import UserProfileUpdateForm from '../forms/UserProfileUpdateForm'

function UserDataCard() {
  const [content, setContent] = useState({
    mhs: true,
    dospem: false,
    kaprodi: false,
    baak: false,
  })

  const [form, setForm] = useState(false)
  const [isStaff, setIsStaff] = useState(false)
  const [editForm, setEditForm] = useState({
    change: false,
    userId: '',
  })

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper d-flex flex-column p-5"
      style={{ position: 'relative' }}
    >
      {form ? (
        editForm.change ? (
          <UserProfileUpdateForm
            isAdmin={true}
            userId={editForm.userId}
            setEditForm={setEditForm}
            backAction={setForm}
            isStaff={isStaff}
            setIsStaff={setIsStaff}
          />
        ) : (
          <AddNewUserForm backAction={setForm} />
        )
      ) : (
        <>
          <UserDataNav activeNav={content} changeNav={setContent} />
          <SelectedContent
            content={content}
            changeToForm={setForm}
            setEditForm={setEditForm}
            isStaff={isStaff}
            setIsStaff={setIsStaff}
          />
        </>
      )}
    </motion.div>
  )
}

const SelectedContent = (props) => {
  const { content, changeToForm, setEditForm, isStaff, setIsStaff } = props
  if (content.mhs) {
    return (
      <DataMhsTable
        addNewUser={changeToForm}
        setEditForm={setEditForm}
        isStaff={isStaff}
        setIsStaff={setIsStaff}
      />
    )
  } else if (content.dospem) {
    return (
      <DataDospemTable
        addNewUser={changeToForm}
        setEditForm={setEditForm}
        isStaff={isStaff}
        setIsStaff={setIsStaff}
      />
    )
  } else if (content.kaprodi) {
    return (
      <KaprodiTable
        addNewUser={changeToForm}
        setEditForm={setEditForm}
        isStaff={isStaff}
        setIsStaff={setIsStaff}
      />
    )
  } else if (content.baak) {
    return (
      <BaakTable
        addNewUser={changeToForm}
        setEditForm={setEditForm}
        isStaff={isStaff}
        setIsStaff={setIsStaff}
      />
    )
  } else {
    return (
      <DataMhsTable
        addNewUser={changeToForm}
        setEditForm={setEditForm}
        isStaff={isStaff}
        setIsStaff={setIsStaff}
      />
    )
  }
}

export default UserDataCard
