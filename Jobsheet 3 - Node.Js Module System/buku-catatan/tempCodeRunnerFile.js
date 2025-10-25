const validator = require('validator')
const ambilCatatan = require('./catatan.js')
const pesan = ambilCatatan()
console.log(pesan)
console.log(validator.isURL('https://Alfarabi.com'))

const chalk = require('chalk');

console.log(chalk.blue('print warna biru sukses'));