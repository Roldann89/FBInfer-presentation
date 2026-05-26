# Guion Palabra por Palabra - Presentación FBInfer

Este es el guion literal para leer y practicar la exposición del proyecto de **FBInfer** para la asignatura de **Métodos Formales en Ingeniería**.

La presentación dura entre **10 y 12 minutos** (aproximadamente 3 minutos por ponente).

---

## 🎙️ SERGIO (Minuto 0:00 - 3:00)

### **[DIAPOSITIVA 1: Portada]**
*(Ponte de pie, mira al profesor y a la clase, y empieza con tono seguro)*

> "Buenos días a todos y al profesor. Hoy, Jordi, Brad, Nahuel y yo, Sergio, les vamos a presentar FBInfer, una herramienta de análisis estático de código de nivel industrial desarrollada por Meta. Esta presentación forma parte de la asignatura de Métodos Formales en Ingeniería.
>
> A lo largo de la exposición, analizaremos desde la teoría matemática que hace posible su funcionamiento hasta cómo se instala, cómo toma decisiones un equipo de ingeniería al adoptarla, y finalizaremos con una demostración práctica en vivo de detección de errores. Sin más preámbulos, entremos en materia."

*(Pasa a la siguiente diapositiva)*

---

### **[DIAPOSITIVA 2: ¿Qué es FBInfer?]**
*(Señala el diagrama de flujo a la derecha de la pantalla)*

> "Comencemos por lo básico: ¿Qué es FBInfer? Es un analizador estático de código multilenguaje que da soporte a Java, C, C++ y Objective-C. Lo que hace especial a esta herramienta es que es capaz de encontrar errores graves en el código sin necesidad de ejecutar el programa. Es decir, analiza la estructura lógica y matemática de las instrucciones antes de que el código llegue a compilarse o desplegarse.
>
> Si se fijan en el diagrama de flujo que tenemos a la derecha, el proceso es muy limpio: Infer se integra directamente entre el código fuente y el compilador. Analiza el código, detecta anomalías y genera un reporte de fallos. Esto aporta tres grandes ventajas: una prevención activa de errores antes del despliegue, la posibilidad de integrarse en sistemas de Integración Continua para revisar cada cambio en minutos, y un soporte multilenguaje que cubre la mayor parte del stack de software de sistemas críticos de Meta."

*(Pasa a la siguiente diapositiva)*

---

### **[DIAPOSITIVA 3: Historia y Respaldo Empresarial]**
*(Dirige la mirada a la línea de tiempo)*

> "La historia de FBInfer es un puente perfecto entre la investigación académica y la ingeniería a gran escala. Todo comenzó en el año 2001, cuando los investigadores Reynolds y John O'Hearn formularon la 'Lógica de Separación', una teoría matemática que permite razonar sobre cómo los programas gestionan la memoria local y los punteros.
>
> En 2009, se fundó en Londres la startup Monoidics con el objetivo de trasladar esta teoría académica a una herramienta comercial. Esta iniciativa llamó la atención de Facebook, que en 2013 adquirió la startup. El motivo era crítico: las aplicaciones móviles de Facebook sufrían constantes cuelgues debido a errores de punteros nulos, y necesitaban una solución matemática para frenarlos. Dos años después, en 2015, Meta liberó el código de Infer bajo licencia de código abierto. Hoy en día, además de Meta, empresas de la talla de Spotify, Uber, Amazon y Mozilla la utilizan diariamente en sus flujos de desarrollo.
>
> Ahora, le cedo la palabra a Jordi, que nos explicará los fundamentos lógicos y los tipos de errores que detecta."

*(Pasa a la siguiente diapositiva)*

---

## 🎙️ JORDI (Minuto 3:00 - 6:00)

### **[DIAPOSITIVA 4: Análisis Composicional y Bi-Abducción]**
*(Señala el bloque de pasos lógicos de la izquierda)*

> "Muchas gracias, Sergio. El gran desafío de los analizadores estáticos tradicionales es la escalabilidad. Si intentas analizar un proyecto de millones de líneas evaluando todo el código global a la vez, la máquina se satura. Es inviable.
>
> Infer resuelve esto mediante el Análisis Composicional y la Bi-Abducción. En primer lugar, realiza un análisis local: en lugar de mirar todo el programa, analiza cada función de manera totalmente aislada. Para ello, calcula 'Precondiciones' (lo que la función necesita en memoria para no fallar) y 'Postcondiciones' (cómo queda la memoria al terminar).
>
> El núcleo matemático es la Bi-Abducción. Si la función A llama a la función B, la bi-abducción deduce matemáticamente qué parte de la memoria le falta a A para poder invocar a B de manera segura. Como pueden ver en la tabla de la derecha, esto marca la diferencia: los enfoques tradicionales son lentos y limitados, mientras que Infer ofrece un análisis lineal y veloz, capaz de procesar millones de líneas de código dividiendo el problema en partes independientes."

