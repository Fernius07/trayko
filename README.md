# 🛒 Trayko: Tu Asistente de Compra Inteligente

<div align="center">

### 🎬 Demostración de la Experiencia Trayko
![Trayko Demo](./src/assets/ezgif-7e699d8aca74b047.gif)

> **Trayko no es una simple lista digital. Es un ecosistema inteligente que elimina el estrés del supermercado combinando IA, navegación GPS de interiores y optimización financiera en tiempo real.**

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 🌟 Visión General
Trayko nace para resolver los problemas cotidianos de la compra: falta de organización, dificultad para encontrar productos en los pasillos y el gasto excesivo por no comparar precios. Nuestra misión es convertir una tarea tediosa en una experiencia fluida, rápida y económica.

---

## ⚙️ Funcionalidades Detalladas

### 1. Gestión Inteligente de la Lista (`Mi Lista`) 📝
Prepara tu compra de la manera que más te guste:
*   **Búsqueda Manual con Sugerencias:** Empieza a escribir y Trayko te sugerirá productos al instante.
*   **Comandos de Voz Avanzados:** Di lo que necesitas (ej: "necesito leche, manzanas y pan") y la app detectará y añadirá múltiples productos a la vez. En caso de duda, te preguntará cuál prefieres.
*   **Escaneo con IA (Cámara):** Apunta a una zona o producto y la IA reconocerá la categoría automáticamente, abriendo la sección correspondiente para que elijas.
*   **Eliminación por Deslizamiento:** Borra artículos rápidamente deslizando el dedo hacia la izquierda, acompañado de una vibración táctil de confirmación.

### 2. Sistema de Favoritos Personalizado ⭐
Optimiza tu acceso a los productos que más compras:
*   **Pulsación Larga para Guardar:** Mantén pulsado cualquier producto en el buscador o en tu lista para marcarlo como favorito. Un destello y una vibración te confirmarán que se ha guardado.
*   **Categoría Especial "Favoritos":** Al añadir productos, aparecerá una categoría exclusiva en la parte superior con todos tus imprescindibles para que los añadas con un solo toque.
*   **Indicador Visual:** Los favoritos se distinguen en tu lista con un punto amarillo brillante.

### 3. Comparador de Precios en Tiempo Real 💰
No pagues más de lo necesario:
*   **Análisis Multi-Punto:** Trayko calcula automáticamente el coste total de tu lista en diferentes supermercados (SuperA, SuperB, SuperC).
*   **Identificación del Mejor Local:** La app resalta la "Mejor Opción" basándose en el precio total y las ofertas exclusivas disponibles.
*   **Visualización de Ofertas:** Mira cuántas promociones específicas se aplican a tu lista en cada establecimiento antes de salir de casa.

### 4. Modo Tienda y Navegación de Interiores 📍
La magia ocurre cuando entras al supermercado:
*   **Geofencing (Simulado):** Al seleccionar una tienda, la app activa el "Modo Tienda", transformando la interfaz en un navegador GPS.
*   **Ruta Óptima con Dijkstra:** Trayko reorganiza tu lista de la compra basándose en la ubicación física de los estantes. Olvida el ir y volver de una punta a otra del súper.
*   **Mapa 2D BluePrint:** Un mapa técnico detallado con estanterías, neveras, pasillos y cajas de cobro.
    *   **Indicador "AQUÍ":** Un pin dinámico sobre el mapa te señala exactamente dónde está el siguiente producto que debes recoger.
    *   **Visualización de Ruta:** Puedes ver el segmento hacia tu próximo objetivo o mantener pulsado para revelar la ruta completa hasta el final.
*   **Checklist Progresivo:** Los artículos se agrupan por pasillos según tu camino. Al marcarlos, el mapa se actualiza automáticamente hacia el siguiente destino.

### 5. Historial de Compras y Repetición 🔄
Nunca olvides lo que compraste:
*   **Guardado Automático:** Al pulsar "Finalizar Compra", todo se registra en tu historial privado.
*   **Repetir Compra Rápida:** Accede a tus compras pasadas y, con un solo botón, añade todos esos artículos de nuevo a tu lista actual. Es ideal para la "compra de la semana" recurrente.

---

## 📖 Manual del Usuario: Paso a Paso

¡Bienvenido a tu nueva forma de comprar! Sigue este manual para sacar el máximo partido a Trayko.

### 🏠 1. Pantalla de Inicio
Al abrir la app, tienes dos opciones principales:
*   **Preparar la Lista:** Para empezar tu compra desde cero.
*   **Historial y Favoritos:** Para ver tickets anteriores o repetir una compra pasada.

