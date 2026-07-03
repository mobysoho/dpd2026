
function calcularEstadisticas() {

    const hoy = new Date();
    const añoActual = hoy.getFullYear();
    const inicioDeAño = new Date(añoActual, 0, 1);
    const unDiaEnMilisegundos = 1000 * 60 * 60 * 24;

    const diaActual = Math.floor((hoy - inicioDeAño) / unDiaEnMilisegundos) + 1;


    document.getElementById('texto-dia').innerHTML = `Current day:<br>${diaActual}`;


    window.addEventListener('load', function () {
        let diseñosSubidos = 0;
        let ultimaImagenValida = null;
        const imagenes = document.querySelectorAll('#gallery img');

        imagenes.forEach(img => {
            if (!img.src.includes('000.png')) {
                diseñosSubidos++;
                ultimaImagenValida = img;
            }
        });


        if (ultimaImagenValida !== null) {
            ultimaImagenValida.id = 'latest';
        }

        let diferencia = diaActual - diseñosSubidos;

        const elementoAtraso = document.getElementById('texto-atraso');

        if (diferencia > 0) {
            elementoAtraso.innerHTML = `Days behind:<br>${diferencia}`;
        } else if (diferencia < 0) {

            elementoAtraso.innerHTML = `Days ahead:<br>${diferencia * -1}`;
        } else {
            elementoAtraso.innerHTML = `Days behind:<br>None!`;
        }
    });
}


calcularEstadisticas();