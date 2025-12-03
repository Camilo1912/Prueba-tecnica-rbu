<h1>Prueba Tecnica RBU</h1> 

Aplicación web construida con React para la gestión de desarrolladores, proyectos y sus asignaciones.

<h2>Instrucciones de Instalación y Ejecución</h2>

Prerrequisitos
- Node.js: Versión 18 o superior recomendada.
- npm: Incluido con Node.js.

Pasos para ejecutar

1.  Instalar dependencias:
    En la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```

2. Crear el archivo de variables de ambiente:

    En la raíz del proyecto crea el archivo .env e ingresa las siguientes variables:
    ```
    VITE_API_BASE_URL=<tu url base aquí>
    VITE_TOKEN=<tu token aquí>
    ```

3.  Ejecutar en modo desarrollo:
    Para iniciar el servidor local:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible típicamente en http://localhost:5173 pero si es distinto lo indica en la terminal.

4.  Construir para producción:
    Para generar los archivos estáticos optimizados en la carpeta dist:
    ```bash
    npm run build
    ```

<h2>Arquitectura</h2>

<h2>Estructura de Directorios</h2>

*   src/api: Capa de Servicio. Contiene la configuración del cliente HTTP y funciones tipadas para cada endpoint del backend.
*   src/store: Gestión de Estado. Utiliza Zustand para manejar el estado global de la aplicación (desarrolladores, proyectos, asignaciones).
*   src/features: Módulos de Dominio.
*   src/components/ui: Componentes reutilizables de bajo nivel (Botones, Inputs, Badges, Tablas). Corresponden a los incluidos desde Shadcn/ui
*   src/pages: Vistas Principales que orquestan los componentes de features.
*   src/layouts: Define el layout principal

<h2>Flujo de Datos</h2>

1.  Interacción: El usuario interactúa con la UI
2.  Acción: El componente invoca una acción del Store de Zustand.
3.  Llamadas de API: El Store se comunica con la capa API para persistir datos.
4.  Actualización de estado: Tras una respuesta exitosa, el Store actualiza el estado global.
5.  Render: Los componentes suscritos se re-renderizan automáticamente con los nuevos datos.

<h2>Decisiones Técnicas</h2>
Aunque la mayoría son requeridas en el enunciado para el desarrollo, aquí hay algunas razones de por que se usaría cada una.

*   React 19 & TypeScript: Se eligió la última versión estable de React para crear componentes reutilizables y con tipado de datos.
*   Vite: Buena velocidad en el arranque del servidor de desarrollo y compilación.
*   Zustand: Elegido para el manejo de estado global de bajo peso y facilidad de uso.
*   Tailwind CSS: Para desarrollo rápido de UI consistente y responsiva.
*   React Router DOM: Para el enrutamiento del lado del cliente (SPA). Navegación fluida.

Consideraciones Adicionales

*   Validaciones: Se incluyen validaciones dentro del frontend pero algunas, como la validación del RUT no fueron completamente implementadas. Como alternativa se podría usar modulos como "rut-utilities".

