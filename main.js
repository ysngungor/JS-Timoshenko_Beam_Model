/*### Building Features ###*/
var num_f = 4              // Number of floors
var num_h = 3.29           // (m) Floor height
var H = num_f * num_h      // (m) Building height
var E = 200 * 10**6        // (kN/m2) Elasticity modulus
var G = 77 * 10**6         // (kN/m2) Shear modulus
var mass = 150             // (t/floor)
var Mt = 2 * mass * num_f  // (t) Total Mass (2 shear wall)
var roA = mass / num_h     // (t/m) Mass spread over floor height

/*### Column Properties ###*/
// HD400x287
var Ic = 0.9971 * 10**(-3)    // (m4) Moment of inertia
var Ac = 366.3 * 10**(-4)     // (m2) Area
var d = 0.393                 // (m)  Profile height
var Afl = 14603.4 * 10**(-6)  // (m2) Flange area
var Aweb = 8881.8 * 10**(-6)  // (m2) Web area
var tweb = 22.6 * 10**(-3)    // (m)  Web thickness

/*### Wall Properties ###*/
var plw = 3      // (m) Plate width
var ptk = 0.003  // (m) Plate thickness

/*### Earthquake Parameters ###*/
var Sa1 = 1.752008  // (m/s2) Spectral Acceleration
var Sa2 = 2.819928  // (m/s2) Spectral Acceleration
var Sa3 = 2.553271  // (m/s2) Spectral Acceleration
var Sd1 = 0.016318  // (m) Spectral Displacement
var Sd2 = 0.002344  // (m) Spectral Displacement
var Sd3 = 0.000582  // (m) Spectral Displacement

document.getElementById("Hesapla").addEventListener("click", function() {

var num_f = parseInt(document.getElementById("num_f").value);
var num_f = parseFloat(document.getElementById("num_h").value);

// Değerlerin boş veya geçersiz olup olmadığını kontrol et
if (isNaN(num_f) || isNaN(num_h)) {
    document.getElementById("sonuc").innerText = "Lütfen geçerli sayılar girin.";
} 
else {
    // İki sayıyı topla ve sonucu göster
    var H = num_f * num_h;
    document.getElementById("sonuc").innerText = "H = " + H;
}});

function clrFunction() {
    document.getElementById("form1").reset();
};