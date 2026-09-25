import { en, type DictValue } from "./dict.en";

export type Dict = DictValue<typeof en>;

export const es: Dict = {
  meta: {
    locale: "es_US",
    langName: "Español",
    switchTo: "English",
    switchAria: "Switch the site to English",
  },

  tagline: "Su casa, resuelta.",

  /**
   * La respuesta llana a "a qué se dedica esta empresa", en una frase y sin
   * lenguaje de marca. Todo lo de arriba se apoya en el eslogan, que es evocador
   * más que descriptivo: esta es la línea que tiene que entender alguien que
   * nunca oyó hablar de la empresa y solo está pasando la vista.
   */
  whatWeDo: {
    label: "A qué nos dedicamos",
    line:
      "Reparamos, mantenemos y mejoramos casas — la lista completa, desde una puerta que no cierra hasta repintar un piso. Una empresa, una cotización, un equipo.",
    /** La lectura más rápida posible de la oferta, como leyenda. */
    glanceTitle: "Seis cosas menos en su lista",
    glanceHint: "Señale una para ver qué cubre.",
  },

  /**
   * La home concisa.
   *
   * Objetivo medido: la página completa se lee en menos de 30 segundos. A ~200
   * palabras por minuto eso deja unas 200 palabras para TODA la página, etiquetas
   * y botones incluidos. La home larga llegaba a 1.411 palabras en 8.960px: unos
   * siete minutos de lectura, y por eso existe esto.
   *
   * La regla: la home RESPONDE, las páginas interiores EXPLICAN. Cada bloque que
   * hacía trabajo explicativo se movió a la página que le corresponde, y lo que
   * queda es la versión más corta y verdadera de cada idea.
   */
  concise: {
    /**
     * La respuesta propia del héroe a "a qué se dedica esta empresa": 9 palabras
     * donde la home larga gasta 24.
     *
     * Reemplaza a `whatWeDo.line` en esta página en vez de repetirla. La versión
     * larga dedica su segunda mitad a un ejemplo concreto ("desde una puerta que
     * no cierra hasta repintar un piso"), que vale sus palabras cuando el lector
     * se está instalando y no las vale en un héroe que tiene que entrar de un
     * vistazo. `whatWeDo.line` queda intacta para la home larga.
     */
    heroLine: "Reparaciones, mantenimiento y mejoras. Una lista, un precio, un equipo.",
    promise: "Cuatro promesas, en cada trabajo.",
    tilesTitle: "Qué hacemos",
    /**
     * "Toque o señale": el tratamiento de toda la página es usted (el héroe dice
     * "Su casa", los pasos dicen "Llame" y "Reciba"). La primera versión decía
     * "Señale" aquí y "Marque" más abajo, que junto a los posesivos formales
     * suenan a tú y rompen el registro en la misma pantalla.
     */
    tilesHint: "Toque o señale una para ver qué cubre.",
    tilesCta: "Servicios",
    stepsTitle: "Cómo funciona",
    stepsCta: "Proceso",
    faqTitle: "Preguntas frecuentes",
    faqAll: "Todas las preguntas",
    areasTitle: "Zonas",
    /**
     * "Ver mi dirección", no "Mi dirección". Al recortar las etiquetas se perdió
     * el verbo y quedó un rótulo de campo de formulario en el sitio donde va un
     * enlace: nada indicaba que se pudiera pulsar.
     */
    areasCta: "Ver mi dirección",
    pickerTitle: "¿Qué tiene pendiente?",
    /** "Indique", no "Marque": mismo registro que el resto de la página. */
    pickerHint: "Indique lo que necesita. Cotizamos toda la lista en un solo precio.",
    /*
     * El español sí necesita las dos formas. "seleccionados" es masculino plural
     * y el sustantivo al que se refiere (la lista) es femenino singular, así que
     * con una sola selección hay que decir "seleccionado". Y "Cotizar estos 1"
     * tiene el mismo problema: "estos" es masculino plural.
     */
    pickerSelected: "seleccionados",
    pickerSelectedOne: "seleccionado",
    pickerCta: "Cotizar estas {n}",
    pickerCtaOne: "Cotizar esta lista",
    pickerEmpty: "Cotizar mi lista",
    pickerClear: "Limpiar",
    closeBody: "Un precio por escrito. Sin compromiso y sin costo la conversación.",
    plateCaption: "Nuestra camioneta, nuestro equipo.",
    plateNote: "Camino a un trabajo",

    /**
     * El problema, dicho una vez. La home larga le dedicaba 138 palabras en tres
     * tarjetas; en una página que debe leerse en 30 segundos va una línea y tres
     * etiquetas, porque el lector ya sabe que está cansado de perseguir gente: no
     * hace falta decírselo.
     */
    problem: "Lo difícil es encontrar a alguien confiable. No encontrar a alguien.",
    problemTags: ["Nadie contesta", "Nadie llega", "Usted termina coordinando"],

    /** Tres pasos, no cinco. Los pasos 2 y 5 de la versión larga eran detalle. */
    steps: [
      { n: "1", title: "Mande la lista", body: "Llame o mande el formulario. Las fotos ayudan." },
      { n: "2", title: "Reciba un precio por escrito", body: "Fijo, antes de empezar nada." },
      { n: "3", title: "Llegamos y lo terminamos", body: "Después lo revisamos con usted." },
    ],

    /** Tres preguntas, respondidas en una línea. Las otras cinco viven en /contacto. */
    faq: [
      {
        q: "¿Cuánto cuesta?",
        a: "Ejemplo — publique su costo de visita y el mínimo de trabajo.",
      },
      {
        q: "¿Están asegurados?",
        a: "Sí, y el trabajo con licencia va a un socio licenciado que traemos nosotros.",
      },
      {
        q: "¿Qué tan pronto pueden venir?",
        a: "Ejemplo — publique su tiempo de respuesta real.",
      },
    ],
  },

  nav: {
    home: "Inicio",
    services: "Servicios",
    areas: "Zonas de servicio",
    about: "Nosotros",
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
    call: "Llamar ahora",
    quote: "Solicitar cotización",
    skip: "Ir al contenido principal",
  },

  common: {
    inHouse: "Equipo propio",
    partner: "Socio licenciado",
    included: "Qué incluye",
    scope: "Alcance típico",
    notIncluded: "Qué no hacemos",
    learnMore: "Ver la lista completa",
    allServices: "Todos los servicios",
    backHome: "Volver al inicio",
    placeholderNote: "Dato de ejemplo — reemplazar antes de publicar",
    syntheticNote: "Ejemplo ilustrativo",
    required: "Obligatorio",
    optional: "Opcional",
  },

  hero: {
    title: "Su casa,\nresuelta.",
    sub: "Una empresa. Un estándar. Un solo contacto.",
    body:
      "HandyMan gestiona proyectos pequeños y medianos con un equipo propio calificado y socios de oficio licenciados cuando la ley lo exige. Usted contrata a HandyMan, no a un trabajador suelto. Nosotros agendamos, cotizamos el precio y respondemos por el resultado.",
    ctaPrimary: "Solicitar cotización",
    ctaSecondary: "Ver qué hacemos",
    ticketTitle: "Orden de trabajo",
    ticketNo: "No. HM-1042",
    ticketFields: [
      ["Cliente", "R. Álvarez"],
      ["Propiedad", "Casa unifamiliar, 171 m²"],
      ["Solicitado", "6 pendientes"],
      ["Estado", "Cotización aprobada"],
      ["Llegada", "Mar, 8:00 – 10:00 AM"],
    ] as const,
    /** La fila de Estado se dibuja como un tablero mecánico. */
    ticketStatus: "Cotización aprobada",
    /** Los estados por los que pasa un trabajo. */
    ticketStatusCycle: [
      "Cotización aprobada",
      "Agendado",
      "Equipo en sitio",
      "Terminado",
      "Garantía activa",
    ] as const,
    /**
     * Los mismos estados, cortos, para cuando la fila es estrecha.
     * Son más cortos que los ingleses a propósito: el español ocupa más y en un
     * contenedor de 240px es preferible un estado breve a tipografía diminuta.
     * La fila de Estado nunca baja de la escala del campo.
     */
    ticketStatusCycleShort: [
      "Aprobada",
      "Agendado",
      "En sitio",
      "Terminado",
      "Garantía",
    ] as const,
    ticketStamp: "Aprobado",
  },

  problem: {
    title: "Encontrar a alguien\nno es lo difícil.",
    body:
      "Los propietarios están cansados de llamar a varios contratistas, esperar a quien nunca llega y lidiar con personas distintas por cada reparación pequeña. El problema no es encontrar a alguien que pueda hacer el trabajo. Es encontrar a alguien lo bastante confiable para contestar, llegar y responder por lo hecho.",
    alt: [
      {
        label: "Llamar y llamar",
        title: "Seis llamadas, cuatro buzones",
        body:
          "Cada oficio es otro número, otro horario y otra versión de cuándo pueden pasar.",
      },
      {
        label: "Esperar",
        title: "El jueves se vuelve nunca",
        body:
          "Prometen una hora, la mueven, y después desaparece sin avisar. Nadie llama para decirlo.",
      },
      {
        label: "Coordinar",
        title: "Usted termina siendo el contratista general",
        body:
          "Persiguiendo a tres personas, comparando tres precios y sosteniendo toda la lista usted mismo.",
      },
    ],
    close:
      "Ese trabajo es el que le quitamos de encima. Una empresa contesta, una empresa llega, una empresa responde por el resultado.",
  },

  solution: {
    title: "Una empresa se hace\ncargo de toda la lista.",
    body:
      "HandyMan gestiona proyectos pequeños y medianos mediante técnicos propios calificados y socios de oficio licenciados cuando se requieren. El cliente contrata a HandyMan, no a un trabajador individual. Agendamos el trabajo, comunicamos el precio y respondemos por el resultado.",
    points: [
      {
        title: "Equipo calificado",
        body:
          "Técnicos verificados y asegurados en nuestra propia nómina, no un desfile de subcontratistas.",
      },
      {
        title: "Licenciado cuando corresponde",
        body:
          "Sabemos cuándo un trabajo exige legalmente un especialista licenciado, y lo traemos en vez de improvisar.",
      },
      {
        title: "Una sola empresa responsable",
        body:
          "Una cotización, un calendario y un número al que llamar si algo hay que corregir.",
      },
    ],
  },

  promise: {
    title: "Cuatro cosas, en cada trabajo.",
    body: "Es el estándar que mantenemos. No cambia según el tamaño del trabajo.",
    items: [
      { n: "01", title: "Contestamos", body: "Comunicación clara y con respuesta." },
      { n: "02", title: "Llegamos", body: "Agenda confiable y avisos de cambio." },
      { n: "03", title: "Cotizamos primero", body: "Precio aprobado antes de empezar." },
      { n: "04", title: "Respondemos por ello", body: "Calidad constante y respaldo real." },
    ],
  },

  services: {
    title: "De qué nos\nencargamos.",
    body:
      "Seis categorías, y entre todas cubren la lista completa: las reparaciones pequeñas, los proyectos que lleva meses posponiendo y el trabajo de temporada que mantiene una casa adelantada. Agrupado por lo que usted necesita resolver, no por el oficio que tengamos que llamar.",
    cta: "Solicitar cotización",
    boundaryTitle: "Dónde está la línea",
    boundaryBody:
      "Algunos trabajos exigen legalmente un oficio licenciado. Se lo decimos antes de que apruebe nada, y nosotros traemos al socio licenciado para que siga teniendo un solo contacto.",
    /**
     * Los recuadros de la home concisa usan `short`, no `name`: son seis en una
     * fila y el nombre completo no cabe. Pero la primera versión de estos
     * `short` recortaba justo los calificativos que limitan el alcance, y eso no
     * es una abreviatura, es otra promesa:
     *
     *   · "Plomería y luz" perdía "(alcance de handyman)", que es lo único en el
     *     recuadro que dice que no se hacen paneles ni gas.
     *   · "Seguridad" perdía "y accesibilidad", así que un lector hispanohablante
     *     nunca se enteraba de que la empresa hace trabajo de accesibilidad —
     *     una línea de negocio completa que desaparecía solo en español.
     *
     * Los `name` completos siguen siendo la etiqueta de la casilla del
     * formulario y los títulos de la página de servicios; estos son la versión
     * corta que conserva el alcance. Los tres últimos sí pueden abreviarse sin
     * perder nada.
     */
    categories: [
      {
        id: "repairs",
        name: "Reparaciones del día a día",
        short: "Reparaciones del día a día",
        covers:
          "La lista que va creciendo: puertas, tablaroca, sellado, repisas, mosquiteros — resuelta en una visita en vez de en seis.",
        blurb:
          "La lista que va creciendo. Trabajos pequeños que por sí solos no justifican un especialista, resueltos en una visita.",
        inHouse: true,
        items: [
          "Puertas que rozan, arrastran o no cierran",
          "Parches y huecos en tablaroca",
          "Sellado de tinas, lavabos y duchas",
          "Repisas, soportes y espejos pesados",
          "Armado y montaje de muebles",
          "Burletes y sellado de corrientes de aire",
          "Herrajes de gabinetes, bisagras y rieles",
          "Mosquiteros y herrajes de ventanas",
        ],
        boundary: [],
      },
      {
        id: "plumbing-electrical",
        name: "Plomería y electricidad (alcance de handyman)",
        short: "Plomería y luz (alcance handyman)",
        covers:
          "Llaves, inodoros, trituradores, lámparas, apagadores y contactos — lo que un handyman puede hacer legalmente. Lo que pasa de esa línea va a un socio licenciado que traemos nosotros.",
        blurb:
          "Lo que un handyman puede hacer legalmente, bien hecho. Lo que pasa de esa línea va a un socio licenciado: se lo decimos cuál, y nosotros lo agendamos.",
        inHouse: true,
        items: [
          "Cambio de llaves, regaderas y asientos de inodoro",
          "Cambio de triturador de basura (mismo circuito)",
          "Reparación de válvulas de llenado y descarga",
          "Destape de drenajes lentos y limpieza de sifones",
          "Cambio de lámparas y ventiladores de techo (cableado existente)",
          "Cambio de contactos, apagadores y tapas",
          "Iluminación bajo gabinete o de clóset (enchufe o circuito existente)",
          "Cambio de contactos GFCI",
        ],
        boundary: [
          "Circuitos nuevos, tableros o ampliación de servicio — electricista licenciado",
          "Calentadores de agua, líneas de gas o mover tomas y drenajes — plomero licenciado",
        ],
      },
      {
        id: "carpentry",
        name: "Carpintería y puertas",
        short: "Carpintería",
        covers:
          "Puertas colgadas y recolocadas, molduras, zócalos, clósets, tablones de terraza — medido, ajustado y terminado en sitio.",
        blurb:
          "Puertas, molduras y la madera que hace que una casa se sienta cuidada. Medido, ajustado y terminado en sitio.",
        inHouse: true,
        items: [
          "Cambio y recolocación de puertas interiores",
          "Instalación de molduras en puertas y ventanas",
          "Zócalos y remates",
          "Sistemas de repisas y tubos de clóset",
          "Ajuste de barandales y pasamanos",
          "Reparación de pudrición en molduras exteriores",
          "Reparación de tablones y barandales de terraza",
          "Repisas empotradas y carpintería sencilla",
        ],
        boundary: [
          "Cambios en muros de carga o estructura — ingeniero licenciado y permiso",
        ],
      },
      {
        id: "paint",
        name: "Pintura y acabado de muros",
        short: "Pintura",
        covers:
          "Pintura interior y exterior, resane de tablaroca antes de pintar, y la preparación que decide si el trabajo dura.",
        blurb:
          "Pintura interior y exterior con la preparación hecha primero, porque la preparación es lo que hace que un trabajo dure.",
        inHouse: true,
        items: [
          "Pintura de muros, plafones y molduras interiores",
          "Repintado de un cuarto o de un piso completo",
          "Reparación y resane de tablaroca antes de pintar",
          "Sellador y bloqueo de manchas",
          "Pintura de siding, puertas y postigos exteriores",
          "Lavado y retintado de terrazas de madera",
          "Sellado de pisos de cochera y sótanos",
          "Retiro de papel tapiz",
        ],
        boundary: [],
      },
      {
        id: "exterior",
        name: "Exterior y temporada",
        short: "Exterior y temporada",
        covers:
          "Canaletas, lavado a presión, cercas, preparación de tormentas e invernalización — agendado en bloques mientras el clima aguanta.",
        blurb:
          "El trabajo que mantiene el agua afuera y la casa adelantada a la temporada. Se agenda en bloques mientras el clima aguanta.",
        inHouse: true,
        items: [
          "Limpieza, resellado y mallas de canaletas",
          "Lavado a presión — siding, terraza, cochera, andadores",
          "Reparación de cercas y alineación de portones",
          "Montaje de buzón, números de casa y luminarias exteriores",
          "Revisión previa a tormentas e invernalización",
          "Retiro de hojas y escombro de temporada",
          "Resane menor de techo y sellado de flashing (pendientes transitables)",
          "Revisión de riego y tomas de manguera",
        ],
        boundary: [
          "Techos inclinados o de más de un nivel — contratista de techos licenciado",
          "Retiro de árboles o trabajo cerca de líneas eléctricas — arborista licenciado o la utility",
        ],
      },
      {
        id: "safety",
        name: "Seguridad y accesibilidad",
        short: "Seguridad y accesibilidad",
        covers:
          "Barras de apoyo ancladas a postes, pasamanos, bandas antiderrapantes y cambio de detectores — instalaciones pequeñas que hacen una casa más segura para vivir.",
        blurb:
          "Instalaciones pequeñas que hacen una casa más segura para quien vive en ella. Muchas veces es la razón por la que alguien nos llama.",
        inHouse: true,
        items: [
          "Barras de apoyo ancladas a postes o refuerzos",
          "Pasamanos para escalones y pasillos",
          "Bandas antiderrapantes en escalones",
          "Actualizaciones de seguridad en baños",
          "Anclaje de gabinetes y muebles para niños",
          "Cambio de detectores de humo y CO",
          "Iluminación con sensor y nocturna en accesos",
          "Rampas de umbral y despeje de puertas",
        ],
        boundary: [],
      },
    ],
    licensedTitle: "Cuándo traemos un especialista licenciado",
    licensedBody:
      "Cada estado traza esta línea distinto, y algunos trabajos requieren permiso sin importar quién los haga. Estos son los que normalmente canalizamos a un socio licenciado: usted sigue teniendo una cotización y un solo contacto.",
    licensedItems: [
      {
        name: "Electricidad más allá de cambiar luminarias",
        body: "Circuitos nuevos, cambio de tableros, ampliación de servicio y todo lo que requiera permiso eléctrico.",
        who: "Electricista licenciado",
      },
      {
        name: "Plomería más allá de cambiar accesorios",
        body: "Calentadores de agua, líneas de gas, repiping y mover tomas o drenajes.",
        who: "Plomero licenciado",
      },
      {
        name: "HVAC (clima)",
        body: "Calefacción, aire acondicionado, líneas de refrigerante y ductos. Nosotros coordinamos; el trabajo lo realiza un contratista HVAC licenciado.",
        who: "Contratista HVAC licenciado",
      },
      {
        name: "Techos con pendiente pronunciada",
        body: "Techos de varios niveles o inclinados, trabajo estructural y todo lo que requiera permiso de techado.",
        who: "Contratista de techos licenciado",
      },
      {
        name: "Asbesto, moho y plomo",
        body: "Remoción y saneamiento en casas construidas antes de 1978, o donde un análisis detecte un riesgo.",
        who: "Especialista certificado en remediación",
      },
      {
        name: "Cambios estructurales",
        body: "Retirar o modificar un muro de carga, trabajo de cimentación y ampliaciones.",
        who: "Ingeniero licenciado y permiso",
      },
    ],
  },

  process: {
    title: "Cinco pasos,\nsin sorpresas.",
    body:
      "Usted siempre sabe en qué paso va y qué sigue. Nada empieza hasta que apruebe el precio.",
    steps: [
      {
        n: "01",
        title: "Usted nos cuenta la lista",
        body:
          "Llame o mande el formulario con el detalle que tenga. Las fotos ayudan. Una descripción general basta para empezar.",
        meta: "Mismo día hábil",
      },
      {
        n: "02",
        title: "Revisamos el trabajo",
        body:
          "Vemos lo que realmente hay — en persona o por video para lo más pequeño — y confirmamos qué entra en el alcance.",
        meta: "Visita agendada",
      },
      {
        n: "03",
        title: "Recibe una cotización por escrito",
        body:
          "Conceptos, precio fijo y una nota clara sobre lo que necesite socio licenciado o permiso. Nada se aprueba hasta que usted lo apruebe.",
        meta: "Precio fijo",
      },
      {
        n: "04",
        title: "Agendamos y llegamos",
        body:
          "Recibe una ventana de llegada de dos horas y un aviso si algo se mueve. El equipo llega con los materiales del trabajo aprobado.",
        meta: "Ventana de 2 horas",
      },
      {
        n: "05",
        title: "Lo revisamos juntos",
        body:
          "Recorremos el trabajo terminado con usted antes de irnos, y la garantía de mano de obra empieza ese día. Si algo no quedó bien, regresamos.",
        meta: "1 año de mano de obra",
      },
    ],
  },

  compare: {
    title: "La diferencia es\nquién responde.",
    body:
      "No hay nada malo con un buen profesional independiente. El problema empieza cuando seis de ellos tienen cada uno un pedazo de su lista.",
    cols: ["", "HandyMan All-in-One", "Llamar a varios", "App de marketplace"],
    rows: [
      ["A quién contrata", "Una empresa", "Una persona distinta por oficio", "Quien acepte el trabajo"],
      ["Quién contesta", "Nuestra oficina, en horario", "Quien alcance el teléfono", "Una app, luego un desconocido"],
      ["Precio", "Fijo y aprobado antes", "Verbal y suele cambiar", "Por hora, lo pone el trabajador"],
      ["Agenda", "Ventana de 2 horas por escrito", "Un día, quizá", "Un horario que se reasigna"],
      ["Seguimiento", "Regresamos — garantía por escrito", "Usted vuelve a llamar", "Un ticket de soporte"],
      ["Trabajo licenciado", "Nosotros traemos al socio", "No es su problema", "Depende del trabajador"],
    ],
  },

  areas: {
    title: "Dónde trabajamos.",
    body:
      "Mantenemos un radio corto a propósito. Traslados cortos significan que el equipo llega cuando dijimos y puede volver la misma semana si algo necesita una segunda revisión.",
    findTitle: "¿No sabe si está en la zona?",
    findBody: "Llame o mande el formulario con su código postal y se lo decimos de inmediato.",
    cta: "Consultar mi dirección",
    listTitle: "Ciudades que cubrimos",
    note: "Lista de cobertura de ejemplo — reemplazar por la zona real antes de publicar.",
  },

  about: {
    title: "Construido sobre\nuna idea simple.",
    body:
      "HandyMan All-in-One es una empresa de reparación y mantenimiento del hogar construida sobre una idea simple: un propietario debería necesitar una sola empresa de confianza para cuidar toda su casa. Desde reparaciones cotidianas hasta proyectos de temporada, coordinamos a los profesionales correctos y respondemos de principio a fin.",
    missionLabel: "Misión",
    mission:
      "Hacer simple la reparación del hogar entregando servicio confiable, precios claros y trabajo de calidad, hecho por personas que confiaríamos en nuestras propias casas.",
    visionLabel: "Visión",
    vision: "Ser la empresa de servicios integrales para el hogar más confiable de Estados Unidos.",
    positioningLabel: "Posicionamiento",
    positioning:
      "El equipo de confianza para cada proyecto del hogar. HandyMan combina la comodidad de un handyman local con la confiabilidad, organización y responsabilidad de una empresa profesional de servicios para el hogar.",
    valuesLabel: "Valores",
    values: [
      {
        name: "Confiabilidad",
        body: "Hacemos lo que decimos.",
        detail:
          "Si prometemos una ventana, la cumplimos. Si algo cambia, se entera por nosotros antes de tener que preguntar.",
      },
      {
        name: "Transparencia",
        body: "Sin costos ocultos ni sorpresas.",
        detail:
          "Una cotización por escrito con conceptos. Si el alcance cambia al abrir un muro, paramos y recotizamos antes de seguir.",
      },
      {
        name: "Cuidado",
        body: "Respetamos cada casa como si fuera la nuestra.",
        detail:
          "Mantas en el piso, zapatos fuera, herramientas recogidas y el espacio más limpio de como lo encontramos.",
      },
      {
        name: "Responsabilidad",
        body: "Sabemos cuándo se requiere un especialista licenciado.",
        detail:
          "Y lo decimos antes de que apruebe el trabajo, no después de que algo salga mal.",
      },
    ],
    standardLabel: "El estándar que sostenemos",
    standard: [
      "Cada técnico pasa verificación de antecedentes, está asegurado y en nuestra nómina.",
      "Cada trabajo empieza con un precio por escrito aprobado.",
      "Cada trabajo termina con un recorrido final y garantía de mano de obra.",
      "Ningún trabajo se subcontrata a sus espaldas. Si traemos un socio licenciado, le decimos quién y por qué.",
    ],
  },

  faq: {
    title: "Respuestas directas.",
    items: [
      {
        q: "¿Qué cuenta como proyecto pequeño o mediano?",
        a: "Desde una puerta que no cierra hasta un proyecto de varios días en varios cuartos: repintar un piso, cambiar puertas interiores, reparar molduras exteriores o resolver una lista de veinte detalles en pocas visitas. Si un trabajo necesita contratista general, permiso u oficio licenciado, se lo decimos al cotizar y traemos al socio correcto.",
      },
      {
        q: "¿Cobran la cotización?",
        a: "Respuesta de ejemplo — defina aquí su política real. Muchas empresas cotizan gratis listas pequeñas y cobran visita para estimados grandes en sitio, acreditándolo al trabajo si aprueba. Sea cual sea su decisión, dígalo claro: es la primera pregunta que hace un cliente.",
      },
      {
        q: "¿Qué tan pronto pueden venir?",
        a: "Respuesta de ejemplo — indique su tiempo de respuesta real. La promesa de marca es 'contestamos', así que lo que comprometa aquí tiene que sostenerse en su semana más ocupada, no en la más tranquila.",
      },
      {
        q: "¿Están licenciados y asegurados?",
        a: "Contamos con seguro de responsabilidad general y nuestros técnicos están cubiertos. El trabajo que exige legalmente licencia de oficio lo realiza un socio licenciado, y le decimos cuáles son esos trabajos antes de que apruebe nada. Reemplace esta respuesta con su número de licencia y límites de cobertura reales antes de publicar.",
      },
      {
        q: "¿Y si no me gusta el trabajo?",
        a: "Díganos. La mano de obra está cubierta un año y regresamos a corregir. Recorremos cada trabajo terminado con usted antes de recoger, porque es mucho más fácil arreglar algo mientras seguimos ahí.",
      },
      {
        q: "¿Pueden trabajar cuando no estoy en casa?",
        a: "Sí, en la mayoría de los trabajos. Confirmamos el alcance por escrito primero y le llamamos antes de salir. Para cualquier acceso sin usted presente acordamos el método con antelación.",
      },
      {
        q: "¿Ustedes tramitan el permiso?",
        a: "Para trabajos que requieren permiso, el socio licenciado lo tramita y nosotros coordinamos el calendario para que usted no ande persiguiendo papeles. Ejemplo — confirme cómo maneja el costo de permisos en su mercado.",
      },
      {
        q: "¿Ustedes traen los materiales?",
        a: "Traemos consumibles estándar: silicón, fijaciones, resane, mantas. La pintura, accesorios y herrajes los incluimos como concepto en la cotización o trabajamos con lo que usted ya compró. Usted elige, y queda escrito en la cotización.",
      },
    ],
  },

  cta: {
    title: "Cuéntenos qué\ntiene pendiente.",
    body:
      "Mándelo y le respondemos con una cotización por escrito. Sin compromiso, sin presión y sin costo por la conversación.",
    primary: "Solicitar cotización",
    secondary: "Llamar al {phone}",
    bullets: [
      "Respuesta el mismo día hábil",
      "Un precio fijo por escrito",
      "Nosotros gestionamos al socio licenciado",
      "1 año de garantía de mano de obra",
    ],
  },

  contact: {
    title: "Empiece su lista.",
    body:
      "Cuanto más nos cuente, más precisa será la cotización. Fotos y una descripción general bastan para arrancar.",
    formTitle: "Solicitud de trabajo",
    formNo: "Formulario HM-1",
    fields: {
      name: "Nombre",
      namePh: "Nombre y apellido",
      phone: "Teléfono",
      phonePh: "(555) 000-0000",
      email: "Correo",
      emailPh: "usted@ejemplo.com",
      address: "Dirección de la propiedad o código postal",
      addressPh: "1420 Workshop Ave, o 00000",
      services: "¿Qué necesita?",
      servicesHint: "Marque todo lo que aplique.",
      urgency: "¿Para cuándo?",
      urgencyOptions: ["Lo antes posible", "En dos semanas", "Este mes", "Solo estoy planeando"],
      details: "Describa el trabajo",
      detailsPh:
        "Dos puertas que no cierran, un drenaje lento en el baño y el pasillo necesita pintura. Con gusto mando fotos.",
      contactPref: "Mejor forma de contactarle",
      contactPrefOptions: ["Llamada", "Mensaje de texto", "Correo"],
      consent:
        "Acepto que me contacten por esta solicitud. No vendemos ni compartimos sus datos.",
      submit: "Enviar solicitud",
      submitting: "Enviando…",
    },
    successTitle: "Solicitud recibida.",
    successBody:
      "Ya tenemos su lista. Alguien de la oficina le contactará el mismo día hábil para confirmar los detalles y agendar una visita.",
    successRef: "Referencia",
    successAgain: "Enviar otra solicitud",
    errorTitle: "No se pudo enviar.",
    errorBody:
      "Algo falló de nuestro lado. Intente de nuevo o llámenos directamente: preferimos saber de usted que perder el trabajo.",
    asideTitle: "O simplemente llame",
    asideBody:
      "Una persona real contesta en horario laboral. Si no alcanzamos, devolvemos la llamada el mismo día.",
    hoursTitle: "Horario",
    areasTitle: "Zona de servicio",
    areasBody: "Cubrimos estas ciudades y sus alrededores:",
  },

  /**
   * El pie.
   *
   * No lleva reseña ni segundo eslogan. Los dos estaban aquí y los dos eran
   * repeticiones: la reseña repetía casi palabra por palabra la línea del héroe, y
   * el eslogan aparecía por tercera vez al final de la página en un sitio cuyo
   * logotipo ya lo dice. Quitarlos restó 15 palabras a cada una de las 13 rutas
   * sin eliminar un solo dato, y el pie conserva todos sus enlaces, dirección,
   * horario y avisos.
   */
  footer: {
    servicesTitle: "Servicios",
    companyTitle: "Empresa",
    contactTitle: "Contacto",
    hoursTitle: "Horario",
    areasTitle: "Zonas",
    rights: "Todos los derechos reservados.",
    placeholder:
      "Datos por reemplazar antes de publicar: teléfono, correo, dirección, zonas de servicio, horario, número de licencia y toda cifra marcada en este sitio.",
  },

  notFound: {
    code: "404",
    title: "Nada en esta orden.",
    body: "Esa página no está aquí. La lista de pendientes, en cambio, sigue donde la dejó.",
    cta: "Volver al inicio",
  },

  legal: {
    title: "Legal",
    body: "Ejemplo — agregue su aviso de privacidad y términos antes de publicar.",
  },
};
