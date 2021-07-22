import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function BaakGuide() {
  return (
    <div>
      <h2>Panduan BAAK</h2>
      <ol>
        <li>
          Untuk mendownload file pdf yang terkumpul, silahkan tekan tombol{" "}
          <FontAwesomeIcon icon={faDownload} /> pada tabel di halaman judul
        </li>
        <li>
          Jika ingin melihat detail dari judul yang sudah disetujui, silahkan tekan <FontAwesomeIcon icon={faInfoCircle} />
        </li>
      </ol>
    </div>
  );
}

export default BaakGuide;
