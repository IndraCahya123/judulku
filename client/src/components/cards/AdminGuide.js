function AdminGuide() {
  return (
    <div>
      <h2>Panduan Untuk Admin</h2>
      <span style={{ margin: "30px 0" }}>
        Tugas admin pada sistem yaitu untuk mengelola data pada sistem, yaitu data user dan data kriteria. Admin diberikan akses untuk mengubah data user (pada semua user), menghapus user (pada semua user), menambahkan user(kecuali pada user mahasiswa). <br /><br />
        Berlaku pada data kriteria, admin diberikan akses untuk sepenuhnya mengelola data kriteria mulai dari menambahkan kriteria, mengubah kriteria, dan juga menghapus kriteria sesuai dengan apa yang telah disepakati oleh pihak STMIK Yadika Bangil. <br /><br />
        Admin dianjurkan untuk mengubah password pada halaman profile karena user Admin didaftarkan secara otomatis oleh sistem sehingga diperlukan pengubahan password agar sistem lebih aman.
      </span>
    </div>
  );
}

export default AdminGuide;
