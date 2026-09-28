document.addEventListener('DOMContentLoaded', () => {

  // REPRODUCTOR DE MÚSICA
  
  const audio = document.getElementById('audio-player');
  const btnPlay = document.getElementById('btn-play');
  const pathSVG = document.querySelector('#btn-play path');
  const waveform = document.getElementById('waveform');
  const trackTitle = document.getElementById('track-title');
  const trackItems = document.querySelectorAll('#tracklist li');

  const iconoPlay = "M8 5v14l11-7z";
  const iconoPausa = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";

  function actualizarEstado(estaSonando) {
    if (pathSVG) pathSVG.setAttribute('d', estaSonando ? iconoPausa : iconoPlay);
    if (btnPlay) btnPlay.setAttribute('aria-label', estaSonando ? 'Pausar' : 'Reproducir');
    if (waveform) {
      if (estaSonando) waveform.classList.add('playing');
      else waveform.classList.remove('playing');
    }
  }

  if (btnPlay && audio) {
    btnPlay.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => actualizarEstado(true)).catch(err => console.log(err));
      } else {
        audio.pause();
        actualizarEstado(false);
      }
    });
  }

  if (trackItems.length > 0) {
    trackItems.forEach(item => {
      item.addEventListener('click', () => {
        trackItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');

        const cancion = item.getAttribute('src');
        const titulo = item.getAttribute('title') || item.textContent.trim();

        if (trackTitle && titulo) {
          trackTitle.textContent = titulo;
        }

        if (audio && cancion) {
          audio.pause();
          audio.src = cancion;
          audio.load();
          audio.play().then(() => actualizarEstado(true)).catch(err => console.log(err));
        }
      });
    });
  }

  if (audio) {
    audio.addEventListener('ended', () => actualizarEstado(false));
  }


  // BOTÓN VER MÁS / VER MENOS (GALERÍA)

  const btnVerMas = document.getElementById('btn-ver-mas');

  if (btnVerMas) {
    btnVerMas.addEventListener('click', (e) => {
      e.preventDefault();

      const tarjetasExtras = document.querySelectorAll('.extra');

      if (tarjetasExtras.length > 0) {
        tarjetasExtras.forEach(card => card.classList.remove('extra'));
        btnVerMas.textContent = 'ver menos';
      } else {
        const todasLasTarjetas = document.querySelectorAll('.foto-card');
        const ultimasFotos = Array.from(todasLasTarjetas).slice(-4);

        ultimasFotos.forEach(card => card.classList.add('extra'));
        btnVerMas.textContent = 'ver más';
      }
    });
  }


  // MENÚ HAMBURGUESA RESPONSIVE

  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.querySelector('.nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.classList.toggle('active');
    });

    const enlaces = navLinks.querySelectorAll('a');
    enlaces.forEach(enlace => {
      enlace.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }


  
  // VISOR LIGHTBOX DE IMÁGENES

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const imagenesGaleria = document.querySelectorAll('.foto-card img');

  if (lightbox && lightboxImg && imagenesGaleria.length > 0) {
    imagenesGaleria.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Fotografía ampliada';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
      }
    });
  }


  // FILTROS DE LA GALERÍA

  const btnsFiltro = document.querySelectorAll('.btn-filtro');
  const fotosGaleria = document.querySelectorAll('.foto-card');

  if (btnsFiltro.length > 0 && fotosGaleria.length > 0) {
    btnsFiltro.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        btnsFiltro.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filtroElegido = btn.getAttribute('data-filter');

        fotosGaleria.forEach(foto => {
          const categoriaFoto = foto.getAttribute('data-category');

          if (filtroElegido === 'todos' || categoriaFoto === filtroElegido) {
            foto.classList.remove('oculto-filtro');
            foto.style.display = '';
          } else {
            foto.classList.add('oculto-filtro');
            foto.style.display = 'none';
          }
        });
      });
    });
  }

});


  // FORMULARIO DE CONTACTO 

  const formularioContacto = document.querySelector('.contact-form');
  const formMensaje = document.querySelector('.form-mensaje');

  if (formularioContacto) {
    formularioContacto.addEventListener('submit', (e) => {
      e.preventDefault(); 

      const inputNombre = formularioContacto.querySelector('input[name="nombre"]');
      const nombre = inputNombre ? inputNombre.value.trim() : '';

      if (formMensaje) {
        formMensaje.style.display = 'block';
        formMensaje.style.color = '#f2e3c6';
        formMensaje.style.marginTop = '15px';
        formMensaje.style.textAlign = 'center';
        formMensaje.style.fontWeight = 'bold';
        formMensaje.textContent = `¡Gracias, ${nombre}! Tu mensaje se ha enviado correctamente.`;

        formularioContacto.reset();

        setTimeout(() => {
          formMensaje.style.display = 'none';
        }, 5000);
      }
    });
  }