//const fs = require('fs')

//fs.writeFileSync('catatan.txt', 'Nama Saya Afiif Alfarabi')
//fs.appendFileSync('catatan.txt', ' Saya tinggal di Padang')

//const catatan = require('./catatan.js')
//const pesan = catatan()
//console.log(pesan)

const validator = require('validator')
const ambilCatatan = require('./catatan.js')
const pesan = ambilCatatan()
console.log(pesan)
console.log(validator.isURL('https://Alfarabi.com'))


// test chalk
const chalk = require('chalk');
console.log(chalk.blue('print warna biru sukses'));
console.log(chalk.green('Teks hijau'));
console.log(chalk.red.bold('Teks merah tebal'));
console.log(chalk.yellow.underline('Teks kuning bergaris bawah'));
console.log(chalk.bgMagenta.white('Teks putih dengan background magenta'));
