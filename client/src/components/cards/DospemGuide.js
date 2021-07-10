import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faComments } from '@fortawesome/free-solid-svg-icons'

function DospemGuide() {
  return (
    <div>
      <h2>Panduan Untuk Menanggapi Judul</h2>
      <span style={{ margin: '30px 0' }}>
        Berikut cara untuk menanggapi judul skripsi yang diajukan oleh mahasiswa
        :{' '}
      </span>
      <ol>
        <li>
          Untuk melihat file Pengajuan Judul Skripsi, silahkan tekan tombol{' '}
          <FontAwesomeIcon icon={faEye} /> pada tabel di halaman judul
        </li>
        <li>
          Setelah melihat file yang ada, silahkan klik tombol{' '}
          <FontAwesomeIcon icon={faComments} /> pada tabel di halaman judul,
          lalu berikan evaluasi untuk judul tersebut
        </li>
      </ol>
    </div>
  )
}

export default DospemGuide
