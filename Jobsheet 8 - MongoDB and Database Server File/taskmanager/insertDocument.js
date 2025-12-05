// Mengimport modul MongoClient dan ObjectId dari 'mongodb'.
const { MongoClient, ObjectId } = require('mongodb');

// Mendefinisikan URL MongoDB server yang akan digunakan untuk koneksi.
const url = 'mongodb://127.0.0.1:27017';

// Membuat instance MongoClient dengan URL koneksi yang telah didefinisikan sebelumnya.
const client = new MongoClient(url);

// Mendefinisikan nama database yang akan digunakan.
const namaDatabase = 'testsaja';

// Membuat instance ObjectId baru. ObjectId digunakan untuk menghasilkan unik identifier untuk dokumen MongoDB.
const id = new ObjectId();

// BAGIAN INI MENCETAK INFORMASI DARI ObjectID()
// Mencetak ObjectId yang baru dibuat ke konsol.
console.log(id);

// Mencetak representasi hexadecimal dari ObjectId ke konsol.
console.log(id.id);

// Mencetak panjang (jumlah karakter) dari representasi hexadecimal ObjectId ke konsol.
console.log(id.id.length);

// Mencetak timestamp yang terkait dengan ObjectId ke konsol.
console.log(id.getTimestamp());

// Mencetak panjang dari representasi ObjectId dalam bentuk string heksadesimal.
console.log(id.toHexString().length);

// BAGIAN INI ADALAH FUNGSI UTAMA YANG BERJALAN SECARA ASYNCHRONOUS
async function main() {
  try {
    // BAGIAN INI TERKAIT KONEKSI KE DATABASE DAN MEMASUKAN DATA
    await client.connect();
    console.log('Berhasil terhubung ke MongoDB database server');

    // Memilih database dengan nama 'task-manager' yang telah didefinisikan sebelumnya.
    const db = client.db(namaDatabase);

    // Memilih koleksi 'pengguna' di dalam database.
    const clPengguna = db.collection('pengguna');

    // Memilih koleksi 'tugas' di dalam database.
    const clTugas = db.collection('tugas');

    // MEMASUKAN SATU DATA (DOKUMEN)
    const insertPengguna = await clPengguna.insertOne({
      _id: id,
      nama: 'Afiif',
      usia: 20
    });

    console.log('Memasukkan data Pengguna ke koleksi =>', insertPengguna);

    // MEMASUKAN BANYAK DATA (DOKUMEN)
    const insertTugas = await clTugas.insertMany([
      {
        Deskripsi: 'Membersihkan rumah',
        StatusPenyelesaian: true
      },
      {
        Deskripsi: 'Mengerjakan tugas kuliah',
        StatusPenyelesaian: false
      },
      {
        Deskripsi: 'Memberikan bimbingan',
        StatusPenyelesaian: false
      }
    ]);

    console.log('Memasukkan data Tugas ke koleksi =>', insertTugas);

    return 'Data selesai dimasukkan.';
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

// Menjalankan fungsi main
main().then(console.log).catch(console.error);