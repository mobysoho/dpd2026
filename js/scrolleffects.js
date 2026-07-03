function actualizarEstadoBotones() {
    const btnPrincipio = document.querySelector('a[href="#beginning"]');
    const btnFinal = document.querySelector('a[href="#end"]');

    if (window.scrollY < 500) {
        btnPrincipio.classList.add('desactivado');
    } else {
        btnPrincipio.classList.remove('desactivado');
    }


    const posicionScroll = window.innerHeight + window.scrollY;
    const altoTotal = document.body.offsetHeight;

    if (posicionScroll >= altoTotal - 500) {
        btnFinal.classList.add('desactivado');
    } else {
        btnFinal.classList.remove('desactivado');
    }


    const footerFlotante = document.getElementById('footer-flotante');

    if (window.scrollY > 300 && posicionScroll < altoTotal - 80) {
        footerFlotante.classList.add('visible');
    } else {
        footerFlotante.classList.remove('visible');
    }
}



window.addEventListener('scroll', actualizarEstadoBotones);

window.addEventListener('load', actualizarEstadoBotones);