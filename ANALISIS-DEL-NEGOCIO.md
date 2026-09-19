# HandyMan All-in-One — análisis del negocio y del brand book

Documento de trabajo. Cubre qué tipo de negocio es, qué vende realmente, cómo está
construida su marca, qué encontré al revisar el brand book, y qué decisiones tomé en el
sitio.

---

## 1. Qué tipo de negocio es

**HandyMan All-in-One es una empresa de servicios para el hogar con modelo de
responsabilidad única** (*single-accountable-provider*), no un marketplace, no un
directorio de leads y no una plataforma de gig workers.

La distinción importa y el brand book la dice de forma explícita en la página 7:

> "The customer hires HandyMan — not an individual worker."

Eso define la categoría entera. El negocio no vende horas de mano de obra: vende
**responsabilidad**. Es un negocio de servicios con coordinación de oficios, donde la
empresa:

1. recibe la lista completa de trabajos del cliente,
2. cotiza un precio fijo por escrito,
3. agenda y despacha su propio equipo,
4. trae un socio licenciado cuando la ley lo exige,
5. y responde por el resultado con garantía.

**Clasificación operativa**

| Dimensión | Posición |
|---|---|
| Sector | Home services / home repair & maintenance |
| Modelo | Servicio directo (B2C), con cuenta comercial secundaria (property managers) |
| Ticket | Bajo a medio, alto volumen; ticket medio-alto cuando se agrupan varios trabajos |
| Fuerza de trabajo | Técnicos propios en nómina + socios de oficio licenciados bajo demanda |
| Alcance | Proyectos pequeños y medianos (small-to-mid-sized) |
| Mercado | Estados Unidos |
| Geografía | Radio local controlado, no cobertura nacional |

**A quién le vende y contra qué compite**

El cliente primario es el propietario de una casa unifamiliar, de 35 a 65 años, que
trabaja tiempo completo y tiene entre seis y veinte trabajos acumulados. No es
especialmente hábil con las manos y no quiere convertirse en project manager.

Su competencia real no son otras empresas de handyman. Son tres cosas:

1. **Contratistas independientes por oficio** — el cliente tiene que llamar a uno
   distinto por cada cosa.
2. **Marketplaces por app** — mandan a un desconocido y no responden por el trabajo.
3. **No hacer nada** — el propietario convive con la lista.

El brand book identifica esto con precisión en la página 6 y es la observación más
valiosa del documento:

> "The problem is not finding someone who can do the work. It is finding someone
> reliable enough to answer, arrive and stand behind it."

**El dolor dominante no es el precio, es la fiabilidad.** Un mensaje de marketing que
compita por precio está peleando la batalla equivocada. El sitio debía hablarle a la
fatiga de perseguir gente, no al bolsillo.

**La restricción estructural del negocio:** el trabajo que legalmente exige licencia de
oficio (electricidad más allá de cambiar una luminaria, plomería de gas, HVAC, techos
inclinados, asbesto, estructura) **no lo puede hacer la empresa con su propio equipo**.
El brand book lo convierte en un valor de marca — RESPONSIBILITY, "we know when a
licensed specialist is required" — en lugar de esconderlo. Eso es un acierto y lo llevé
al sitio como una sección explícita de alcance, porque además es lo que Protege al
cliente y a la empresa.

---

## 2. Qué vende la marca (la promesa)

La página 11 del brand book define la promesa en cuatro tiempos. Es el activo más
fuerte del documento y la columna vertebral del negocio:

| | Promesa | Significado operativo |
|---|---|---|
| 01 | **WE ANSWER** | Comunicación clara y con respuesta |
| 02 | **WE ARRIVE** | Agenda confiable y avisos de cambio |
| 03 | **WE QUOTE FIRST** | Precio aprobado antes de empezar |
| 04 | **WE STAND BEHIND IT** | Calidad constante y respaldo real |

Y la esencia de marca, página 5: **"Your home, handled." — One company. One standard.
One point of contact.**

**Lo que hace fuerte esta promesa:** cada uno de los cuatro tiempos es *verificable por
el cliente*. "Contestamos" se comprueba con una llamada. "Llegamos" se comprueba el día
de la cita. "Cotizamos primero" se comprueba con un papel firmado. "Respondemos por
ello" se comprueba si algo sale mal. No son adjetivos, son compromisos con fecha.

**Mi lectura estratégica:** el cuarto tiempo y la garantía de mano de obra son el
verdadero foso competitivo. Cualquiera puede prometer contestar el teléfono; sostener
una garantía durante un año exige caja, procesos y técnicos en nómina. Ahí es donde el
modelo "all-in-one" se defiende de un marketplace.

