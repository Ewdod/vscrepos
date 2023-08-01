const tahta = document.getElementById('tahta');
const hucreler = document.querySelectorAll('.hucre');
const kazananKombinasyonlar = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Satırlar
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Sütunlar
  [0, 4, 8], [2, 4, 6]             // Çaprazlar
];

let siradakiOyuncu = 'X';
let oyunBitti = false;

function kazananKontrol(oyuncu) {
  return kazananKombinasyonlar.some(kombinasyon =>
    kombinasyon.every(index => hucreler[index].textContent === oyuncu)
  );
}

function beraberlikKontrol() {
  return [...hucreler].every(hucre => hucre.textContent !== '');
}

function hamleYap(index) {
  if (!oyunBitti && hucreler[index].textContent === '') {
    hucreler[index].textContent = siradakiOyuncu;

    if (kazananKontrol(siradakiOyuncu)) {
      alert(`${siradakiOyuncu} kazandı!`);
      oyunBitti = true;
    } else if (beraberlikKontrol()) {
      alert("Berabere!");
      oyunBitti = true;
    }

    siradakiOyuncu = siradakiOyuncu === 'X' ? 'O' : 'X';

    if (!oyunBitti && siradakiOyuncu === 'O') {
      setTimeout(bilgisayarHamlesi, 500);
    }
  }
}

function bilgisayarHamlesi() {
  const uygunHucreler = [...hucreler].filter(hucre => hucre.textContent === '');
  const rastgeleIndex = Math.floor(Math.random() * uygunHucreler.length);
  hamleYap([...hucreler].indexOf(uygunHucreler[rastgeleIndex]));

  if (!oyunBitti && siradakiOyuncu === 'O') {
    const enIyiHamle = alphaBetaMinimax(2, -Infinity, Infinity, 'O').index;
    hamleYap(enIyiHamle);
  }
}

function alphaBetaMinimax(depth, alpha, beta, oyuncu) {
  const uygunHucreler = [...hucreler].filter(hucre => hucre.textContent === '');
  if (kazananKontrol('X')) {
    return { score: -10 };
  }
  if (kazananKontrol('O')) {
    return { score: 10 };
  }
  if (uygunHucreler.length === 0) {
    return { score: 0 };
  }

  const hamleler = [];
  for (let i = 0; i < uygunHucreler.length; i++) {
    const hamle = {};
    hamle.index = [...hucreler].indexOf(uygunHucreler[i]);
    hucreler[hamle.index].textContent = oyuncu;

    if (oyuncu === 'O') {
      const sonuc = alphaBetaMinimax(depth + 1, alpha, beta, 'X');
      hamle.score = sonuc.score;
      alpha = Math.max(alpha, hamle.score);
    } else {
      const sonuc = alphaBetaMinimax(depth + 1, alpha, beta, 'O');
      hamle.score = sonuc.score;
      beta = Math.min(beta, hamle.score);
    }

    hucreler[hamle.index].textContent = '';
    hamleler.push(hamle);

    if (beta <= alpha) {
      break;
    }
  }

  let enIyiHamle;
  if (oyuncu === 'O') {
    let enYuksekSkor = -Infinity;
    for (let i = 0; i < hamleler.length; i++) {
      if (hamleler[i].score > enYuksekSkor) {
        enYuksekSkor = hamleler[i].score;
        enIyiHamle = i;
      }
    }
  } else {
    let enDusukSkor = Infinity;
    for (let i = 0; i < hamleler.length; i++) {
      if (hamleler[i].score < enDusukSkor) {
        enDusukSkor = hamleler[i].score;
        enIyiHamle = i;
      }
    }
  }

  return hamleler[enIyiHamle];
}
