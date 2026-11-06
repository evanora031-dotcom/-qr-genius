import type { ExtraToolContent } from './extraToolTypes';

export const EXTRA_TOOLS_ES: ExtraToolContent = {
  text: {
    label: 'QR de Texto',
    meta: {
      title: 'Generador de Código QR de Texto Gratis | Texto Plano | QR GENIUS',
      description: 'Convierte cualquier texto, como una nota, un código, un mensaje o instrucciones breves, en un código QR. Gratis, sin registro y generado en tu navegador.',
      keywords: 'texto a codigo qr, generador qr de texto, qr con mensaje, qr de texto gratis',
      h1: 'Generador de Códigos QR de Texto'
    },
    page: {
      badge: 'QR de Texto Plano',
      title: 'Generador de Códigos QR de Texto Gratis',
      subtitle: 'Codifica una nota, un mensaje, un número de serie o instrucciones breves en un código QR que muestra el texto al escanearlo. No hace falta ningún sitio web.',
      benefits: [
        'El texto va dentro del código, sin página web ni servidor de por medio',
        'Útil para números de serie, etiquetas de inventario, instrucciones breves, códigos de eventos y actividades en clase',
        'Sé breve: menos texto crea un código más sencillo que se escanea más rápido y desde más lejos',
        'Descarga SVG o PNG de alta resolución para etiquetas e impresión'
      ],
      faqs: [
        { q: '¿Cuánto texto cabe en un código QR?', a: 'Un código QR puede contener como máximo unos pocos miles de caracteres, pero un texto largo produce un código denso y más difícil de escanear. Si pasa de unas pocas frases, enlaza mejor a una página web.' },
        { q: '¿Qué pasa cuando alguien escanea un QR de texto?', a: 'La mayoría de las cámaras de los teléfonos actuales muestran el texto y permiten copiarlo. Las opciones exactas dependen del teléfono y de la aplicación de escaneo.' },
        { q: '¿Puedo cambiar el texto después de imprimir?', a: 'No. Un código QR estático guarda el propio texto, así que cambiarlo exige generar e imprimir un código nuevo.' }
      ]
    },
    copy: {
      heading: 'Pon un mensaje dentro de un código QR',
      body: 'Un código QR de texto guarda tus palabras directamente en el código, por lo que se puede leer sin un sitio web. Sirve para etiquetas, fichas de inventario, búsquedas del tesoro e instrucciones breves. Escribe o pega el texto, revisa la vista previa y escanéalo para confirmar que se lee tal como quieres.',
      steps: ['Escribe o pega el texto que quieres compartir.', 'Mantenlo breve para un código más limpio y fácil de escanear.', 'Escanea la vista previa con un teléfono y descarga el código.'],
      tip: 'No incluyas contraseñas ni información privada en un QR de texto: cualquiera que lo escanee puede leerla.'
    }
  },

  email: {
    label: 'QR de Correo',
    meta: {
      title: 'Generador de Código QR de Correo Gratis | Escanea y Escribe | QR GENIUS',
      description: 'Crea un código QR de correo que abre un mensaje nuevo con tu dirección, asunto y texto opcional ya rellenados. Gratis y privado.',
      keywords: 'generador qr de correo, qr mailto, escanear para enviar email, qr de email gratis',
      h1: 'Generador de Códigos QR de Correo Electrónico'
    },
    page: {
      badge: 'Escanea y Escribe',
      title: 'Generador de Códigos QR de Correo Gratis',
      subtitle: 'Crea un código QR que abre un correo listo para enviar con tu dirección, el asunto y el mensaje ya rellenados. Ideal para folletos, envases y tarjetas de visita.',
      benefits: [
        'Al escanear se abre la aplicación de correo con un mensaje nuevo dirigido a ti',
        'Rellena el asunto y el cuerpo para recibir mensajes claros y fáciles de clasificar',
        'Útil para comentarios, reservas, solicitudes de presupuesto y soporte en materiales impresos',
        'Un código estático: tus datos se guardan en el propio código, no en nuestros servidores'
      ],
      faqs: [
        { q: '¿Qué aplicación de correo se abre al escanear?', a: 'El teléfono abre su aplicación de correo predeterminada o pregunta cuál usar, según su configuración.' },
        { q: '¿Puedo rellenar el asunto y el mensaje?', a: 'Sí. Añade un asunto y un cuerpo y aparecerán en el mensaje nuevo. Quien lo envía aún puede editarlos antes de enviar.' },
        { q: '¿Se verá mi dirección de correo?', a: 'Sí. La dirección se guarda en el código, así que cualquiera que lo escanee puede verla. Usa una dirección de contacto pública, no una privada.' }
      ]
    },
    copy: {
      heading: 'Un solo escaneo para escribirte',
      body: 'Un código QR de correo usa el formato estándar mailto. Al escanearlo, el teléfono abre un mensaje nuevo a tu dirección con el asunto y el texto que elegiste. La gente se ahorra escribir tu dirección y tú recibes mensajes bien identificados.',
      steps: ['Introduce la dirección de correo que debe recibir el mensaje.', 'Añade, si quieres, un asunto y un cuerpo de mensaje.', 'Escanea el código para comprobar que el borrador se abre bien y descárgalo.'],
      tip: 'Usa una dirección de contacto dedicada para los códigos impresos, ya que cualquiera puede escanearlos y leer la dirección.'
    }
  },

  phone: {
    label: 'QR de Teléfono',
    meta: {
      title: 'Generador de Código QR de Teléfono Gratis | Escanea para Llamar | QR GENIUS',
      description: 'Crea un código QR que propone llamar a tu número al escanearlo. Gratis, sin registro, con descarga en SVG y PNG para imprimir.',
      keywords: 'qr de numero de telefono, escanear para llamar, generador qr de llamada, qr tel',
      h1: 'Generador de Códigos QR de Número de Teléfono'
    },
    page: {
      badge: 'Escanea para Llamar',
      title: 'Generador de Códigos QR de Teléfono Gratis',
      subtitle: 'Convierte un número de teléfono en un código QR que permite llamar con un toque. Perfecto para escaparates, vehículos, folletos y carteles.',
      benefits: [
        'La gente escanea, toca llamar y te contacta sin escribir el número',
        'Funciona bien en escaparates, vehículos, cajas de envío y anuncios impresos',
        'Usa el formato internacional con el prefijo del país para que funcione desde cualquier lugar',
        'Un código estático sin caducidad: funciona mientras el número sea tuyo'
      ],
      faqs: [
        { q: '¿Escanear llama automáticamente al número?', a: 'Normalmente el teléfono muestra una propuesta de llamada y la persona confirma antes de marcar. No llama por sí solo.' },
        { q: '¿Debo incluir el prefijo del país?', a: 'Sí. Escribe el número en formato internacional, por ejemplo +212 o +34 seguido del número, para que funcione con quienes llaman desde otros países.' },
        { q: '¿Y si cambio de número?', a: 'El código guarda el propio número, así que tendrás que crear e imprimir un código nuevo.' }
      ]
    },
    copy: {
      heading: 'Deja que te llamen con un escaneo',
      body: 'Un código QR de teléfono codifica un enlace tel:. Tras escanearlo, el teléfono ofrece llamar al número, de modo que los clientes no tienen que leerlo y teclearlo. Es una forma sencilla de hacer que un número impreso sea accionable.',
      steps: ['Introduce el número de teléfono con su prefijo de país.', 'Revisa la vista previa y escanéala con tu propio teléfono.', 'Descarga el código en SVG o PNG para imprimir.'],
      tip: 'Imprime también el número en texto junto al código, para quienes prefieran marcar a mano.'
    }
  },

  sms: {
    label: 'QR de SMS',
    meta: {
      title: 'Generador de Código QR de SMS Gratis | Mensaje Prellenado | QR GENIUS',
      description: 'Crea un código QR de SMS que abre un mensaje a tu número con un texto ya escrito. Gratis y generado en tu navegador.',
      keywords: 'generador qr de sms, qr mensaje de texto, escanear para enviar sms, qr sms prellenado',
      h1: 'Generador de Códigos QR de SMS'
    },
    page: {
      badge: 'Escanea y Escribe',
      title: 'Generador de Códigos QR de SMS Gratis',
      subtitle: 'Crea un código QR que abre un nuevo mensaje de texto a tu número con un mensaje ya escrito. Ideal para campañas por palabra clave, solicitudes de cita y respuestas rápidas.',
      benefits: [
        'Al escanear se abre la aplicación de mensajes con el destinatario y el texto listos',
        'Genial para solicitudes de cita, inscripciones a clubes, palabras clave de pedido y comentarios',
        'Un mensaje breve y preescrito hace que los SMS recibidos sean fáciles de reconocer y clasificar',
        'Prueba en iPhone y Android, porque las aplicaciones de mensajes pueden tratar los enlaces SMS de forma distinta'
      ],
      faqs: [
        { q: '¿El mensaje se envía automáticamente?', a: 'No. El mensaje aparece en la aplicación de mensajes y la persona debe pulsar enviar.' },
        { q: '¿Funciona en iPhone y Android?', a: 'La mayoría de los teléfonos actuales lo admiten, pero el comportamiento puede variar según el dispositivo y la aplicación de escaneo. Prueba siempre tu código en los teléfonos que usa tu público.' },
        { q: '¿Puedo incluir un mensaje?', a: 'Sí. Puedes dejar escrito un mensaje breve. Mantenlo corto para que el código siga siendo sencillo de escanear.' }
      ]
    },
    copy: {
      heading: 'Inicia un mensaje de texto con un escaneo',
      body: 'Un código QR de SMS guarda un número de teléfono y un mensaje opcional. Al escanearlo, el teléfono abre un mensaje nuevo dirigido a ese número. Funciona bien para solicitudes de reserva, inscripciones a eventos y respuestas de clientes en materiales impresos.',
      steps: ['Introduce el número de teléfono con su prefijo de país.', 'Escribe el mensaje breve que quieres precargado.', 'Escanéalo en iPhone y Android para confirmarlo y descárgalo.'],
      tip: 'Pueden aplicarse las tarifas habituales de mensajería a quien envía, así que menciónalo donde importe.'
    }
  },

  instagram: {
    label: 'QR de Instagram',
    meta: {
      title: 'Generador de Código QR de Instagram Gratis | Enlace al Perfil | QR GENIUS',
      description: 'Crea un código QR de Instagram que abre tu perfil. Escribe tu @usuario, personaliza colores y logotipo y descárgalo para imprimir.',
      keywords: 'generador qr de instagram, qr perfil instagram, sigueme qr, qr instagram gratis',
      h1: 'Generador de Códigos QR de Instagram'
    },
    page: {
      badge: 'Consigue Seguidores',
      title: 'Generador de Códigos QR de Instagram Gratis',
      subtitle: 'Convierte tu nombre de usuario de Instagram en un código QR que abre tu perfil. Añádelo a tarjetas de visita, envases, menús y carteles de eventos.',
      benefits: [
        'Escribe tu @usuario o el enlace completo del perfil y el código abrirá ese perfil',
        'Facilita que los clientes te encuentren y te sigan desde materiales impresos',
        'Añade los colores o el logotipo de tu marca en el estudio completo',
        'Un código estático que abre directamente el enlace web'
      ],
      faqs: [
        { q: '¿Escribo mi @ o el enlace completo?', a: 'Sirven ambos. Escribe tu usuario con o sin @, o pega el enlace completo del perfil de Instagram.' },
        { q: '¿Y si cambio mi nombre de usuario?', a: 'El código apunta a la dirección de perfil que se introdujo, así que un usuario nuevo implica un código nuevo.' },
        { q: '¿Es una herramienta oficial de Instagram?', a: 'No. QR GENIUS es una herramienta independiente, sin afiliación ni respaldo de Instagram.' }
      ]
    },
    copy: {
      heading: 'Lleva a la gente directamente a tu perfil',
      body: 'Un código QR de Instagram codifica el enlace de tu perfil, de modo que cualquiera puede abrirlo escaneando en lugar de buscar tu nombre. Es útil para tiendas, creadores y eventos donde la gente está delante de tu material impreso.',
      steps: ['Escribe tu usuario o pega el enlace de tu perfil.', 'Revisa el código y escanéalo para confirmar que se abre el perfil correcto.', 'Personaliza el estilo si quieres y descárgalo.'],
      tip: 'Mantén un contraste marcado entre el código y el fondo para que se escanee bien en envases y carteles.'
    }
  },

  facebook: {
    label: 'QR de Facebook',
    meta: {
      title: 'Código QR de Facebook Gratis | Página o Perfil | QR GENIUS',
      description: 'Crea un código QR de Facebook que abre tu página o perfil. Escribe el nombre de la página o el enlace, personalízalo y descárgalo para imprimir.',
      keywords: 'generador qr de facebook, qr pagina de facebook, siguenos en facebook qr, qr facebook gratis',
      h1: 'Generador de Códigos QR de Facebook'
    },
    page: {
      badge: 'Conecta en Facebook',
      title: 'Generador de Códigos QR de Facebook Gratis',
      subtitle: 'Crea un código QR que abre tu página o tu perfil de Facebook. Genial para negocios locales, eventos, grupos y publicidad impresa.',
      benefits: [
        'Escribe el nombre de tu página o pega su enlace completo',
        'Ayuda a los clientes a encontrar tu página sin teclear ni buscar',
        'Acompáñalo con una llamada a la acción como «Escanea y síguenos» en folletos y carteles',
        'Descarga archivos de alta resolución para pósters, banners y envases'
      ],
      faqs: [
        { q: '¿Puedo enlazar un grupo o evento de Facebook?', a: 'Sí. Pega en el campo el enlace completo del grupo, evento o página y el código lo abrirá.' },
        { q: '¿Qué debo escribir para una página?', a: 'Escribe el nombre de la página tal como aparece en su dirección de Facebook, o pega el enlace completo para mayor seguridad.' },
        { q: '¿Esta herramienta está afiliada a Facebook?', a: 'No. QR GENIUS es una herramienta independiente, sin afiliación ni respaldo de Facebook ni de Meta.' }
      ]
    },
    copy: {
      heading: 'Conecta tus materiales impresos con tu página de Facebook',
      body: 'Un código QR de Facebook guarda la dirección web de tu página, grupo, evento o perfil. Al escanearlo, abre esa dirección en la aplicación de Facebook o en el navegador. Es un puente sencillo entre un cartel o un escaparate y tu comunidad en línea.',
      steps: ['Escribe el nombre de la página o pega el enlace completo de Facebook.', 'Escanea la vista previa para confirmar que se abre la página correcta.', 'Descarga el código y colócalo en tus materiales.'],
      tip: 'Pegar el enlace completo es la forma más fiable de apuntar a grupos y eventos.'
    }
  },

  youtube: {
    label: 'QR de YouTube',
    meta: {
      title: 'Código QR de YouTube Gratis | Vídeo o Canal | QR GENIUS',
      description: 'Crea un código QR de YouTube que abre un vídeo o un canal. Pega un enlace o @canal, personalízalo y descárgalo para imprimir o para presentaciones.',
      keywords: 'generador qr de youtube, qr de video, qr canal de youtube, escanear para ver un video',
      h1: 'Generador de Códigos QR de YouTube'
    },
    page: {
      badge: 'Comparte tus Vídeos',
      title: 'Generador de Códigos QR de YouTube Gratis',
      subtitle: 'Convierte el enlace de un vídeo, una lista de reproducción o un canal de YouTube en un código QR. Perfecto para presentaciones, manuales de producto, aulas y carteles de eventos.',
      benefits: [
        'Pega el enlace de un vídeo o lista de reproducción, o escribe @canal para enlazar un canal',
        'Permite ver un tutorial o una demostración directamente desde un manual impreso o un envase',
        'Úsalo en diapositivas y aulas para que el público abra el vídeo en su propio teléfono',
        'Descarga SVG o PNG para imprimir y para presentaciones'
      ],
      faqs: [
        { q: '¿A qué puedo enlazar?', a: 'A un vídeo, una lista de reproducción o un canal. Pega el enlace completo o escribe un identificador de canal que empiece por @.' },
        { q: '¿Puedo escribir solo el identificador del vídeo?', a: 'Sí. Si introduces solo el identificador de un vídeo, el código enlaza a ese vídeo.' },
        { q: '¿Es un producto de YouTube?', a: 'No. QR GENIUS es una herramienta independiente, sin afiliación ni respaldo de YouTube ni de Google.' }
      ]
    },
    copy: {
      heading: 'Abre un vídeo con un escaneo',
      body: 'Un código QR de YouTube guarda el enlace de un vídeo, una lista de reproducción o un canal. Al escanearlo se abre YouTube en el teléfono del espectador, que se ahorra teclear una dirección larga. Es práctico para hojas de instrucciones, envases, presentaciones y carteles de eventos.',
      steps: ['Pega un enlace de YouTube o escribe un identificador de canal como @tucanal.', 'Escanea la vista previa para comprobar que se abre el vídeo o canal correcto.', 'Descarga el código para tus diapositivas, para imprimir o para envases.'],
      tip: 'Enlaza a un vídeo que controles y pienses mantener en línea, porque un vídeo eliminado deja el código inservible.'
    }
  },

  maps: {
    label: 'QR de Google Maps',
    meta: {
      title: 'Generador de Código QR de Google Maps Gratis | Ubicación | QR GENIUS',
      description: 'Crea un código QR que abre un lugar en Google Maps a partir de una dirección o de coordenadas. Gratis, privado y listo para imprimir.',
      keywords: 'qr google maps, generador qr de ubicacion, qr de direccion, coordenadas gps qr',
      h1: 'Generador de Códigos QR de Ubicación de Google Maps'
    },
    page: {
      badge: 'Comparte una Ubicación',
      title: 'Generador de Códigos QR de Google Maps Gratis',
      subtitle: 'Convierte una dirección o unas coordenadas GPS en un código QR que abre la ubicación en Google Maps. Ideal para tiendas, locales, invitaciones y carteles de eventos.',
      benefits: [
        'Introduce una dirección postal o coordenadas de latitud y longitud',
        'Al escanear se abre el lugar en Google Maps para obtener indicaciones',
        'Útil en invitaciones, folletos, escaparates e instrucciones de entrega',
        'Un código estático sin caducidad, mientras el enlace del mapa siga funcionando'
      ],
      faqs: [
        { q: '¿Uso una dirección o coordenadas?', a: 'Usa una dirección para tiendas y locales. Usa coordenadas para lugares sin dirección clara, como el inicio de un sendero o un aparcamiento.' },
        { q: '¿El código abre Google Maps?', a: 'Sí. Abre un enlace de Google Maps, en la aplicación de Maps o en el navegador según el teléfono.' },
        { q: '¿Cómo encuentro las coordenadas?', a: 'En Google Maps, haz clic derecho en un punto desde el ordenador, o mantén pulsado en el móvil, para ver su latitud y longitud. Introdúcelas en formato decimal.' }
      ]
    },
    copy: {
      heading: 'Lleva a la gente al lugar correcto',
      body: 'Un código QR de ubicación guarda un enlace de Google Maps creado a partir de tu dirección o tus coordenadas. Al escanearlo se abre el mapa para ver el lugar y empezar la navegación. Es útil para invitaciones a eventos, folletos de tiendas y cualquier sitio donde resulte difícil encontrarte.',
      steps: ['Elige dirección o coordenadas e introduce la ubicación.', 'Escanea la vista previa para confirmar que se abre el lugar correcto.', 'Descarga el código y añádelo a tus materiales.'],
      tip: 'Comprueba el marcador en el mapa antes de imprimir, sobre todo si la dirección existe en más de una ciudad.'
    }
  }
};