**Riesgo de la promesa:** el brand book no fija ningún número. Ninguna ventana de
llegada, ningún tiempo de respuesta, ningún plazo de garantía. En el sitio los puse como
compromisos declarados (`site.proof` en el código) y los marqué como reemplazables,
porque una promesa operativa sin número no es exigible y el cliente lo nota. **Hay que
decidir los números reales antes de publicar.**

---

## 3. Análisis del brand book

El documento tiene 21 páginas, está hecho en Adobe InDesign y se llama a sí mismo
"branding / brand book". Está bien construido en lo estratégico y quedó **incompleto en
lo visual**, que es lo importante para un sitio web.

### 3.1 Lo que está completo y es de alta calidad

- **Estrategia de marca (páginas 5–12).** Esencia, problema, solución,
  posicionamiento, misión, visión, promesa y valores. Redacción sobria, adulta, sin
  hipérbole. El problema está formulado mejor que en la mayoría de los briefs que se ven
  en esta categoría.
- **Dirección de arte (páginas 3, 14, 15).** Un mood board coherente y muy específico:
  radio de auto con cromo, teléfono público, un Walkman Sony sobre fondo verde, un
  tablero de ajedrez azul marino y crema, un televisor de época, un niño en bicicleta
  Schwinn, el letrero de un drive-in, un tablero de madera, una rocola, un ambientador
  de auto con el logo. Es **suburbana norteamericana de los años 50 y 60**: cálida,
  nostálgica, física, mid-century. Esto fija el mundo cultural de la marca y es un activo
  enorme, porque **no** es el default de la categoría (foto de stock de un señor sonriente
  con un taladro).
- **Paleta (página 19).** Cinco colores con rol y justificación cada uno, y con una
  instrucción de uso explícita.
- **Versiones del logo (páginas 17–18).** Lockup vertical y cuatro aplicaciones sobre
  distintos fondos.

### 3.2 Problemas y huecos que encontré

| # | Hallazgo | Impacto | Cómo lo resolví |
|---|---|---|---|
| 1 | **La tipografía no es usable en web.** El libro especifica Acumin Pro Condensed (Opción 1) o Lato (Opción 2). Ninguna dos es licenciable gratis para web. | Bloqueante para construir | Sustituí por equivalentes abiertos que conservan el carácter: **Oswald** (display condensada pesada), **Barlow Condensed** (etiquetas) y **Courier Prime** (texto) |
| 2 | **La página 13 ("BRANDING 02") y las páginas 14–15 son solo imágenes**, sin ninguna especificación: no hay reglas de uso del logo, área de respeto, tamaños mínimos, usos incorrectos, ni construcción del lockup. | Alto: cualquiera puede deformar la marca | Derivé las reglas del propio arte (ver §4) |
| 3 | **Erratas en la página 19:** "PRMARY" en lugar de PRIMARY, y los hex están escritos sin `#` (`F4EDDA`, `D69A3A`). | Bajo (cosmético) pero delata que el documento no pasó revisión final | Usé los valores corregidos: `#1D2945`, `#F4EDDA`, `#C74732`, `#D69A3A`, `#8A9A83` |
| 4 | **La página 12 mezcla idiomas:** el encabezado dice "VISIÓN GENERAL DE LA MARCA" en un documento íntegramente en inglés. Lo mismo pasa en la 13 y la 19 ("PALETA DE COLORES", "TIPOGRAFÍA"). | Bajo | Ninguno; el sitio es bilingüe y esto confirma que la marca debía serlo también |
| 5 | **La página 12 tiene un error de contenido:** dice "RESPONSABILITY" (debería ser RESPONSIBILITY). | Bajo | Corregido en el sitio |
| 6 | **El mark es un mapa de bits bitonal**, no un vector. Todas las versiones del logo en el PDF están incrustadas como imágenes (una a 629×829 px). | Alto para web: se pixela en pantallas retina y no se puede recolorear | Extraje el arte a **7× de resolución** desde el render del PDF y lo recoloré a los valores exactos de marca para generar todo el set de assets |
| 7 | **No hay ninguna voz ni tono documentados**, ni ejemplos de copy, ni reglas de escritura. | Medio | Derivé la voz del propio texto del libro (ver §4) |
| 8 | **No hay iconografía, ni patrón, ni sistema de layout, ni componentes.** Es decir: el brand book define la marca pero no el sistema con el que se construye una interfaz. | Alto: había que inventar el sistema visual completo | Ese fue el trabajo de diseño principal (ver §5) |
| 9 | **No hay ni un solo dato de negocio:** sin teléfono, sin dirección, sin zonas, sin horarios, sin licencia, sin precios. | Bloqueante para publicar | Todo quedó como marcador de posición, señalizado en el sitio y listado en el README |