*(Pasa a la siguiente diapositiva)*

---

### **[DIAPOSITIVA 5: Errores Críticos que Detecta]**
*(Ve señalando cada una de las cuatro tarjetas de error según las mencionas)*

> "Gracias a este rigor matemático, Infer destaca localizando errores complejos que suelen pasar desapercibidos en los tests unitarios. Estos son los cuatro fallos principales:
>
> El primero es la desreferencia de Punteros Nulos (Null Pointer). Infer detecta si una variable puede llegar a ser nula en algún flujo lógico y aun así intentamos acceder a ella, lo que provocaría un cuelgue inmediato del programa.
>
> El segundo son las Fugas de Memoria (Memory Leaks), críticas en lenguajes como C y C++. Infer vigila que toda memoria reservada dinámicamente en el montón o heap sea liberada correctamente con un free, evitando que el servidor se quede sin memoria con el tiempo.
>
> El tercero son las Fugas de Recursos (Resource Leaks), habituales al trabajar con ficheros o conexiones de red. Si abrimos un canal de datos y salimos de la función sin cerrarlo, ese recurso queda bloqueado para el sistema. Infer encuentra estos caminos olvidados.
>
> Y por último, la seguridad entre hilos (Thread Safety) en Java, donde nos avisa si dos hilos intentan modificar una misma variable sin la sincronización adecuada.
>
> A continuación, Brad nos explicará el proceso de instalación y los entornos compatibles."

*(Pasa a la siguiente diapositiva)*

---

## 🎙️ BRAD (Minuto 6:00 - 9:00)

### **[DIAPOSITIVA 6: Facilidad de Instalación por Plataforma]**
*(Señala los iconos de las plataformas y los bloques de comandos)*

> "Gracias, Jordi. Hablemos de compatibilidad. Como el núcleo de FBInfer está desarrollado y optimizado en OCaml para sistemas basados en Unix, la experiencia de instalación varía significativamente según el sistema operativo.
>
> En macOS la instalación es sumamente sencilla. Contamos con soporte oficial a través del gestor de paquetes Homebrew, por lo que basta ejecutar en la terminal 'brew install infer' y el sistema se encarga de todo.
>
> En Linux el proceso es estándar; podemos descargar la carpeta con los ejecutables ya compilados o compilar desde el código fuente instalando dependencias comunes del compilador.
>
> El problema real aparece en Windows. Al no existir un instalador nativo ni soporte directo para esta plataforma, los usuarios de Windows nos vemos obligados a virtualizar el entorno, ya sea configurando una distribución de Linux Ubuntu dentro de WSL2, o utilizando contenedores de Docker mediante la imagen oficial de Infer."

*(Pasa a la siguiente diapositiva)*

---

### **[DIAPOSITIVA 7: ¿La hemos instalado? No localmente]**
*(Señala la tarjeta roja de la izquierda y luego la tabla comparativa de la derecha)*

> "Ante este escenario, nos planteamos la pregunta en el grupo: ¿Instalamos Infer de forma local en nuestros ordenadores? La respuesta es que decidimos no hacerlo localmente. Y queremos explicar esta decisión desde un punto de vista técnico y de ingeniería, basándonos en la tabla que ven a la derecha.
>
> Evaluamos las dos vías posibles para Windows. Con WSL2 obtenemos un gran rendimiento, pero requiere una configuración manual compleja de la BIOS, de la virtualización de Windows y de las rutas de archivos. Por otro lado, Docker ofrece un aislamiento excelente y se configura al instante, pero el consumo de memoria RAM y CPU en segundo plano por el motor de Docker es excesivo y penaliza el rendimiento general de nuestras máquinas.
>
> Como nuestro objetivo es educativo y queremos analizar código de manera ágil sin sobrecargar innecesariamente nuestros ordenadores con herramientas de virtualización pesadas, tomamos la decisión de no realizar una instalación local. En su lugar, hemos optado por utilizar un Sandbox interactivo remoto en la nube, que ejecuta Infer en un contenedor ya listo. Es una solución mucho más portable, limpia y eficiente para la demostración.
>
> Le doy paso a Nahuel, que realizará la demostración práctica con este Sandbox."

*(Pasa a la siguiente diapositiva)*

---

## 🎙️ NAHUEL (Minuto 9:00 - 12:00)

### **[DIAPOSITIVA 8: Ejemplo de Uso y Reporte de Bugs]**
*(Señala el código de la izquierda y luego la simulación de la terminal a la derecha)*

