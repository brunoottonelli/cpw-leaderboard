# 🏆 CPW Leaderboard - Calistenia

Panel interactivo y generador de rankings semanales de calistenia para visualizar marcas por ejercicio y calcular clasificaciones generales según múltiples sistemas de puntuación.

🌐 **Sitio Web en Vivo:** [https://brunoottonelli.github.io/cpw-leaderboard/](https://brunoottonelli.github.io/cpw-leaderboard/)

---

## 📋 Características Principales

- **📊 Visualización Vectorial SVG Dinámica**: Todo el tablero se genera en tiempo real con estética moderna oscura, medallas de podio (🥇, 🥈, 🥉) e insignias de atletas y profesores.
- **⚖️ Criterios de Puntuación Configurables ([`criterios.js`](criterios.js))**:
  - **Puntos Fijos**: Asignación tradicional estilo competición (1º: 10 pts, 2º: 8 pts, 3º: 7 pts, etc.).
  - **Puntuación Balanceada (Media Geométrica)**: Pondera el rendimiento relativo contra el líder en cada ejercicio $(\prod p_i)^{1/n}$. Premia la constancia en todos los ejercicios y penaliza tener debilidades en alguno.
  - **Relativo al Líder**: Sumatoria ponderada de marcas según la proporción con el primer puesto.
  - **Modularidad**: Cada criterio se puede habilitar o deshabilitar fácilmente con `enabled: true/false`.
- **👥 Soporte Multigrupo y Horarios**: Los atletas pueden pertenecer a distintos grupos/turnos (ej. `LMV1730`, `MJ1900`) y rendir en diferentes fechas dentro de una misma evaluación.
- **🔍 Filtro de Grupos Dinámico**: Selector para alternar entre el ranking unificado de la academia ("Todos los grupos") o un grupo específico con recálculo automático de podios y puntajes.
- **🏷️ Insignias de Grupo**: Etiquetas visuales para identificar el grupo de cada atleta en el ranking general y en las tarjetas por ejercicio.
- **📅 Evaluaciones Consolidadas por Período**: Permite agrupar las pruebas del mes o ciclo aunque se hayan realizado en distintas fechas y horarios.
- **👨‍🏫 Filtro de Profesores**: Casilla para incluir o excluir profesores del ranking con un solo clic.
- **📥 Exportación Multi-formato**:
  - **PNG** (en alta resolución 2x Retina, listo para compartir en redes sociales).
  - **SVG** (vectorial sin pérdida de calidad).
  - **PDF** (documento listo para imprimir o archivar).

---

## 📁 Estructura del Repositorio

```text
cpw-leaderboard/
│
├── index.html              # Aplicación principal y renderizador SVG
├── leaderboard.html        # Versión alternativa de la interfaz
├── criterios.js            # Definición y configuración de sistemas de puntuación
│
└── data/
    ├── ejercicios.json     # Catálogo de ejercicios disponibles
    ├── periodos.json       # Lista de períodos / evaluaciones disponibles
    └── registros/          # Evaluaciones consolidadas por período
        └── 2026-10.json
```

---

## ⚙️ Cómo Agregar Nuevos Registros

### 1. Crear o actualizar el archivo de la evaluación
Agrega o edita el archivo JSON en `data/registros/` con el identificador del período (por ejemplo, `data/registros/2026-11.json`):

```json
{
  "period": "2026-11",
  "name": "Noviembre 2026",
  "athletes": [
    {
      "name": "Fabri",
      "grupo": "LMV1730",
      "fecha": "2026-11-16",
      "es_profe": true,
      "results": {
        "dominadas_pronas": 28,
        "fondos": 45,
        "lagartijas": 42,
        "dominadas_supinas": 22
      }
    },
    {
      "name": "Tadeo",
      "grupo": "LMV1730",
      "fecha": "2026-11-16",
      "es_profe": false,
      "results": {
        "dominadas_pronas": 18,
        "fondos": 20,
        "lagartijas": 30,
        "dominadas_supinas": 17
      }
    },
    {
      "name": "Camila",
      "grupo": "MJ1900",
      "fecha": "2026-11-17",
      "es_profe": false,
      "results": {
        "dominadas_pronas": 15,
        "fondos": 16,
        "lagartijas": 32,
        "dominadas_supinas": 14
      }
    }
  ]
}
```

> **Campos de cada atleta:**
> - `grupo` (opcional): Código del turno o grupo (ej. `"LMV1730"`). Si no se define, se muestra sin etiqueta de grupo.
> - `fecha` (opcional): Fecha en formato `YYYY-MM-DD` en la que el grupo/atleta rindió la prueba.
> - `es_profe` (booleano): Indica si es profesor.

### 2. Registrar el nuevo período
Edita `data/periodos.json` y agrega la evaluación al arreglo (puedes usar un objeto con `id` y `nombre` legible o directamente el id):

```json
[
  { "id": "2026-10", "nombre": "Octubre 2026" },
  { "id": "2026-11", "nombre": "Noviembre 2026" }
]
```

El selector de la aplicación cargará el nuevo período y detectará los grupos automáticamente.

---

## 🔧 Personalización de Criterios (`criterios.js`)

Puedes modificar, deshabilitar o crear nuevos criterios en [`criterios.js`](criterios.js).

### Habilitar o Deshabilitar un Criterio
Para ocultar un criterio del selector y de los cálculos generales, cambia su propiedad `enabled` a `false`:

```javascript
rel: {
  id: 'rel',
  enabled: false, // Se oculta del selector y no se tiene en cuenta
  btnLabel: 'RELATIVO AL LÍDER',
  ...
}
```

### Formato de Textos y Subtítulos
- Usa `\n` para hacer un **salto de línea simple** (interlineado estándar).
- Usa `\n\n` para hacer un **cambio de párrafo** (con separación visual adicional).
- El texto se adapta automáticamente al ancho central disponible (**word-wrap** automático).

---

## 🚀 Ejecución Local

Dado que la aplicación consulta archivos JSON locales mediante `fetch`, requiere ser servida a través de un servidor HTTP local:

### Con Node.js / npx:
```bash
npx serve .
```

### Con Python:
```bash
python -m http.server 8000
```

Luego abre en tu navegador `http://localhost:3000` (o el puerto correspondiente).

---

## 🌐 Despliegue

El proyecto está configurado para desplegarse automáticamente en **GitHub Pages**. Cada vez que se realiza un `git push` a la rama `main`, GitHub compila y publica los cambios de forma instantánea.
