# 🗺️ CPW Leaderboard - Roadmap de Ideas y Mejoras Futuras

Este documento recopila las propuestas de diseño, gamificación y herramientas para el ecosistema del leaderboard de Calistenia CPW.

---

## 🏆 1. Gamificación y Comunidad (Atletas)
- [ ] **Comparador Cara a Cara (Head-to-Head 1 vs 1)**: *(En desarrollo)*
  - Comparar 2 atletas en gráfico radar superpuesto y desglose ejercicio por ejercicio con balance de victorias.
  - Accesible desde el perfil del atleta y con enlace directo (`#/comparar`).
- [ ] **Salón de la Fama / Récords Históricos del Box**:
  - Vista dedicada con los récords absolutos históricos por ejercicio (quién tiene el récord de Dominadas, Fondos, Lagartijas, Sentadillas, etc., cuántas reps fueron y en qué fecha).
- [ ] **Generador de Tarjetas para Redes Sociales (Instagram Stories / WhatsApp)**:
  - Exportación con un clic de una tarjeta visual (9:16 o 1:1) con el resumen del atleta (puesto `#X`, PRs y estética del box) lista para compartir.
- [ ] **Sistema de Insignias y Logros Automáticos**:
  - Medallas automáticas por hitos: *"Club 20 Dominadas"*, *"Mayor progresión del mes"*, *"Asistencia perfecta"* (presente en todas las evaluaciones).

---

## 📱 2. Experiencia de Usuario y Navegación (UX / UI)
- [ ] **Buscador Rápido en Leaderboard General**:
  - Input de búsqueda en la tabla general para resaltar o enfocar inmediatamente a un atleta sin desplazarse manualmente.
- [ ] **Navegación por Pestañas / Barra Inferior Móvil**:
  - Menú fijo o tabs superiores claras: `[ 🏆 Leaderboard | 👥 Atletas | ⚔️ Comparador | ⭐ Récords ]`.
- [ ] **Compartir Perfil con Enlace Rápido**:
  - Botón nativo (`navigator.share`) en el perfil de cada atleta para enviar su enlace directo por WhatsApp.

---

## 🛠️ 3. Herramientas para Entrenadores y Gestión de Datos
- [ ] **Formulario / Asistente de Carga de Evaluaciones (`#/admin` o local)**:
  - Pantalla amigable para ingresar repeticiones por alumno mes a mes y generar el archivo `.json` validado sin necesidad de editar código a mano.
- [ ] **Segmentación por Categorías o Niveles**:
  - Filtros opcionales por categoría (Principiante / Intermedio / Avanzado o Femenino / Masculino si se requiere en el futuro).

---

## ⚡ 4. App Nativa (PWA)
- [ ] **PWA (Progressive Web App)**:
  - Archivo `manifest.json` e icono para que los alumnos puedan instalar el leaderboard directamente en la pantalla de inicio de su teléfono (iOS y Android) como si fuera una aplicación nativa.