> "Gracias, Brad. Vamos a ver a Infer en acción a través de nuestro Sandbox. En la parte estática de la diapositiva tenemos representados ejemplos en Java y en C de los errores que Jordi explicó antes, junto con la simulación de sus reportes. 
> 
> Pero para ver la aplicación de los métodos formales en directo, voy a activar nuestro Sandbox Interactivo en la nube basado en Codeboard."

*(Acción: Con el ratón de la presentación, haz clic en la pestaña 'Sandbox Interactivo' y espera 2 segundos a que cargue el editor)*

> "Como podéis ver en la barra lateral izquierda, tenemos un editor funcional con tres archivos Java estructurados:
> - `Hello.java`, que es la clase principal y el punto de entrada que orquesta el proyecto.
> - `Pointers.java`, que contiene una función con un error de puntero nulo provocado a propósito.
> - `Resources.java`, que abre recursos de archivos pero tiene rutas lógicas donde olvida cerrarlos.
> 
> Voy a abrir `Pointers.java` para mostrar el código."

*(Acción: Haz doble clic en 'Pointers.java' en el panel izquierdo del editor)*

> "Aquí veis que tenemos un objeto que puede ser nulo y sobre el que intentamos llamar a un método. Esto provocaría una excepción en tiempo de ejecución. 
> 
> Ahora, fijaos en la barra superior. Voy a hacer clic en el botón 'Analyze' (Analizar)."

*(Acción: Haz clic en el botón 'Analyze' con el ratón en la parte superior central de Codeboard)*

> "En este momento, el Sandbox envía nuestros archivos a un servidor backend que levanta un contenedor Linux seguro y ejecuta de fondo el comando: `infer run -- javac *.java`. Es decir, compila el proyecto y analiza todos los archivos. 
> 
> Aquí es donde ocurre la conexión con los métodos formales: Infer aplica un análisis estático basado en lógica de separación para razonar automáticamente sobre posibles estados de memoria y recursos en nuestros métodos, buscando anomalías y contradicciones lógicas.
> 
> Si miramos la consola en la parte inferior..."

*(Acción: Señala la consola inferior mientras se muestran las líneas de ejecución)*

> "Y aquí lo tenemos. Sin llegar a ejecutar el software, Infer ha examinado los métodos de forma matemática y nos indica el tipo de error y la localización concreta en el fichero y la línea correspondiente: un potencial `NULL_DEREFERENCE` en `Pointers.java` y un `RESOURCE_LEAK` en `Resources.java`. Esto demuestra que esta aproximación de verificación ligera funciona en tiempo real y puede integrarse de manera fluida en cualquier editor moderno para dar feedback instantáneo al desarrollador."

*(Pasa a la siguiente diapositiva)*

---

### **[DIAPOSITIVA 9: Conclusiones del Análisis]**
*(Señala las columnas de ventajas y desventajas, y destaca la tarjeta de veredicto)*

> "Para ir cerrando nuestra presentación, hagamos un balance de la herramienta.
> 
> Entre sus principales ventajas, destacamos su solidez. A diferencia de herramientas más orientadas a calidad de código, estilo y reglas de mantenibilidad (como SonarQube), Infer se centra en análisis estático profundo de ciertos errores semánticos, especialmente memoria, recursos y concurrencia. Su análisis composicional busca reducir falsos positivos frente a enfoques más superficiales, aunque lógicamente no los elimina por completo. Además, aporta una base formal más sólida que un simple linter, aunque sus garantías son parciales y acotadas. Su enfoque composicional modular le da una velocidad óptima para su integración en sistemas de integración continua (CI/CD).
> 
> En cuanto a las limitaciones prácticas, su uso es más natural en entornos Linux o macOS, por lo que en Windows suele requerir configuración adicional mediante Docker o WSL2. Además, interpretar las trazas de error complejas requiere cierta curva de aprendizaje sobre lógica de separación.
> 
> Aun así, nuestro veredicto como grupo es de un 9.2 sobre 10. Consideramos que es una de las herramientas de análisis estático formal más robustas y maduras para la automatización a escala industrial."

*(Pasa a la siguiente diapositiva)*

---

### **[DIAPOSITIVA 10: Bibliografía]**
*(Mira a toda la clase con tono de despedida cordial)*

> "En esta última diapositiva recopilamos las fuentes de consulta utilizadas, que incluyen el sitio web oficial de la herramienta (fbinfer.com), su repositorio de código abierto en GitHub, y los artículos científicos sobre lógica de separación y bi-abducción de Calcagno, O'Hearn y Yang.
> 
> Muchas gracias por su atención. Quedamos a su entera disposición para responder a cualquier pregunta o duda que tengan sobre Infer."

*(Haz una leve inclinación de cabeza para dar por concluida la exposición)*
