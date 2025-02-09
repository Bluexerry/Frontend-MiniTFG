# Frontend-MiniTFG

## 1. Descripción General

El proyecto **Frontend-MiniTFG** es una aplicación web construida con **React** y **Vite**. Se utiliza para renderizar interfaces de usuario modernas y reactivas, aprovechando la velocidad de construcción y la eficiencia en el **Hot Module Replacement (HMR)** que ofrece Vite. Está complementado con **Tailwind CSS** para estilos, lo que facilita la creación de componentes visualmente atractivos y responsivos.

## 2. Tecnologías y Herramientas Utilizadas

- **React**: Biblioteca para construir la interfaz de usuario.
- **Vite**: Herramienta de desarrollo y empaquetado con soporte nativo para módulos ES.
- **Tailwind CSS**: Framework CSS basado en utilidades para diseñar rápidamente interfaces personalizadas.
- **PostCSS & Autoprefixer**: Configurados para procesar y autoprefijar el CSS.
- **React Router Dom**: Para la navegación y manejo de rutas.
- **React Icons**: Para la inclusión de íconos que enriquecen la interfaz.
- **ESLint**: Configurado para mantener la calidad y el estilo del código.

## 3. Estructura del Proyecto

### a. Raíz del Proyecto

- **index.html**: Página principal donde se inserta el contenedor (`root`) para la renderización de la aplicación.
- **package.json**: Define los scripts (por ejemplo, `dev`, `build`, `lint`, `preview`), dependencias y configuraciones básicas del proyecto.
- **.gitignore**: Lista archivos y carpetas a ignorar en el control de versiones, como `node_modules` y `dist`.
- **postcss.config.js**: Configuración de PostCSS con plugins para Tailwind CSS y autoprefixer.
- **tailwind.config.js**: Configuración personalizada de Tailwind CSS.
- **vite.config.js**: Configura Vite para utilizar React (`@vitejs/plugin-react-swc`).
- **eslint.config.js**: Configuración de ESLint con reglas específicas para React.

### b. Carpeta `src`

Esta carpeta contiene el código fuente de la aplicación.

- **main.jsx**: Punto de entrada de la aplicación, renderiza el componente raíz (`App`).
- **index.css** y **App.css**: Hojas de estilo globales.

#### Componentes

- **Layout/Navbar.jsx**: Barra de navegación con `react-router-dom` y estilos dinámicos.
- **Layout/Footer.jsx**: Pie de página con enlaces sociales y transiciones interactivas.
- **Home/Exercises.jsx**: Catálogo de ejercicios con peticiones asíncronas al backend y filtros.
- **App.jsx**: Componente raíz que estructura la aplicación y gestiona rutas.

## 4. Flujo y Funcionamiento

### Inicio de la Aplicación

Al cargar `index.html`, se inicia la aplicación mediante `main.jsx`, que monta el componente raíz dentro de `root`.

### Enrutamiento y Navegación

La navegación se gestiona con `react-router-dom`, y los enlaces cambian dinámicamente según la vista activa.

### Consulta y Renderización de Datos

El componente `Exercises.jsx` realiza llamadas HTTP asíncronas para obtener ejercicios desde el backend, filtrando datos con **query parameters** y asignando íconos.

### Estilos y Animaciones

Los estilos se definen con **Tailwind CSS**, permitiendo un diseño responsivo. Las animaciones (ej. `fadeInUp`, `slideDown`) están configuradas en `tailwind.config.js` e `index.css`.

### Desarrollo y Calidad del Código

Vite proporciona un entorno con recarga en caliente. **ESLint** mantiene la calidad del código mediante reglas estrictas.

## 5. Scripts y Comandos de Desarrollo

Los siguientes scripts están disponibles en `package.json`:

- **`dev`**: Inicia el servidor de desarrollo de Vite.

  ```sh
  npm run dev
  ```

- **`build`**: Compila la aplicación para producción.

  ```sh
  npm run build
  ```

- **`preview`**: Previsualiza la aplicación compilada.

  ```sh
  npm run preview
  ```

- **`lint`**: Ejecuta ESLint para revisar la calidad del código.

  ```sh
  npm run lint
  ```

## 6. Conclusión

El proyecto **Frontend-MiniTFG** es una aplicación moderna que combina la potencia de **React**, la rapidez de **Vite** y la flexibilidad de **Tailwind CSS**. Su estructura modular y la separación de responsabilidades hacen que sea escalable y fácil de mantener. Además, herramientas como **ESLint** y **PostCSS** garantizan altos estándares de calidad en el código.
