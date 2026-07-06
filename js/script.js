const TOTAL_DIAS = 365;
const RUTA_THUMBS = 'img/thumbs/';

// Gallery render
async function inicializarGaleria() {
    let inicio = 1, fin = TOTAL_DIAS, diseñosSubidos = 0;

    while (inicio <= fin) {
        let medio = Math.floor((inicio + fin) / 2);
        let nombre = String(medio).padStart(3, '0') + '.jpg';
        try {
            let respuesta = await fetch(RUTA_THUMBS + nombre, { method: 'HEAD' });
            if (respuesta.ok) { diseñosSubidos = medio; inicio = medio + 1; }
            else { fin = medio - 1; }
        } catch (e) { break; }
    }

    renderizarGaleria(diseñosSubidos);
    calcularEstadisticas(diseñosSubidos);
}

function renderizarGaleria(cantidad) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    for (let i = 1; i <= TOTAL_DIAS; i++) {
        let num = String(i).padStart(3, '0');
        let img = document.createElement('img');
        if (i <= cantidad) {
            img.src = `${RUTA_THUMBS}${num}.jpg`;
            img.dataset.full = `img/full/${num}.png`;
            img.onclick = function() { openImg(this); };
            if (i === cantidad) img.id = 'latest';
        } else {
            img.src = `${RUTA_THUMBS}000.jpg`;
            img.style.cursor = 'default';
        }
        img.alt = `Design ${num}`;
        img.loading = "lazy";
        gallery.appendChild(img);
    }
}

// Day count
function calcularEstadisticas(diseñosSubidos) {
    const hoy = new Date();
    const diaActual = Math.floor((hoy - new Date(hoy.getFullYear(), 0, 1)) / 86400000) + 1;
    
    document.getElementById('texto-dia').innerHTML = `Current day:<br>${diaActual}`;
    let dif = diaActual - diseñosSubidos;
    const el = document.getElementById('texto-atraso');
    el.innerHTML = dif > 0 ? `Days behind:<br>${dif}` : (dif < 0 ? `Days ahead:<br>${Math.abs(dif)}` : `Days behind:<br>None!`);
}

// Scroll effects
function actualizarEstadoBotones() {
    const btnPrincipio = document.querySelector('a[href="#beginning"]');
    const btnFinal = document.querySelector('a[href="#end"]');
    const footer = document.getElementById('footer-flotante');
    
    const scrollActual = window.scrollY;
    const scrollPos = window.innerHeight + scrollActual;
    const altoTotal = document.body.offsetHeight;

    if (btnPrincipio) {
        if (scrollActual < 500) {
            btnPrincipio.classList.add('desactivado');
        } else {
            btnPrincipio.classList.remove('desactivado');
        }
    }

    if (btnFinal) {
        if (scrollPos >= altoTotal - 500) {
            btnFinal.classList.add('desactivado');
        } else {
            btnFinal.classList.remove('desactivado');
        }
    }

    if (footer) {
        if (scrollActual > 300 && scrollPos < altoTotal - 80) {
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    }
}

// Full img
const fullImgBox = document.getElementById("fullImgBox"), fullImg = document.getElementById("fullImg");
function openImg(el) { fullImgBox.style.display = "flex"; fullImg.src = el.dataset.full; document.body.style.overflow = "hidden"; }
function closeImg() { fullImgBox.style.display = "none"; fullImg.src = ""; document.body.style.overflow = "auto"; }



document.addEventListener('DOMContentLoaded', () => {
    inicializarGaleria().then(() => {
        actualizarEstadoBotones();
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                actualizarEstadoBotones();
                ticking = false;
            });
            ticking = true;
        }
    });
});