PEC 4 — Desarrollo del Sitio Web Oficial de Felo Pellegrino

Justificación de Decisiones de Diseño y Maquetación

Durante el proceso de traslado del prototipo visual a código real, se realizaron ciertos ajustes justificados para mejorar la usabilidad y la jerarquía visual:

1. **Ajuste de Tamaños de Fuente (`font-size`)**:
   * Los tamaños de fuente definidos originalmente en el diseño resultaban excesivamente grandes al visualizarlos en navegadores reales de escritorio y dispositivos móviles. Se ajustaron las escalas tipográficas para garantizar una mejor lectura, proporción y equilibrio visual.

2. **Refinamiento de la Paleta de Colores**:
   * Se realizaron pequeños ajustes en los tonos de la paleta (dorados, bronces y contrastes) para optimizar el contraste, mejorar la accesibilidad tipográfica y lograr una estética más pulida en pantallas reales.

3. **Semántica y Accesibilidad HTML**:
   * Se corrigió la estructura de elementos interactivos eliminando la anidación de enlaces y botones, asegurando un código 100% válido y accesible según los estándares del W3C.



## Próximos Pasos (PEC 5 / JavaScript)

* **Carpeta `js/` (JavaScript)**:
    * La carpeta de scripts se creará e integrará en la siguiente PEC para dotar de interactividad avanzada a la web.

* **Funcionalidades pendientes de programación**:
    * **Reproductor interactivo**: Programación de los botones del reproductor de la página principal (`index.html`) para la reproducción de audio en línea.
    * **Filtros de catálogo y galería**: Implementación de filtros dinámicos por categoría en la Tienda y en la Galería de fotos.


## Mejoras realizadas:

Para esta PEC se ha centralizado la lógica en el archivo ejecutable js/funciones.js, incorporando las siguientes funcionalidades interactivas con JavaScript:

Menú Hamburguesa Responsive:

Apertura y cierre dinámico del menú de navegación en dispositivos móviles mediante la alternancia de clases CSS (active) y cierre automático al seleccionar una sección.

Reproductor Multimedia de Audio:

Programación interactiva del botón Play/Pausa con actualización de iconos SVG, cambio dinámico de pistas de la lista de canciones y animación visual de forma de onda.

Galería Interactiva ("Ver más / Ver menos"):

Desplegable dinámico que gestiona la visibilidad de la cuadrícula de fotografías para optimizar la carga inicial de la página.

Filtros por Categoría en la Galería:

Filtrado dinámico de imágenes mediante atributos de datos (data-filter y data-category), permitiendo clasificar el contenido en tiempo real sin recargar la página.

Visor de Imágenes (Lightbox):

Modal emergente que permite visualizar cualquier fotografía a pantalla completa al hacer clic sobre ella, con opción de cierre mediante botón o clic en el fondo.

Formulario de Contacto en el Footer:

Intercepción del envío (submit) con e.preventDefault(), validación básica de campos y respuesta visual dinámica de confirmación en el DOM.


