# Hug's Store - Tienda de Mascotas

Este proyecto es una aplicación web para una tienda de mascotas ("Hug's Store"). Incluye un catálogo de productos, carrito de compras dinámico, proceso de checkout con generación de orden de compra y un panel de administración para gestionar productos.

El sistema se compone de un frontend desarrollado en JavaScript Vanilla (HTML/CSS/JS) y un backend API REST hecho en Python con Flask.

---

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- **Python 3.8+**
- **pip** (gestor de paquetes de Python)
- Un servidor local sencillo para estáticos (ej: la extensión **Live Server** de VS Code o el módulo de Python `http.server`).

---

## 🛠️ Instrucciones de Ejecución

### 1. Levantar el Backend (API en Flask)

1. Abre la terminal y navega hasta la carpeta del backend:
   ```bash
   cd Flask/pet_shot
   ```

2. (Opcional pero recomendado) Crea y activa un entorno virtual:
   ```bash
   python -m venv venv
   # En macOS/Linux:
   source venv/bin/activate
   # En Windows:
   venv\Scripts\activate
   ```

3. Instala las dependencias necesarias:
   ```bash
   pip install -r requirements.txt
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   python main.py
   ```
   *El servidor quedará corriendo por defecto en `http://localhost:4000`.*

---

### 2. Levantar el Frontend (Cliente Web)

1. Navega a la carpeta del frontend:
   ```bash
   cd Javascript/petStore
   ```

2. Ejecuta la aplicación web usando cualquiera de estas opciones:
   - **Opción A (Recomendada):** Si usas VS Code, haz clic derecho sobre `index.html` o `login.html` y selecciona **"Open with Live Server"**.
   - **Opción B:** Lanza un servidor estático rápido con Python:
     ```bash
     python -m http.server 3000
     ```
     Y luego abre tu navegador en `http://localhost:3000/index.html`.

---

## 🔗 Conexión entre Frontend y Backend

La comunicación se realiza consumiendo los endpoints de la API en `http://localhost:4000`:

1. **Instancia de Axios:**
   En cada archivo JS se crea una instancia centralizada de Axios con la URL base (`http://localhost:4000`) y se adjunta automáticamente el token JWT recuperado del `localStorage`:
   ```javascript
   const axiosInstance = axios.create({
     baseURL: "http://localhost:4000",
     timeout: 1000,
     headers: {
       "content-type": "application/json",
       Authorization: `Bearer ${access_token}`,
     },
   });
   ```

2. **Flujo de Autenticación:**
   - Al iniciar sesión en `login.html` o registrarse en `register.html`, la API responde con un `access_token` y la información del usuario.
   - Estos valores se almacenan en `localStorage` (`localStorage.setItem("access_token", ...)` y `localStorage.setItem("user", ...)`).
   - En las páginas protegidas (`cart.html`, `checkout.html`, `admin.html`), se valida la presencia de este token al inicio del script; si no existe, la aplicación redirige inmediatamente al usuario a `unauthorized.html` o `login.html`.

3. **Consumo de Endpoints:**
   - **Catálogo:** GET `/products`
   - **Carrito:** GET `/carts/active`, DELETE `/carts/items/:id`
   - **Ventas/Checkout:** POST `/sales`
   - **Administración:** POST `/products`, PUT/DELETE `/products/:id`

---

## 📋 Decisiones Técnicas y Justificación

### 1. JavaScript Vanilla y DOM Nativo (Sin Frameworks)
Se decidió no utilizar frameworks como React o Vue para mantener el proyecto ligero, libre de procesos complejos de compilación (build/bundling) y con cero dependencias en el lado del cliente. Esto facilita que cualquier desarrollador pueda clonar, revisar y modificar el código directamente en el navegador sin configuraciones previas de herramientas de construcción.

### 2. Axios mediante CDN
Se importó Axios vía CDN en los archivos HTML (`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`). Esto permite manejar peticiones asíncronas con una sintaxis limpia de `async/await` e interceptar encabezados de autorización sin necesidad de usar un empaquetador de módulos como Webpack o Vite.

### 3. Autenticación basada en JWT + `localStorage`
El uso de tokens JWT guardados en el almacenamiento local permite mantener una sesión persistente sin depender de cookies de sesión en el servidor. Esto desacopla el cliente del servidor, permitiendo que la API sea completamente *stateless*.

### 4. Delegación de Eventos en el DOM
En vistas con contenido dinámico (como la lista de productos en el carrito), se utilizó la técnica de **delegación de eventos** escuchando a nivel de `document` (ej: `id.startsWith("btn-qty-increase-")`). Esto evita tener que agregar y remover *event listeners* manualmente a cada elemento cada vez que la lista se vuelve a renderizar, mejorando el rendimiento y reduciendo posibles fugas de memoria.

### 5. Estructura Modular por Vistas
Se organizó la lógica de JavaScript separando un archivo `.js` para cada archivo `.html` (ej. `cart.html` $\rightarrow$ `cart.js`, `checkout.html` $\rightarrow$ `checkout.js`). Esto evita tener un archivo monolítico gigante, facilitando la depuración y manteniendo la responsabilidad de cada vista bien acotada.
