"use strict";

document.getElementById("temizleButton").addEventListener("click", function() {
    // Formu seç
    let form = document.getElementById("form1");
    
    // Formun içindeki tüm input elemanlarını al
    let inputs = form.getElementsByTagName("input");

    // Her bir input elemanının değerini temizle
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
};
});

document.getElementById("resetButton").addEventListener("click", function() {
    // Formu seç ve resetle
    document.getElementById("form1").reset();
});

document.getElementById("hesaplaButton").addEventListener("click", function(event) {
    event.preventDefault();

    // Bina Özellikleri
    let num_f = parseInt(document.getElementById("num_f").value);
    let num_h = parseFloat(document.getElementById("num_h").value);
    let E = parseInt(document.getElementById("E").value);
    let G = parseInt(document.getElementById("G").value);
    let mass = parseFloat(document.getElementById("mass").value);

    // Kolon Özellikleri
    let Ic = parseFloat(document.getElementById("Ic").value)*10**(-8);
    let Ac = parseFloat(document.getElementById("Ac").value)*10**(-4);
    let d = parseFloat(document.getElementById("d").value)*10**(-3);
    let Afl = parseFloat(document.getElementById("Afl").value)*10**(-6);
    let Aweb = parseFloat(document.getElementById("Aweb").value)*10**(-6);
    let tweb = parseFloat(document.getElementById("tweb").value)*10**(-3);

    // Duvar Özellikleri
    let plw = parseFloat(document.getElementById("plw").value);
    let ptk = parseFloat(document.getElementById("ptk").value)*10**(-3);
    
    // Deprem Parametreleri
    let Sa1 = parseFloat(document.getElementById("Sa1").value);
    let Sa2 = parseFloat(document.getElementById("Sa2").value);
    let Sa3 = parseFloat(document.getElementById("Sa3").value);
    let Sd1 = parseFloat(document.getElementById("Sd1").value);
    let Sd2 = parseFloat(document.getElementById("Sd2").value);
    let Sd3 = parseFloat(document.getElementById("Sd3").value);

    let matris = [
        ["Index","S1", "S2", "S3", "em1", "em2", "em3", "disp1", "disp2", "disp3", "beta11", "beta21", "beta31"],
        [0.0, 1.787,	0.285,	0.102, 0.610, 0.190, 0.070,	1.570, 0.870, 0.510,  null,  null,  null],
        [0.1, 2.171,	0.575,	0.284, 0.687, 0.187, 0.049,	1.500, 0.690, 0.337, 1.792,	2.330, 2.440],
        [0.2, 2.504,	0.740,	0.383, 0.722, 0.162, 0.043,	1.460, 0.630, 0.310, 1.686,	2.380, 2.268],
        [0.3, 2.801,	0.866,	0.460, 0.743, 0.145, 0.040,	1.430, 0.590, 0.290, 1.654,	2.345, 2.202],
        [0.4, 3.070,	0.971,	0.526, 0.756, 0.134, 0.039,	1.410, 0.560, 0.290, 1.651,	2.230, 2.168],
        [0.5, 3.319,	1.064,	0.584, 0.765, 0.127, 0.038,	1.390, 0.540, 0.280, 1.660,	2.257, 2.147],
        [0.6, 3.550,	1.148,	0.637, 0.772, 0.121, 0.038,	1.380, 0.530, 0.280, 1.674,	2.222, 2.132],
        [0.7, 3.768,	1.226,	0.686, 0.777, 0.117, 0.037,	1.370, 0.510, 0.280, 1.689,	2.194, 2.122],
        [0.8, 3.974,	1.298,	0.731, 0.781, 0.113, 0.037,	1.360, 0.500, 0.280, 1.704,	2.170, 2.113],
        [0.9, 4.170,	1.367,	0.774, 0.785, 0.111, 0.037,	1.350, 0.500, 0.270, 1.719,	2.149, 2.106],
        [1.0, 4.357,	1.431,	0.814, 0.787, 0.108, 0.037,	1.343, 0.489, 0.274, 1.733,	2.132, 2.102],
        [2.0, 5.913,	1.961,	1.142, 0.801, 0.097, 0.036,	1.311, 0.454, 0.268, 1.827,	2.043, 2.080],
        [3.0, 7.138,	2.372,	1.395, 0.805, 0.093, 0.035,	1.299, 0.440, 0.266, 1.872,	2.009, 2.072],
        [4.0, 8.183,	2.722,	1.608, 0.808, 0.091, 0.035,	1.292, 0.433, 0.265, 1.899,	1.991, 2.068],
        [5.0, 9.108,	3.031,	1.796, 0.809, 0.090, 0.035,	1.288, 0.429, 0.265, 1.916,	1.980, 2.066],
        [6.0, 9.947,	3.312,	1.966, 0.810, 0.089, 0.035,	1.285, 0.426, 0.264, 1.928,	1.972, 2.064],
        [7.0, 10.721, 3.570,	2.123, 0.811, 0.089, 0.035,	1.283, 0.424, 0.264, 1.937,	1.967, 2.063],
        [8.0, 11.443, 3.811,	2.268, 0.811, 0.088, 0.035,	1.282, 0.422, 0.264, 1.944,	1.962, 2.062],
        [9.0, 12.122, 4.038,	2.405, 0.812, 0.088, 0.035,	1.280, 0.421, 0.263, 1.949,	1.959, 2.061],
        [10.0, 12.765, 4.252,	2.535, 0.812, 0.088, 0.035,	1.279, 0.420, 0.263, 1.954,	1.957, 2.060],
        [11.0, 13.377, 4.456,	2.658, 0.812, 0.087, 0.035,	1.279, 0.419, 0.263, 1.957,	1.954, 2.060],
        [12.0, 13.962, 4.652,	2.776, 0.813, 0.087, 0.035,	1.278, 0.418, 0.263, 1.960,	1.953, 2.060],
        [13.0, 14.524, 4.839,	2.889, 0.813, 0.087, 0.035,	1.277, 0.418, 0.263, 1.963,	1.951, 2.059],
        [14.0, 15.065, 5.019,	2.998, 0.813, 0.087, 0.035,	1.277, 0.417, 0.263, 1.965,	1.950, 2.059],
        [15.0, 15.587, 5.194,	3.103, 0.813, 0.087, 0.035,	1.277, 0.417, 0.263, 1.967,	1.948, 2.058],
        [16.0, 16.092, 5.362,	3.204, 0.813, 0.087, 0.035,	1.276, 0.416, 0.263, 1.969,	1.947, 2.058],
        [17.0, 16.581, 5.525,	3.302, 0.813, 0.086, 0.035,	1.276, 0.416, 0.263, 1.970,	1.947, 2.058],
        [18.0, 17.057, 5.684,	3.398, 0.813, 0.086, 0.035,	1.276, 0.416, 0.263, 1.972,	1.946, 2.058],
        [19.0, 17.520, 5.838,	3.491, 0.814, 0.086, 0.035,	1.275, 0.415, 0.263, 1.973,	1.945, 2.058],
        [20.0, 17.971, 5.988,	3.581, 0.814, 0.086, 0.035,	1.275, 0.415, 0.263, 1.974,	1.945, 2.058],
        [30.0, 21.977, 7.324,	4.385, 0.810, 0.086, 0.035,	1.270, 0.410, 0.260, 1.980,	1.940, 2.060]
      ];
    
    // Değerlerin boş veya geçersiz olup olmadığını kontrol et
    if (isNaN(num_f) || isNaN(num_h)) {
        document.getElementById("sonuc").value = "Geçersiz giriş";
    } else {
        // Hesapla ve sonucu göster
        
        let Heigth_T = num_f * num_h;
        let Mass_T = 2 * mass * num_f;
        let roA = mass / num_h;

        let Q1 = Afl * (plw * 0.5 + d); 
        let Q2 = Q1 + Aweb * 0.5 * (plw + d);
        let Q3 = Ac * 0.5 * (plw + d);
        let Q4 = Q3 + plw**2 * ptk / 8;

        let beta1 = (Q1**2 + Q2**2) * d / tweb;
        let beta2 = (Q3**2 + Q4**2) * plw / (2 * ptk);
        let beta = beta1 + beta2;

        let Iw = (ptk * plw**3 / 12) + 2 * Ac * ((d + plw) / 2)**2 + 2 * Ic;

        let KGAw = (Iw**2 / beta) * G;

        let r2 = E * Iw / (KGAw * Heigth_T**2);

  // Newton Enterpolasyonu kullanarak değerleri bulan fonksiyon
function newtonEnterpolasyonu(r2, matris) {
  // Uygun aralığı bul
  let index = null;
  for (let i = 1; i < matris.length; i++) {
      const r2Degeri = matris[i][0]; // İlgili satırın r2 değeri
      if (r2Degeri === r2) {
          index = i; // Tam eşleşme varsa, o satırı kullan
          break;
      } else if (r2Degeri > r2) {
          index = i; // Aranan r2 değerinden büyük ilk değeri kullan
          break;
      }
  }
  // Uygun aralık bulunamadıysa null döndür
  if (index === null) {
      return null;
  }
  // Newton Enterpolasyonu için gereken değerleri hesapla
  const x = r2; // Aranan r2 değeri
  const x0 = matris[index - 1][0];
  const x1 = matris[index][0];
  const y0 = matris[index - 1].slice(1); // İlgili satırın değerleri
  const y1 = matris[index].slice(1); // İlgili satırın değerleri
  // Newton Enterpolasyonu formülü
  const f = (x - x0) / (x1 - x0);
  const interpolValues = y0.map((y0i, i) => y0i + f * (y1[i] - y0i));

  return interpolValues;
}

// Örnek olarak r2 değeri ile ilgili matrisin değerlerini Newton Enterpolasyonu ile getirelim
const interpolDegerler = newtonEnterpolasyonu(r2, matris);

const S1 = interpolDegerler[0];
const S2 = interpolDegerler[1];
const S3 = interpolDegerler[2];

const em1 = interpolDegerler[3];
const em2 = interpolDegerler[4];
const em3 = interpolDegerler[5];

const disp1 = interpolDegerler[6];
const disp2 = interpolDegerler[7];
const disp3 = interpolDegerler[8];

const beta11 = interpolDegerler[9];
const beta21 = interpolDegerler[10];
const beta31 = interpolDegerler[11];
     
let correction = [
    ["Floor",  "Mode1",  "Mode2", "Mode3"],
    [1, 0.492,  null,  null], [2, 0.664, 0.704,  null], [3, 0.749, 0.781, 0.751],
    [4, 0.799, 0.821, 0.829], [5, 0.833, 0.848, 0.860], [6, 0.857, 0.868, 0.878],
    [7, 0.875, 0.883, 0.892], [8, 0.889, 0.895, 0.903], [9, 0.900, 0.905, 0.912],
    [10, 0.909, 0.913, 0.919], [11, 0.917, 0.920, 0.925], [12, 0.923, 0.926, 0.931],
    [13, 0.928, 0.931, 0.935], [14, 0.933, 0.935, 0.939], [15, 0.937, 0.939, 0.943],
    [16, 0.941, 0.943, 0.946], [17, 0.944, 0.946, 0.949], [18, 0.947, 0.948, 0.952],
    [19, 0.950, 0.951, 0.954], [20, 0.952, 0.953, 0.956], [21, 0.954, 0.955, 0.958],
    [22, 0.956, 0.957, 0.960], [23, 0.958, 0.959, 0.962], [24, 0.960, 0.960, 0.963],
    [25, 0.961, 0.962, 0.965], [26, 0.963, 0.963, 0.966], [27, 0.964, 0.964, 0.967],
    [28, 0.965, 0.966, 0.968], [29, 0.967, 0.967, 0.969], [30, 0.968, 0.968, 0.970]
    ];

  function getirSatir(index, correction) {
    // Verilen index'e karşılık gelen satırı seç
    const satir = correction[index];
    
    // İlk sütun (index) değerini çıkararak geri kalan değerleri döndür
    const degerler = satir.slice(1); 
    
    return degerler;
}

// Örnek olarak index değeri ile ilgili satırın değerlerini getirelim
const satirDegerleri = getirSatir(num_f, correction);

const mode1 = satirDegerleri[0];
const mode2 = satirDegerleri[1];
const mode3 = satirDegerleri[2];

let T1 = (S1 * Heigth_T**2 / mode1) * (roA / (E * Iw))**0.5
let T2 = (S2 * Heigth_T**2 / mode2) * (roA / (E * Iw))**0.5
let T3 = (S3 * Heigth_T**2 / mode3) * (roA / (E * Iw))**0.5

let Vb1 = em1 * Mass_T * Sa1
let Vb2 = em2 * Mass_T * Sa2
let Vb3 = em3 * Mass_T * Sa3

let Vb = (Vb1**2 + Vb2**2 + Vb3**2)**0.5

let dmax1 = disp1 * Sd1
let dmax2 = disp2 * Sd2
let dmax3 = disp3 * Sd3

let dmax = (dmax1**2 + dmax2**2 + dmax3**2)**0.5

let dr11 = beta11 * Sd1 / Heigth_T
let dr21 = beta21 * Sd2 / Heigth_T
let dr31 = beta31 * Sd3 / Heigth_T

let drmax = (dr11**2 + dr21**2 + dr31**2)**0.5

document.getElementById("T1").value = T1.toFixed(3);
document.getElementById("T2").value = T2.toFixed(3);
document.getElementById("T3").value = T3.toFixed(3);

document.getElementById("Vb1").value = Vb1.toFixed(3);
document.getElementById("Vb2").value = Vb2.toFixed(3);
document.getElementById("Vb3").value = Vb3.toFixed(3);

document.getElementById("Vb").value = Vb.toFixed(3);

document.getElementById("dmax1").value = dmax1.toFixed(4);
document.getElementById("dmax2").value = dmax2.toFixed(4);
document.getElementById("dmax3").value = dmax3.toFixed(4);

document.getElementById("dmax").value = dmax.toFixed(4);

document.getElementById("dr11").value = dr11.toFixed(6);
document.getElementById("dr21").value = dr21.toFixed(6);
document.getElementById("dr31").value = dr31.toFixed(6);

document.getElementById("drmax").value = drmax.toFixed(6);
}
});
