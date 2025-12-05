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

    // Memilih database dengan nama yang telah didefinisikan sebelumnya.
    const db = client.db(namaDatabase);

    // Memilih koleksi 'pengguna' di dalam database.
    const clPengguna = db.collection('pengguna');

    // Memilih koleksi 'tugas' di dalam database.
    const clTugas = db.collection('tugas');

    // ==============================
    // MEMASUKKAN BANYAK DATA PENGGUNA (9 DATA: 3 SAMA, 2 SAMA, 4 SAMA)
    // ==============================

    const insertPengguna = await clPengguna.insertMany([
      { nama: 'Afiiff', usia: 20 },
      { nama: 'Afiiff', usia: 20 },
      { nama: 'Apiip', usia: 20 },
      { nama: 'Apiip', usia: 21 },
      { nama: 'Apiip', usia: 21 },
      { nama: 'Alfarabi', usia: 22 },
      { nama: 'Alfarabi', usia: 22 },
      { nama: 'Alfarabi', usia: 22 },
      { nama: 'Afiiff', usia: 22 }
    ]);

    console.log('Memasukkan data Pengguna ke koleksi =>', insertPengguna);

    return 'Data selesai dimasukkan.';
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

// Menjalankan fungsi main
main().then(console.log).catch(console.error);
