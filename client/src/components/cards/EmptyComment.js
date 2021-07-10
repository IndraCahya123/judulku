import NoComment from '../../assets/NoComment'

function EmptyComment() {
  return (
    <div className="d-flex flex-column align-items-center">
      <NoComment width="200px" height="150px" />
      <span style={{ fontSize: 22, fontWeight: 'bold' }}>
        Belum ada komentar
      </span>
    </div>
  )
}

export default EmptyComment
