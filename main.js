"use strict";
//import { DataFrame } from 'pandas-js';
//import np from 'numpy-js';

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

    let data = [[1.787,	 0.285,	0.102, 0.610, 0.190, 0.070,	1.570, 0.870, 0.510,  null,  null,  null],
        [2.171,	 0.575,	0.284, 0.687, 0.187, 0.049,	1.500, 0.690, 0.337, 1.792,	2.330, 2.440],
        [2.504,	 0.740,	0.383, 0.722, 0.162, 0.043,	1.460, 0.630, 0.310, 1.686,	2.380, 2.268],
        [2.801,	 0.866,	0.460, 0.743, 0.145, 0.040,	1.430, 0.590, 0.290, 1.654,	2.345, 2.202],
        [3.070,	 0.971,	0.526, 0.756, 0.134, 0.039,	1.410, 0.560, 0.290, 1.651,	2.230, 2.168],
        [3.319,	 1.064,	0.584, 0.765, 0.127, 0.038,	1.390, 0.540, 0.280, 1.660,	2.257, 2.147],
        [3.550,	 1.148,	0.637, 0.772, 0.121, 0.038,	1.380, 0.530, 0.280, 1.674,	2.222, 2.132],
        [3.768,	 1.226,	0.686, 0.777, 0.117, 0.037,	1.370, 0.510, 0.280, 1.689,	2.194, 2.122],
        [3.974,	 1.298,	0.731, 0.781, 0.113, 0.037,	1.360, 0.500, 0.280, 1.704,	2.170, 2.113],
        [4.170,	 1.367,	0.774, 0.785, 0.111, 0.037,	1.350, 0.500, 0.270, 1.719,	2.149, 2.106],
        [4.357,	 1.431,	0.814, 0.787, 0.108, 0.037,	1.343, 0.489, 0.274, 1.733,	2.132, 2.102],
        [5.913,	 1.961,	1.142, 0.801, 0.097, 0.036,	1.311, 0.454, 0.268, 1.827,	2.043, 2.080],
        [7.138,	 2.372,	1.395, 0.805, 0.093, 0.035,	1.299, 0.440, 0.266, 1.872,	2.009, 2.072],
        [8.183,	 2.722,	1.608, 0.808, 0.091, 0.035,	1.292, 0.433, 0.265, 1.899,	1.991, 2.068],
        [9.108,	 3.031,	1.796, 0.809, 0.090, 0.035,	1.288, 0.429, 0.265, 1.916,	1.980, 2.066],
        [9.947,	 3.312,	1.966, 0.810, 0.089, 0.035,	1.285, 0.426, 0.264, 1.928,	1.972, 2.064],
        [10.721, 3.570,	2.123, 0.811, 0.089, 0.035,	1.283, 0.424, 0.264, 1.937,	1.967, 2.063],
        [11.443, 3.811,	2.268, 0.811, 0.088, 0.035,	1.282, 0.422, 0.264, 1.944,	1.962, 2.062],
        [12.122, 4.038,	2.405, 0.812, 0.088, 0.035,	1.280, 0.421, 0.263, 1.949,	1.959, 2.061],
        [12.765, 4.252,	2.535, 0.812, 0.088, 0.035,	1.279, 0.420, 0.263, 1.954,	1.957, 2.060],
        [13.377, 4.456,	2.658, 0.812, 0.087, 0.035,	1.279, 0.419, 0.263, 1.957,	1.954, 2.060],
        [13.962, 4.652,	2.776, 0.813, 0.087, 0.035,	1.278, 0.418, 0.263, 1.960,	1.953, 2.060],
        [14.524, 4.839,	2.889, 0.813, 0.087, 0.035,	1.277, 0.418, 0.263, 1.963,	1.951, 2.059],
        [15.065, 5.019,	2.998, 0.813, 0.087, 0.035,	1.277, 0.417, 0.263, 1.965,	1.950, 2.059],
        [15.587, 5.194,	3.103, 0.813, 0.087, 0.035,	1.277, 0.417, 0.263, 1.967,	1.948, 2.058],
        [16.092, 5.362,	3.204, 0.813, 0.087, 0.035,	1.276, 0.416, 0.263, 1.969,	1.947, 2.058],
        [16.581, 5.525,	3.302, 0.813, 0.086, 0.035,	1.276, 0.416, 0.263, 1.970,	1.947, 2.058],
        [17.057, 5.684,	3.398, 0.813, 0.086, 0.035,	1.276, 0.416, 0.263, 1.972,	1.946, 2.058],
        [17.520, 5.838,	3.491, 0.814, 0.086, 0.035,	1.275, 0.415, 0.263, 1.973,	1.945, 2.058],
        [17.971, 5.988,	3.581, 0.814, 0.086, 0.035,	1.275, 0.415, 0.263, 1.974,	1.945, 2.058],
        [21.977, 7.324,	4.385, 0.810, 0.086, 0.035,	1.270, 0.410, 0.260, 1.980,	1.940, 2.060]];

        let index_r2 = [0.0,  0.1,  0.2,  0.3,  0.4,  0.5,  0.6,  0.7,  0.8,  0.9,
            1.0,  2.0,  3.0,  4.0,  5.0,  6.0,  7.0,  8.0,  9.0, 10.0,
            11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 30.0];

        let columns_r2 = ["S1", "S2", "S3", "em1", "em2", "em3", "disp1", "disp2", "disp3", "beta11", "beta21", "beta31"];
    
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


/*

        let df = new DataFrame({
        index: index_r2,
        columns: columns_r2,
        data: data
        });

        let x = false;
        for (let i of index_r2) {
        if (i === r2) {
            df = df.loc({ rows: r2 });
            x = true;
        }
        }

        if (x !== true) {
        df.loc({ rows: r2, columns: df.columns }).assign(nan);
        df = df.reindex({ index: df.index.sort(), axis: 0 });
        df.interpolate({ method: 'polynomial', order: 1 }).round(4);
        df = df.loc({ rows: r2 });
        }

        console.log(df.toString());

*/


//console.log(Heigth_T);
        document.getElementById("sonuc").value = Heigth_T;

        document.getElementById("drmax").value = r2;

        
    }
});