**Conclusión del análisis:** el brand book es un excelente documento *estratégico* y un
documento *visualmente incompleto*. Da las ideas y el ánimo, pero no da el sistema. Eso
no es un defecto del diseñador: es el estado normal de un brand book de identidad. La
consecuencia práctica es que el sitio tenía que **construir el sistema visual a partir
del mundo cultural de la marca**, no solo aplicar colores y un logo.

### 3.3 Los cinco colores y su regla

La instrucción más importante del brand book está en la página 19, sobre el rojo:

> "Workwear Red — Primary accent. Adds energy and visibility. **Used for calls to
> action, signage and small graphic details.**"

Es decir: **el rojo nunca llena un fondo grande.** Lo respeté en todo el sitio — el
rojo aparece únicamente en botones de acción, sellos de estado, viñetas y detalles
gráficos pequeños. La única excepción es la banda de cierre (la llamada a la acción
final), donde el rojo *es* la acción. Fue una decisión deliberada y consciente, no un
descuido.

| Color | Hex | Rol en el sitio |
|---|---|---|
| Midnight Navy | `#1D2945` | Fondos principales, tipografía, el mark |
| Warm Cream | `#F4EDDA` | Fondo de página, logos invertidos |
| Workwear Red | `#C74732` | **Solo** acciones, sellos y estado |
| Utility Gold | `#D69A3A` | Marcadores de "reemplazar" y sello de socio licenciado |
| Soft Sage | `#8A9A83` | Registro de exterior / mantenimiento |

---

## 4. El sistema que construí

### 4.1 El concepto: **The Work Order**

La promesa de la marca — sobre todo "We quote first" — solo es *comprobable* en un
artefacto: el papel que el cliente firma, con un precio, una fecha y un sello de
aprobación. Así que construí el sitio como **la papelería de una empresa de servicios
bien llevada**: una orden de trabajo que se puede leer.

Eso resuelve los dos problemas a la vez:
- **Es específico del negocio.** No hay nada genérico en una orden de trabajo con campos
  punteados, sellos de goma y bordes perforados.
- **Es fiel al mood board.** La papelería de servicio de mediados de siglo (facturas de
  papel carbón, órdenes de taller, recibos de gasolinera) *es* suburbana norteamericana
  de los años 50 y 60. El concepto vive dentro del mundo que el brand book fijó, no
  fuera de él.

**Lo que evité a propósito** (el "rut" de la categoría): héroe azul marino + foto de
stock de un técnico sonriente con polo + "Your Trusted Local Handyman" + cuatro tarjetas
de iconos genéricos + carrusel de cinco estrellas inventadas + tres viñetas de
"por qué elegirnos". Y su opuesto predecible: negro, un acento neón, tipografía
grotesca gigante. Ninguno de los dos.

### 4.2 Los materiales del sistema

- **Hoja de papel** con regla de 28px como suelo de página.
- **Campos punteados** para datos (el `field-row` de la orden de trabajo).
- **Sellos de goma** rotados para estado, nunca decoración.
- **Bordes perforados** en el pie (el talón de la copia al carbón).
- **Profundidad por superposición**, nunca por gradiente. Cero gradientes en todo el
  sitio.
- **Regla de margen** (`margin-rule`): un carril titulado a la izquierda y el cuerpo de
  la nota al lado, cerrado arriba y abajo por la misma regla de los tickets. Es el margen
  rayado de una orden de trabajo, no una barra de acento decorativa.
- **Tablero de ajedrez** azul marino y crema, tomado directo del mood board (página 3).

### 4.3 Tipografía

| Rol | Fuente | Por qué |
|---|---|---|
| Display | **Oswald** | Grotesca condensada pesada; es lo más cercano al logotipo `HANDYMAN` |
| Etiquetas / UI | **Barlow Condensed** | Trabajo de etiqueta condensada, registro de señalética de workwear |
| Texto / datos | **Courier Prime** | El mundo es papelería de servicio; la máquina de escribir es su voz |

Las tres se autoalojan en el build con `next/font` — el navegador del visitante nunca
hace una petición a Google.

### 4.4 Voz

Derivada del propio texto del brand book: **llana, calmada, adulta, específica.** Frases
cortas y declarativas. Oficio. Sin exclamaciones, sin "apasionados por", sin "los
mejores de la ciudad", sin emojis, sin superlativos. Habla como un profesional competente
que cumple su palabra.

Ejemplo de la página 6 del libro, que es exactamente el registro que mantuve:

