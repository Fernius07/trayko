# 🛒 Trayko: Smart Shopping, Smart Savings

![Trayko Banner](file:///C:/Users/FRN_DEUSTO/.gemini/antigravity/brain/7894223c-a36d-4290-a1e2-12cc6dcd5a39/trayko_header_banner_1773532528786.png)

> **Trayko no es solo una lista digital; es un asistente de compras ubicuo que revoluciona la experiencia en el supermercado mediante IA, navegación interior y comparativa en tiempo real.**

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌟 Visión General y Propósito

En la actualidad, realizar la compra implica tareas fragmentadas y poco eficientes. Planificar listas, comparar precios y buscar artículos en pasillos infinitos provoca una pérdida de tiempo y un esfuerzo cognitivo innecesario.

**Trayko** nace para unificar esta experiencia. Es una aplicación móvil diseñada para optimizar tanto el **tiempo** como la **economía** del usuario, integrando planificación inteligente y orientación física precisa dentro del establecimiento.

---

## ⚙️ Características Principales

### 1. Gestión de Listas Omnicanal 📝
Prepárate sin fricciones desde cualquier lugar:
*   **Comandos de Voz:** Añade productos sin necesidad de usar las manos, ideal para multitarea en el hogar.
*   **Escaneo Inteligente:** Utiliza la cámara para añadir artículos mediante el código de barras o entrada manual rápida.
*   **Priorización:** Marca productos como imprescindibles para que la app ajuste tu presupuesto.

### 2. Comparador de Precios Inteligente 💰
![Price Comparison](file:///C:/Users/FRN_DEUSTO/.gemini/antigravity/brain/7894223c-a36d-4290-a1e2-12cc6dcd5a39/trayko_price_comparison_1773532564559.png)
*   **Análisis Multi-Supermercado:** Visualiza el coste total de tu lista en diferentes establecimientos locales.
*   **Planificación de Ahorro:** Identifica instantáneamente la "Mejor Opción" económica y sugiere dónde acudir para maximizar tu presupuesto.

### 3. Modo Tienda y Navegación Proactiva 📍
*   **Geofencing:** La app detecta automáticamente tu llegada al supermercado y activa el "Modo Tienda".
*   **Ruta Óptima (Dijkstra):** Reorganiza tu lista basándose en la disposición física de los pasillos, evitando retrocesos innecesarios.
*   **Mapa Interactivo 2D:** Visualización simplificada por secciones para eliminar la sobrecarga visual.

### 4. Asistencia con Realidad Aumentada (AR) 🏹
![AR Assistance](file:///C:/Users/FRN_DEUSTO/.gemini/antigravity/brain/7894223c-a36d-4290-a1e2-12cc6dcd5a39/trayko_ar_navigation_1773532548671.png)
*   **Indicaciones Visuales:** Flechas en AR que se superponen a la cámara para guiarte físicamente hacia el estante exacto donde se encuentra tu producto.

---

## 🎨 Filosofía de Diseño (UX/UI)

El diseño de Trayko prioriza la interacción natural en entornos de alta movilidad:

*   **📱 Uso con una Sola Mano (One-Handed Use):** Acciones principales accesibles con el pulgar para que puedas empujar el carrito con la otra mano.
*   **📳 Feedback Háptico:** Confirmaciones mediante vibración al marcar productos, garantizando que el usuario sepa que la acción fue exitosa sin mirar la pantalla constantemente.
*   **♿ Accesibilidad Universal:** Colores de alto contraste, textos legibles y total compatibilidad con lectores de pantalla.
*   **✨ Estética Premium:** Interfaz basada en *Glassmorphism* con gradientes esmeralda y un layout limpio y moderno.

---

## 🗺️ El Viaje del Usuario (User Journey)

| Fase | Acción | Resultado |
| :--- | :--- | :--- |
| **1. Casa** | El usuario crea su lista por voz o escaneo. | Lista digitalizada y categorizada. |
| **2. Planificación** | La app compara precios entre tiendas. | Decisión inteligente de compra. |
| **3. Trayecto** | Se genera la ruta GPS hacia el local. | Ahorro en tiempo de desplazamiento. |
| **4. Supermercado** | El Geofencing activa el mapa interior. | Navegación paso a paso por pasillos. |
| **5. Caja** | Compra finalizada en tiempo récord. | Experiencia satisfactoria y eficiente. |

---

## 💻 Especificaciones Técnicas

Trayko está construido con tecnologías de vanguardia para asegurar rendimiento y fluidez:

*   **Framework:** [React 18](https://reactjs.org/) con [Vite](https://vitejs.dev/) para un desarrollo ultrarrápido.
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para un diseño responsivo y premium.
*   **Iconografía:** [Lucide React](https://lucide.dev/).
*   **Algoritmia:** Implementación propia de **Dijkstra** para el cálculo de rutas óptimas en tiempo real sobre un sistema de nodos (NavMesh).
*   **Sensores:** Integración de API de Cámara (escaneo/AR), Micrófono (voz) y Geolocation.

---

## 🚀 Roadmap y Futuro

*   **[ ] Machine Learning:** Aprendizaje de hábitos de compra mediante lectura de tickets antiguos.
*   **[ ] Control Financiero:** Gráficos avanzados de gasto mensual y ahorro acumulado.
*   **[ ] Inclusión Total:** Función de solicitud de asistente/repartidor para personas con movilidad reducida.

---

> [!IMPORTANT]
> **Trayko** ha sido desarrollado como el proyecto final del **Grupo 16 de Interacción y Multimedia**, con el objetivo de demostrar cómo la tecnología puede humanizar y simplificar procesos cotidianos.

---
© 2024 Proyecto Trayko. Todos los derechos reservados.
