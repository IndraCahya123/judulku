function UserDataNav(props) {
  const { activeNav, changeNav } = props

  const activeNavStyle = {
    fontWeight: 'bolder',
    borderBottom: '2px solid #060707',
  }

  const onClick = (state) => {
    changeNav({
      ...state,
    })
  }

  return (
    <div className="user-data-nav w-100 d-flex justify-content-start mb-5">
      <button
        type="button"
        className="pure-btn p-sm"
        style={activeNav.mhs ? { ...activeNavStyle } : {}}
        onClick={() =>
          onClick({ mhs: true, dospem: false, kaprodi: false, baak: false })
        }
      >
        Mahasiswa
      </button>
      <button
        type="button"
        className="pure-btn p-sm"
        style={activeNav.dospem ? { ...activeNavStyle } : {}}
        onClick={() =>
          onClick({ mhs: false, dospem: true, kaprodi: false, baak: false })
        }
      >
        Dosen Pembimbing
      </button>
      <button
        type="button"
        className="pure-btn p-sm"
        style={activeNav.kaprodi ? { ...activeNavStyle } : {}}
        onClick={() =>
          onClick({ mhs: false, dospem: false, kaprodi: true, baak: false })
        }
      >
        Kepala Program Studi
      </button>
      <button
        type="button"
        className="pure-btn p-sm"
        style={activeNav.baak ? { ...activeNavStyle } : {}}
        onClick={() =>
          onClick({ mhs: false, dospem: false, kaprodi: false, baak: true })
        }
      >
        Biro Administrasi Akademik dan Kemahasiswaan
      </button>
    </div>
  )
}

export default UserDataNav
