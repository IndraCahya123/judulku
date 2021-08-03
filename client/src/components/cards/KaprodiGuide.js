import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faComments, faInfoCircle, faEdit } from "@fortawesome/free-solid-svg-icons";

function KaprodiGuide() {
  return (
    <div>
      <h2>Panduan Untuk Menanggapi Judul</h2>
      <span style={{ margin: "30px 0" }}>
        Berikut cara untuk menanggapi judul skripsi yang diajukan oleh mahasiswa dan telah mendapatkan ACC dari dosen pembimbing (Dospem) masing-masing
        :{" "}
      </span>
      <ol type="1">
        <li>Silahkan masuk ke halaman judul (terdapat pada navigasi di sebelah kiri atau klik judul terkumpul pada halaman beranda)</li>
        <li>Di halaman judul tersebut akan terdapat 3 tabel, yaitu tabel judul mahasiswa yang belum dinilai berdasarkan kriteria, judul yang sudah dinilai berdasarkan kriteria, dan judul yang sudah dianalisa oleh sistem berdasarkan kriteria dengan metode TOPSIS</li>
        <li>Pada masing-masing tabel terdapat tombol <FontAwesomeIcon icon={faInfoCircle} /> untuk melihat detail judul skripsi</li>
        <ol type="A">
            <li>Tabel Judul Mahasiswa yang Belum Dinilai</li>
            <ol type="i">
                <li>Tabel ini akan otomatis diakses pertama kali setelah ada judul skripsi masuk yang sudah disetujui oleh dosen pembimbing, untuk melihat file pdf ini harus dilakukan download pada file dengan menekan tombol <FontAwesomeIcon icon={faDownload} /> pada tabel</li>
                <li>Apabila sudah membaca file judul yang telah didownload tadi dan ingin memberikan nilai pada judul, maka silahkan tekan tombol <FontAwesomeIcon icon={faComments} /></li>
            </ol>
            <li>Tabel Judul Mahasiswa yang Sudah Dinilai</li>
            <ol type="i">
                <li>Apabila user ingin mengubah nilai dari judul yang sudah dinilai sebelumnya, user dapat menekan tombol <FontAwesomeIcon icon={faEdit} /></li>
                <li>Pada pojok kanan bawah, terdapat tombol analisa apabila user ingin melakukan perhitungan nilai akhir untuk masing-masing judul yang terkumpul dengan metode TOPSIS, judul yang sudah dinilai minimal harus 2 judul agar tombol ini bisa digunakan</li>
                <li>Setelah menekan tombol analisa, sistem akan memberikan nilai akhir pada judul dengan menggunakan metode TOPSIS dan akan ditampilkan hasil perhitungannya. Silahkan tekan tombol lanjutkan untuk menuju tabel berikutnya</li>
            </ol>
            <li>Tabel Judul Mahasiswa yang Sudah Dianalisa</li>
            <ol type="i">
                <li>Disini berisi data judul-judul yang sudah dianalisa oleh sistem dan diberikan nilai akhir dan juga rekomendasi keputusan sistem untuk judul yang terkumpul apakah sudah memenuhi syarat atau tidak, namun hasil dari sistem hanya membantu user untuk menentukan keputusan akhir apakah judul tersebut disetujui atau tidak.</li>
                <li>User bisa memberikan tanggapan dengan menekan tombol <FontAwesomeIcon icon={faComments} /></li>
                <li>Apabila ingin mengedit hasil keputusan dengan menekan tombol <FontAwesomeIcon icon={faEdit} />, namun apabila hasil keputusan user adalah menyetujui judul, maka tombol ini sudah tidak bisa digunakan</li>
            </ol>
        </ol>
      </ol>
    </div>
  );
}

export default KaprodiGuide;