> "The problem is not finding someone who can do the work. It is finding someone
> reliable enough to answer, arrive and stand behind it."

---

## 5. Decisiones de negocio que el contenido obligó a tomar

**1. El bilingüismo no es una función, es parte de la marca.** El brand book mezcla
inglés y español en varias páginas. En el mercado estadounidense de servicios para el
hogar, el español es una necesidad operativa real, no un adorno. El sitio es **completo
en ambos idiomas** — cinco rutas en cada uno, no un stub. Además, el diccionario español
está tipado contra el inglés, así que **si alguien agrega un texto en inglés y olvida el
español, el build falla.** Eso convierte el bilingüismo en una garantía estructural en
lugar de una promesa.

**2. El límite del oficio licenciado se muestra, no se esconde.** Seis categorías de
servicio llevan una nota explícita de lo que **no** hacemos y a quién se deriva. Es un
riesgo comercial aparente (le decimos al cliente lo que no podemos hacer) y es la decisión
correcta por tres razones:
- Es el valor RESPONSIBILITY del brand book puesto a trabajar.
- Protege al cliente y a la empresa de un trabajo ilegal o peligroso.
- Es un diferenciador: la mayoría de los competidores no aclara esto hasta que surge el
  problema.

**3. Cero prueba social inventada.** Un negocio nuevo no tiene reseñas, ni calificaciones,
ni años de trayectoria. El sitio **no inventa ninguna**: no hay estrellas, ni conteos de
clientes, ni logos de marcas, ni premios. Lo que sí hay son los cuatro compromisos de la
promesa, presentados como compromisos. Es más creíble que un carrusel de cinco estrellas
falsas, y es defendible legalmente.

**4. Los números operativos son compromisos declarados, no datos medidos.** La ventana de
llegada de 2 horas, la respuesta el mismo día hábil y el año de garantía están en el sitio
y en el código como valores reemplazables. **Hay que decidir los reales antes de
publicar**: una promesa operativa sin número no es exigible.

**5. El formulario es real.** Validación nativa, estados de error y de éxito, número de
referencia, y accesibilidad. No envía a ningún lado todavía; el punto de conexión está
marcado en el código y documentado.

---

## 6. Estado del entregable

- **Repositorio público:** https://github.com/edervalois88/handyman-all-in-one
- **Sitio en producción:** https://handyman-site-liard.vercel.app
- **13 rutas estáticas**, 5 páginas × 2 idiomas, más 404, `robots.txt` y `sitemap.xml`
- **Build limpio**, typecheck limpio, detector de diseño sin advertencias
- **SEO:** canonical y `hreflang` en cada página, datos estructurados
  `HomeAndConstructionBusiness`, tarjeta social 1200×630

### Pendiente antes de publicar en serio (todo está en un solo archivo)

`src/lib/site.ts` contiene **todos** los datos reemplazables: teléfono, correo, dirección,
zona de servicio, horario, número de licencia y las cifras de compromiso. En el sitio
cada uno aparece marcado con un asterisco dorado. La lista completa está en el README.

Además hay **cuatro respuestas del FAQ** escritas deliberadamente como "Placeholder
answer — state your real policy" (costo de la cotización, tiempo de respuesta, permisos y
materiales). Esas son decisiones de negocio del dueño, no de diseño.

---

## 7. Mi recomendación estratégica

Tres cosas, en orden de impacto:

**1. Fijar y cumplir los números de la promesa.** La marca entera se apoya en "we answer,
we arrive". El sitio declara hoy "mismo día hábil", "ventana de 2 horas" y "1 año de
garantía". Si la operación no puede sostener esas tres cosas en su semana más ocupada, hay
que bajarlas antes de publicar. Una promesa incumplida en la primera visita destruye el
único activo que este negocio tiene, que es la confianza.

**2. Fotografía propia, en el registro del brand book.** El mood board del libro es
extraordinario y el sitio hoy no tiene ni una foto. La mayor mejora disponible es un set
fotográfico real — el equipo, la camioneta, trabajos terminados, texturas de casa — tratado
con la calidez y la nostalgia del mood board (luz cálida, película, madera y cromo, nada
de stock azul y blanco). Eso convertiría un sitio muy bien construido en un sitio
inolvidable.

**3. Explotar la garantía como foso.** Cualquiera promete contestar. Sostener un año de
garantía de mano de obra con técnicos en nómina es caro y difícil de copiar. Es el
argumento que un marketplace no puede igualar y merece su propia página, no una viñeta.

---

*Brand book y identidad: Ochoa Studio. Análisis y sitio: construidos a partir del brand
book entregado.*
