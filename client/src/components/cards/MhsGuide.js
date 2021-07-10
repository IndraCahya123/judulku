import axios from 'axios'
import fileDownload from 'js-file-download'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function MhsGuide() {
  const download = () => {
    axios
      .get('http://localhost:5000/files/PJS-TEMPLATE.doc', {
        responseType: 'blob',
      })
      .then((res) => fileDownload(res.data, 'PJS.doc'))
  }

  return (
    <div>
      <h2>Tata Cara Pengajuan Judul Skripsi</h2>
      <span style={{ margin: '30px 0' }}>
        Berikut cara untuk mengajukan judul skripsi :{' '}
      </span>
      <ol>
        <li>
          Silahkan download template ini{' '}
          <span
            style={{ fontWeight: 'bolder', cursor: 'pointer' }}
            onClick={() => download()}
          >
            Download
          </span>
        </li>
        <li>
          Isi form yang sudah anda download, apabila sudah silahkan upload form
          tersebut dalam bentuk file pdf pada halaman Judul
        </li>
        <li>Selanjutnya anda tinggal menunggu hasil keputusan</li>
        <li>
          Untuk melihat hasil keputusan, silahkan anda tekan tombol{' '}
          <FontAwesomeIcon icon={faInfoCircle} /> pada tabel di halaman
          pengajuan judul
        </li>
        <li>
          Kemungkinan anda akan mendapat instruksi dari luar sistem (misal
          disuruh untuk konsultasi langsung kepada dosen pembimbing ataupun ke
          kepala program studi)
        </li>
      </ol>
    </div>
  )
}

export default MhsGuide
