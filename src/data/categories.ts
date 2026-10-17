export const secciones = [
  {
    slug: 'tecnologia', titulo: 'Tecnología', acento: 'para entender el mundo.',
    descripcion: 'Conceptos, tendencias e ideas que te ayudarán a comprender mejor la tecnología actual.',
    icono: '◈', recursos: [
      { titulo: 'Copias de seguridad: regla 3-2-1', descripcion: 'Protege archivos con un plan de copias y restauración.', url: '/tecnologia/copias-de-seguridad/', etiqueta: 'Leer guía' },

      { titulo: 'Seguridad digital básica: protege tus cuentas', descripcion: 'Contraseñas, segundo factor y hábitos para reducir riesgos.', url: '/tecnologia/seguridad-digital/', etiqueta: 'Leer artículo' },
    ],
  },
  {
    slug: 'programacion', titulo: 'Programación', acento: 'para crear sin límites.',
    descripcion: 'Aprende JavaScript, desarrollo web y los fundamentos para construir tus primeras aplicaciones.',
    icono: '</>', recursos: [
      { titulo: 'HTML semántico desde cero', descripcion: 'Estructura tus páginas con etiquetas claras y accesibles.', url: '/programacion/html-semantico/', etiqueta: 'Leer guía' },
      { titulo: 'Diseño responsive con Flexbox y Grid', descripcion: 'Diseña páginas que se adapten a distintos dispositivos.', url: '/programacion/diseno-responsive/', etiqueta: 'Leer guía' },
      { titulo: 'Consumir una API con fetch', descripcion: 'Solicitudes JSON, estados HTTP y control de errores.', url: '/programacion/consumir-api-fetch/', etiqueta: 'Leer guía' },

      { titulo: 'Primeros pasos con JavaScript', descripcion: 'Variables, funciones y eventos con ejemplos claros y ejecutables.', url: '/programacion/primeros-pasos-javascript/', etiqueta: 'Leer tutorial' },
      { titulo: 'Git y GitHub desde cero', descripcion: 'Aprende commits, repositorios y cómo compartir tu código.', url: '/programacion/git-y-github/', etiqueta: 'Leer tutorial' },
    ],
  },
  {
    slug: 'redes', titulo: 'Redes y sistemas', acento: 'con una visión práctica.',
    descripcion: 'Direcciones IP, subredes, routers, conectividad y administración básica de sistemas.',
    icono: '⌘', recursos: [
      { titulo: 'Subredes IPv4: ejercicio /26', descripcion: 'Calcula red, broadcast y rango de direcciones paso a paso.', url: '/redes/subredes-ipv4/', etiqueta: 'Leer guía' },
      { titulo: 'Diagnosticar Internet en Windows', descripcion: 'Una guía práctica con ipconfig, ping y DNS.', url: '/redes/diagnosticar-internet/', etiqueta: 'Leer guía' },

      { titulo: 'Qué es una dirección IP y cómo funciona', descripcion: 'Comprende IPv4, máscaras, redes privadas y rutas con ejemplos cotidianos.', url: '/redes/direcciones-ip/', etiqueta: 'Leer tutorial' },
      { titulo: 'Qué es DNS y cómo funciona', descripcion: 'Comprende por qué los dominios necesitan servidores DNS.', url: '/redes/que-es-dns/', etiqueta: 'Leer tutorial' },
      { titulo: 'Calculadora de subredes IPv4/CIDR', descripcion: 'Calcula máscara, red, broadcast y direcciones utilizables.', url: '/herramientas/calculadora-ip/', etiqueta: 'Usar herramienta' },
    ],
  },
  {
    slug: 'tutoriales', titulo: 'Tutoriales', acento: 'para aprender haciendo.',
    descripcion: 'Guías paso a paso para resolver problemas, practicar y mejorar tus habilidades digitales.',
    icono: '↗', recursos: [
      { titulo: 'HTML semántico desde cero', descripcion: 'Estructura tus páginas con etiquetas claras y accesibles.', url: '/programacion/html-semantico/', etiqueta: 'Leer guía' },
      { titulo: 'Diseño responsive con Flexbox y Grid', descripcion: 'Diseña páginas que se adapten a distintos dispositivos.', url: '/programacion/diseno-responsive/', etiqueta: 'Leer guía' },
      { titulo: 'Consumir una API con fetch', descripcion: 'Solicitudes JSON, estados HTTP y control de errores.', url: '/programacion/consumir-api-fetch/', etiqueta: 'Leer guía' },
      { titulo: 'Subredes IPv4: ejercicio /26', descripcion: 'Calcula red, broadcast y rango de direcciones paso a paso.', url: '/redes/subredes-ipv4/', etiqueta: 'Leer guía' },
      { titulo: 'Diagnosticar Internet en Windows', descripcion: 'Una guía práctica con ipconfig, ping y DNS.', url: '/redes/diagnosticar-internet/', etiqueta: 'Leer guía' },
      { titulo: 'Copias de seguridad: regla 3-2-1', descripcion: 'Protege archivos con un plan de copias y restauración.', url: '/tecnologia/copias-de-seguridad/', etiqueta: 'Leer guía' },

      { titulo: 'Configura y entiende una dirección IPv4', descripcion: 'Guía de conceptos esenciales de redes para principiantes.', url: '/redes/direcciones-ip/', etiqueta: 'Leer tutorial' },
      { titulo: 'JavaScript desde cero', descripcion: 'Aprende lo básico con ejemplos prácticos.', url: '/programacion/primeros-pasos-javascript/', etiqueta: 'Leer tutorial' },
      { titulo: 'Git y GitHub desde cero', descripcion: 'Controla versiones y publica tu repositorio.', url: '/programacion/git-y-github/', etiqueta: 'Leer tutorial' },
      { titulo: 'DNS explicado paso a paso', descripcion: 'Descubre cómo encuentra tu navegador un dominio.', url: '/redes/que-es-dns/', etiqueta: 'Leer tutorial' },
    ],
  },
] as const;
