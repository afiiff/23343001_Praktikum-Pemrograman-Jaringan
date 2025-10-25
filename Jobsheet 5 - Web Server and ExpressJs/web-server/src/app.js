const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const { title } = require('process')

const app = express() 

//Mendefinisikan jalur/path untuk konfigurasi Express
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoriPartials = path.join(__dirname, '../templates/partials')

//setup handlebars engine dan lokasi folder views
app.set('view engine', 'hbs')
app.set('views', direktoriViews)
hbs.registerPartials(direktoriPartials)

//setup direktori statis
app.use(express.static(direktoriPublic))

//ini halaman utama 
app.get('', (req, res) => { 
    res.render('index', { 
        judul: 'Aplikasi Cek Cuaca', 
        nama: 'Afiif Alfarabi' 
    }) 
}) 
//ini halaman bantuan
app.get('/bantuan', (req, res) => { 
    res.render('bantuan', { 
        judul: 'bantuan saya', 
        nama: 'Afiif Alfarabi',
        teksBantuan: 'ini adalah teks bantuan',
    }) 
})
//ini infocuaca
app.get('/infoCuaca', (_, res) => {
    res.send([
        {
            prediksiCuaca: 'Cuaca Sedang Cerah',
            lokasi: 'Padang'
        }
    ]);
});

//ini tentang 
app.get('/tentang', (req, res) => { 
    res.render('tentang', { 
        judul: 'Tentang Saya', 
        nama: 'Afiif Alfarabi',
        title: 'Tentang Aplikasi Cek Cuaca'
    }) 
})
app.get('/bantuan/*', (req, res) => { 
    res.render('404', { 
        judul: '404', 
        nama: 'Afiif Alfarabi',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    }) 
})
app.get('*', (req, res) => { 
    res.render('404', { 
        judul: '404', 
        nama: 'Afiif Alfarabi',
        pesanKesalahan: 'Halaman tidak ditemukan.' 
    }) 
})
app.listen(4000, () => { 
    console.log('Server berjalan pada port 4000.') 
}) 
