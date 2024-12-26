const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');

// Optimasi gambar di folder 'src/images' dan simpan hasilnya di folder 'dist/images'
(async () => {
  const files = await imagemin(['src/images/*.{jpg,png,gif}'], {
    destination: 'dist/images',
    plugins: [
      imageminMozjpeg({ quality: 75 }),  // Menetapkan kualitas gambar JPEG ke 75%
      imageminPngquant({ quality: [0.6, 0.8] }),  // Menetapkan kualitas PNG antara 60% hingga 80%
      imageminGifsicle({ optimizationLevel: 3 })  // Mengoptimalkan GIF
    ]
  });

  console.log('Gambar telah dioptimalkan:', files);
})();
