console.log("ok");

// Función que recibe un objeto ZonedDateTime (fecha+hora+zona) de Temporal
// y lo devuelve como un string legible con formato dd/mm/aaaa - hh:mm
function formatear(zdt) {
    // padStart(2, "0") agrega un cero adelante si el número tiene un solo dígito
    // (por ejemplo: 9 -> "09"), para que siempre se vea con 2 dígitos
    const dia = String(zdt.day).padStart(2, "0");
    const mes = String(zdt.month).padStart(2, "0");
    const hora = String(zdt.hour).padStart(2, "0");
    const min = String(zdt.minute).padStart(2, "0");

    // Devuelve el string final ya armado, ej: "18/06/2026 - 18:05"
    return `${dia}/${mes}/${zdt.year} - ${hora}:${min}`;
}

// Función principal: se ejecuta cuando el usuario hace click en el botón
function calculoHoras() {

    // Toma los valores ingresados en los inputs de fecha y hora
    const fecha = document.getElementById("inputFecha").value; // ej: "2026-06-18"
    const hora = document.getElementById("inputHora").value;   // ej: "18:05"


    // Arma un string con formato ISO 8601 + zona horaria, que es lo que
    // Temporal necesita para crear un ZonedDateTime.
    // "[America/Argentina/Buenos_Aires]" es el identificador IANA de la zona horaria
    // Ejemplo final: "2026-06-18T18:05:00-03:00[America/Argentina/Buenos_Aires]"
    const fechaHora = `${fecha}T${hora}:00-03:00[America/Argentina/Buenos_Aires]`;

    // Crea un objeto ZonedDateTime a partir de ese string.
    // Este objeto representa un instante EXACTO en el tiempo (no ambiguo),
    // anclado a la zona horaria de Argentina
    const horaArgentina = temporal.Temporal.ZonedDateTime.from(fechaHora);

    // withTimeZone() NO suma ni resta horas a mano:
    // toma el mismo instante absoluto (el mismo momento universal)
    // y lo "traduce" a cómo se vería ese instante en otra zona horaria,
    // calculando automáticamente el horario correcto de cada lugar
    const madrid = horaArgentina.withTimeZone("Europe/Madrid");
    const shanghai = horaArgentina.withTimeZone("Asia/Shanghai");
    const nuevaYork = horaArgentina.withTimeZone("America/New_York");

    // Muestra cada resultado en el HTML, dentro del elemento correspondiente,
    // usando la función formatear() para que se vea prolijo
    document.getElementById("resultadoMadrid").textContent = "Madrid: " + formatear(madrid);

    document.getElementById("resultadoShanghai").textContent = "Shanghai: " + formatear(shanghai);

    document.getElementById("resultadoNY").textContent = "New York: " + formatear(nuevaYork);
}
// Conecta la función calcularHoras() al evento "click" del botón con id "boton"
// Es decir: recién se ejecuta todo el cálculo cuando el usuario hace click
document.getElementById("boton").addEventListener("click", calculoHoras);