### 📝 2. Creando tu Lista (`Mi Lista`)
Desde aquí gestionas lo que necesitas:
*   **Añadir con el botón (+):** Pulsa el círculo verde inferior para abrir el buscador.
    *   **Escribiendo:** Usa el teclado para buscar productos específicos.
    *   **Por Voz (🎙️):** Pulsa el micrófono y di "necesito chocolate, leche y huevos". La app los añadirá todos de una vez.
    *   **Por IA (📷):** Pulsa la cámara y apunta a un producto de una categoría (ej: un plátano); la app abrirá la categoría "Fruta" automáticamente.
*   **Gestionar Favoritos (⭐):** Si hay algo que compras siempre, **manténlo pulsado** (click largo) para que aparezca una estrella. La próxima vez, lo encontrarás en la categoría especial "Favoritos" arriba del todo.
*   **Borrar (🗑️):** Si te equivocas, simplemente **desliza el producto hacia la izquierda** (swipe left) y desaparecerá con una vibración.

### 💰 3. Ahorrando Dinero (`Ofertas Top`)
Cuando tu lista esté lista, pulsa en el botón negro de **Comparar Precios**:
1.  Verás una lista de supermercados con el **coste total** de tu compra en cada uno.
2.  Busca la etiqueta **"Mejor Opción"** en verde para ahorrar al máximo.
3.  Pulsa **"Mostrar Mapa"** en el súper que prefieras para empezar el guiado.

### 📍 4. Navegando el Supermercado (`Modo Tienda`)
Una vez seleccionado el súper, entrarás en el modo mapa interactivo:
*   **El Mapa:** Verás un plano real del supermercado. Tu objetivo es seguir el punto marcado como **"AQUÍ"**.
*   **La Ruta (Dijkstra):** La línea discontinua verde te indica el camino más corto hacia tu siguiente producto.
*   **Ver Ruta Completa:** Si quieres ver todo el camino hasta la caja, **mantén pulsado el botón "Ver ruta"**.
*   **Marcando Productos:** A medida que recojas los artículos, pulsa sobre ellos en la lista inferior. Verás cómo el mapa actualiza el punto "AQUÍ" automáticamente hacia el siguiente pasillo.
*   **Finalizar:** Cuando todos los productos estén marcados, aparecerá el botón **"Finalizar Compra"**. Al pulsarlo, tu carrito se vaciará y la compra se guardará en tu historial.

### 🔄 5. Repitiendo Compras (`Historial`)
¿Haces siempre la misma compra semanal?
1.  Ve a **Historial** desde la Home.
2.  Busca la compra que quieras repetir.
3.  Pulsa **"Repetir Compra"**. ¡Magia! Todos esos productos volverán a tu lista actual sin que tengas que buscarlos uno a uno.

---

## 🎨 Principios de Diseño (UX/UI)

*   **📱 Operación a una Sola Mano:** Todos los botones críticos están situados en la zona de alcance del pulgar.
*   **✨ Estética Premium (Glassmorphism):** Una interfaz moderna que utiliza transparencias, desenfoques y gradientes esmeralda para una sensación tecnológica y ligera.
*   **📳 Feedback Háptico y Visual:** Cada acción importante genera una pequeña vibración y notificaciones tipo "Zap" para que sientas la aplicación viva en tus manos.

---

## 💻 Especificaciones Técnicas

*   **Frontend:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) para máxima velocidad de respuesta.
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para un diseño responsivo y consistente.
*   **Iconografía:** [Lucide React](https://lucide.dev/).
*   **Algoritmia:** Implementación propia del algoritmo de **Dijkstra** para el cálculo dinámico de rutas sobre un NavMesh de nodos.
*   **IA de Visión:** Integración con modelos de **Teachable Machine** para el reconocimiento categórico a través de la cámara.

---

## 🔐 Nota sobre Almacenamiento y Privacidad

> [!IMPORTANT]
> **Simulación de Base de Datos:** Actualmente, el historial y los favoritos se gestionan mediante `sessionStorage`. Esto significa que los datos **persisten si recargas la página**, pero se borran por seguridad al cerrar la pestaña o el navegador, simulando un cierre de sesión. Esto garantiza que cada usuario tenga su propia experiencia privada sin mezclar datos. En futuras versiones se implementará una base de datos en la nube.

---

## 🚀 Próximos Pasos (Roadmap)

*   **[ ] Conectividad Real:** Integración con APIs de inventario real de supermercados locales.
*   **[ ] Realidad Aumentada:** Guiado mediante flechas 3D superpuestas en la imagen de la cámara.
*   **[ ] Compartir Lista:** Permite que varios familiares editen la misma lista en tiempo real.

---

> [!NOTE]
> Este proyecto ha sido desarrollado por el **Grupo 16 de Interacción y Multimedia**. Trayko es una demostración de cómo la tecnología centrada en el humano puede simplificar las tareas más básicas del día a día.

---
© 2026 Proyecto Trayko. Todos los derechos reservados.
