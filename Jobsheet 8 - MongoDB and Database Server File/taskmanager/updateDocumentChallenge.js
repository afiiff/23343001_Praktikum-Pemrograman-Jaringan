const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const namaDatabase = 'testsaja'; // SAMA dengan insert

async function main() {
  try {
    await client.connect();
    console.log('Berhasil terhubung ke MongoDB database server');

    const db = client.db(namaDatabase);
    const clPengguna = db.collection('pengguna');

    // 1. Ambil semua data pengguna
    const semuaPengguna = await clPengguna.find({}).toArray();
    console.log('Jumlah data awal:', semuaPengguna.length);

    // Counter per nama, supaya KelompokA_1, KelompokA_2, dst
    const counterPerNama = {};
    let i = 1; // dipakai untuk usia supaya unik semua

    for (const user of semuaPengguna) {
      // Inisialisasi counter kalau nama ini belum pernah muncul
      if (!counterPerNama[user.nama]) {
        counterPerNama[user.nama] = 1;
      }

      const suffix = counterPerNama[user.nama]; // 1,2,3,... per nama
      counterPerNama[user.nama]++;              // naikin buat next

      // Nama baru: nama asli + _ + angka
      const namaBaru = `${user.nama}_${suffix}`;   // contoh: KelompokA_1

      // Usia baru: dibuat unik dengan i
      const usiaBaru = 20 + i;                     // 21,22,23,...

      const hasil = await clPengguna.updateOne(
        { _id: user._id },
        {
          $set: {
            nama: namaBaru,
            usia: usiaBaru
          }
        }
      );

      console.log(
        `Update _id ${user._id}: nama=${namaBaru}, usia=${usiaBaru}, matched=${hasil.matchedCount}, modified=${hasil.modifiedCount}`
      );

      i++;
    }

    console.log('CHALLENGE selesai: semua nama & usia sekarang unik.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
