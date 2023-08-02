// Fiyat hesaplamak için gerekli bilgileri alıp sonucu gösteren fonksiyon
function hesaplaFiyat() {
  const ulke = document.getElementById('ulke').value;
  const kisiSayisi = document.getElementById('kisi-sayisi').value;
  let fiyat = 0;

  // Fiyat hesaplama işlemleri
  switch (ulke) {
      case 'finlandiya':
          fiyat = 1899;
          break;
      case 'estonya':
          fiyat = 1824;
          break;
      case 'alaska':
          fiyat = 2885;
          break;
      case 'norvec':
          fiyat = 1778;
          break;
      case 'kanada':
          fiyat = 3274;
          break;
      default:
          break;
  }

  const toplamTutar = fiyat * kisiSayisi;
  document.getElementById('sonuc').innerText = `Toplam Tutar: ${toplamTutar} Euro`;
}

// Hesapla butonuna tıklama olayı
const hesaplaBtn = document.getElementById('hesapla-btn');
hesaplaBtn.addEventListener('click', hesaplaFiyat);
