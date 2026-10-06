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


document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. FILTROS DE CATEGORÍAS EN LA TIENDA
  // ==========================================
  var enlacesCategorias = document.querySelectorAll('.cat-item');
  var tarjetasProductos = document.querySelectorAll('.producto-card');

  if (enlacesCategorias.length > 0 && tarjetasProductos.length > 0) {
    enlacesCategorias.forEach(function (enlace) {
      enlace.addEventListener('click', function (e) {
        e.preventDefault();

        // Cambiar estado activo en el menú lateral
        enlacesCategorias.forEach(function (item) {
          item.classList.remove('active');
        });
        this.classList.add('active');

        // Obtener la categoría a filtrar
        var filtro = this.getAttribute('data-filter');

        // Ocultar / Mostrar productos
        tarjetasProductos.forEach(function (tarjeta) {
          var categoriaTarjeta = tarjeta.getAttribute('data-categoria');

          if (filtro === 'todas' || categoriaTarjeta === filtro) {
            tarjeta.style.display = 'flex';
          } else {
            tarjeta.style.display = 'none';
          }
        });
      });
    });
  }


  // ==========================================
  // 2. CARRITO DE COMPRAS, TALLA Y TOAST
  // ==========================================
  var botonesComprar = document.querySelectorAll('.btn-comprar');
  var cartCount = document.getElementById('cartCount');
  var toast = document.getElementById('toastNotification');
  var totalProductos = 0;

  if (botonesComprar.length > 0) {
    botonesComprar.forEach(function (boton) {
      boton.addEventListener('click', function (e) {
        e.preventDefault();
        totalProductos++;

        if (cartCount) {
          cartCount.textContent = '(' + totalProductos + ')';
        }

        var tarjeta = this.closest('.producto-card');
        var titulo = tarjeta && tarjeta.querySelector('h3') ? tarjeta.querySelector('h3').textContent : 'Producto';
        var selectTalla = tarjeta ? tarjeta.querySelector('.select-talla') : null;
        var talla = selectTalla ? selectTalla.value : 'Única';

        if (toast) {
          toast.textContent = '¡Añadido: ' + titulo + ' (' + talla + ')!';
          toast.classList.add('show');
          setTimeout(function () {
            toast.classList.remove('show');
          }, 3000);
        }
      });
    });
  }




  // ==========================================
  // 4. BOTÓN VOLVER ARRIBA
  // ==========================================
  var btnBackToTop = document.getElementById('backToTop');

  if (btnBackToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btnBackToTop.classList.add('show');
      } else {
        btnBackToTop.classList.remove('show');
      }
    });

    btnBackToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

// ==========================================
  // ANIMACIÓN SCROLL REVEAL
  // ==========================================
  const elementosReveal = document.querySelectorAll('.reveal');

  if (elementosReveal.length > 0) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          // Aparece al entrar en pantalla
          entrada.target.classList.add('active');
        } else {
          // Se oculta al salir de pantalla para volver a animarse
          entrada.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.15 // Se activa cuando se ve el 15% del elemento
    });

    elementosReveal.forEach(el => observador.observe(el));
  }