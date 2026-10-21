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
- **📅 Navegación por Períodos**: Selector dinámico para cambiar entre semanas o fechas registradas.
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
    ├── periodos.json       # Lista de períodos disponibles
    └── registros/          # Marcas semanales por atleta
        └── 2026-10-19.json
```

---

## ⚙️ Cómo Agregar Nuevos Registros

### 1. Crear el archivo de la semana
Agrega un nuevo archivo JSON en `data/registros/` con el nombre de la fecha (por ejemplo, `data/registros/2026-10-26.json`):

```json
{
  "period": "2026-10-26",
  "athletes": [
    {
      "name": "Fabri",
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
      "es_profe": false,
      "results": {
        "dominadas_pronas": 18,
        "fondos": 20,
        "lagartijas": 30,
        "dominadas_supinas": 17
      }
    }
  ]
}
```

### 2. Registrar el nuevo período
Edita `data/periodos.json` y agrega la nueva fecha al arreglo:

```json
[
  "2026-10-19",
  "2026-10-26"
]
```

El selector de la aplicación cargará el nuevo período automáticamente.

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
