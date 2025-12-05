const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'testsaja';

async function main() {
try {
await client.connect();
console.log('Berhasil terhubung ke MongoDB database server');
const db = client.db(namaDatabase);

db.collection('pengguna').deleteMany({
usia: 30
}).then((result) => {
console.log(result);
}).catch((error) => {
console.error(error);
})

// CHALLENGE:
// Menghapus SATU data tugas pada collection 'tugas'
db.collection('tugas').deleteOne({
Deskripsi: 'Membersihkan rumah'      // sesuaikan dengan data tugas yang mau dihapus
}).then((result) => {
console.log('Hasil deleteOne tugas (Deskripsi: "Membersihkan rumah"):');
console.log(result);
}).catch((error) => {
console.error(error);
});

} catch (error) {
console.error(error);
}
}

main();
