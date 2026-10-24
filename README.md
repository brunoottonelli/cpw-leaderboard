# 🏆 CPW Leaderboard - Calistenia

Panel interactivo y generador de rankings de calistenia para visualizar marcas por ejercicio y calcular clasificaciones generales según múltiples sistemas de puntuación atlética.

🌐 **Sitio Web en Vivo:** [https://brunoottonelli.github.io/cpw-leaderboard/](https://brunoottonelli.github.io/cpw-leaderboard/)

---

## 📋 Características Principales

- **📊 Visualización Vectorial SVG Dinámica**: Todo el tablero se genera en tiempo real con estética oscura moderna, medallas de podio (🥇, 🥈, 🥉), insignias de grupo y distinción de atletas y profesores.
- **🖨️ Exportación para Imprenta y Redes**:
  - **PNG en 300 ppp (DPI)**
  - **PDF Vectorial de Alta Fidelidad**
  - **SVG**
- **📄 Paginación Inteligente**:
  - Selector entre **Top 10** y **Tabla Completa** de atletas.
  - En modo expandido, la exportación se divide automáticamente en **2 páginas limpias** (*Ejercicios individuales* y *Posiciones generales*) para facilitar la lectura y evitar documentos excesivamente largos.
- **👥 Soporte Multigrupo y Horarios**: Permite agrupar atletas de distintos turnos (ej. `LMV1730` para Lunes/Miércoles/Viernes 17:30, `MJS1900` para Martes/Jueves/Sábados 19:00) y registrar fechas de evaluación específicas por participante.
- **🔍 Filtro de Grupos Dinámico**: Selector para alternar entre el ranking unificado de la academia ("Todos los grupos") o aislar un grupo específico con recálculo automático de líderes, podios y puntajes.
- **🏷️ Etiquetas de Grupo Opcionales**: Casilla para activar o desactivar las etiquetas de grupo en las tarjetas de ejercicios y en la tabla general.
- **👨‍🏫 Filtro de Profesores**: Casilla para incluir o excluir a los profesores. Al excluirlos, los líderes de referencia y las puntuaciones de los alumnos se recalculan automáticamente en tiempo real.
- **📅 Evaluaciones Consolidadas por Período**: Soporte para ciclos mensuales o evaluaciones periódicas mediante archivos JSON independientes.

---

## 📐 Cálculo Detallado de Métricas y Puntuaciones

El leaderboard procesa los datos en dos niveles: las **clasificaciones individuales por ejercicio** y las **posiciones generales**.

### 1. Clasificación por Ejercicio (Ranking Individual)
* **Ordenamiento**: Los atletas se ordenan de mayor a menor según el número de repeticiones.
* **Empates**: Si dos o más atletas obtienen la misma marca, **comparten el mismo puesto** (por ejemplo, si dos atletas empatan en el 1º lugar, ambos reciben la medalla de oro 🥇; el siguiente atleta pasa al puesto 3º).
* **Ausencias**: Si un atleta no realizó un ejercicio o no tiene registro válido, se omite de esa columna sin alterar las posiciones de los demás.

---

### 2. Criterios de Puntuación General ([`criterios.js`](criterios.js))

La tabla general unifica el rendimiento de todos los ejercicios evaluados. El sistema cuenta con dos criterios (configurables y modulares):

#### A. PUNTOS FIJOS (`pos`) — *Estilo Competición Tradicional*
Premia exclusivamente la **posición obtenida** en cada ejercicio, independientemente de la diferencia numérica de repeticiones contra el rival.

* **Escala de puntos por puesto**:
  | Puesto | Puntos | Puesto | Puntos |
  | :---: | :---: | :---: | :---: |
  | **1º** | 10 pts | **6º** | 4 pts |
  | **2º** | 8 pts | **7º** | 3 pts |
  | **3º** | 7 pts | **8º** | 2 pts |
  | **4º** | 6 pts | **9º** | 1 pt |
  | **5º** | 5 pts | **10º+** | 0 pts |

* **Fórmula**:
  $$\text{Puntaje Total} = \sum_{i=1}^{n} \text{Puntos}(\text{puesto}_i)$$
* **Visualización**: Se muestra como número entero redondeado.

---

#### B. BALANCEADO (`geom`) — *Media Geométrica de Ratios*
Diseñado bajo el principio de que **para ser el mejor atleta general, hay que ser bueno en todo y no tener puntos débiles**. Penaliza descuidar una disciplina o tener un rendimiento nulo en algún ejercicio.

* **Paso 1 (Ratio relativo por ejercicio)**:
  Para cada ejercicio $i$, se calcula el porcentaje de rendimiento respecto al líder absoluto de ese ejercicio:
  $$r_i = \frac{v_{\text{atleta}}}{v_{\text{líder}}}$$
  *(donde $r_i$ toma valores entre $0$ y $1$)*.

* **Paso 2 (Media geométrica)**:
  Se calcula la raíz $n$-ésima del producto de todos los ratios ($n$ = total de ejercicios evaluados) y se expresa en escala porcentual de 0 a 100:
  $$\text{Score} = \left( \prod_{i=1}^{n} r_i \right)^{\frac{1}{n}} \times 100$$

* **Comportamiento clave**:
  - Si un atleta obtiene el 1º lugar en todos los ejercicios ($r_i = 1.0$), su puntuación es de **100 PTS**.
  - Si un atleta no realiza un ejercicio o tiene $0$ repeticiones ($r_i = 0$), el producto total es $0$, incentivando la constancia integral.
  - Una ventaja descomunal en un solo ejercicio no compensa una baja marca en otro debido a las propiedades de la media geométrica frente a la media aritmética.
* **Visualización**: Se muestra con 1 decimal (ej. `84.5 PTS`).

<!--
#### C. RELATIVO AL LÍDER (`rel`) — *Suma Ponderada Proporcional*
Distribuye un total de **100 puntos posibles** en partes iguales entre la cantidad de ejercicios evaluados ($n$). Cada ejercicio aporta hasta $\frac{100}{n}$ puntos en proporción directa a la marca del primer puesto.

* **Fórmula**:
  $$\text{Puntos}_i = \left( \frac{v_{\text{atleta}}}{v_{\text{líder}}} \right) \times \left( \frac{100}{n} \right)$$
  $$\text{Score} = \sum_{i=1}^{n} \text{Puntos}_i$$

* **Diferencia con el criterio Balanceado**:
  Al ser una sumatoria lineal, permite compensar un rendimiento regular en una disciplina con un rendimiento sobresaliente en otra.
* **Visualización**: Se muestra con 1 decimal (ej. `78.2 ÍNDICE`).

---
-->

### 3. Desempates en la Tabla General
Si dos o más atletas terminan con el mismo puntaje general (evaluado con una tolerancia de $\pm 0.001$), **comparten el mismo puesto** en la tabla general.

---

## 📁 Estructura del Repositorio

```text
cpw-leaderboard/
│
├── index.html              # Aplicación principal y renderizador SVG
├── leaderboard.html        # Vista sincronizada del leaderboard
├── criterios.js            # Definición y fórmulas de los sistemas de puntuación
│
├── fonts/                  # Fuentes Segoe UI locales para exportación vectorial/PDF
│   ├── segoeui.ttf         # Regular (400)
│   ├── segoeuib.ttf        # Bold (700)
│   ├── seguibl.ttf         # Black (900)
│   └── seguibli.ttf        # Black Italic (900 Italic)
│
├── data/
│   ├── ejercicios.json     # Catálogo de ejercicios disponibles
│   ├── periodos.json       # Lista de períodos / evaluaciones disponibles
│   └── registros/          # Evaluaciones detalladas por período
│       ├── 2026-09.json
│       └── 2026-10.json
│
└── .gitignore              # Exclusión de node_modules y archivos del sistema
```

---

## ⚙️ Cómo Agregar Nuevos Registros

### 1. Crear el archivo JSON del período
Crea un archivo en `data/registros/` nombrado con el código del ciclo (por ejemplo, `data/registros/2026-11.json`):

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
      "name": "Maxi",
      "grupo": "LMV1730",
      "fecha": "2026-11-16",
      "es_profe": false,
      "results": {
        "dominadas_pronas": 13,
        "fondos": 23,
        "lagartijas": 41,
        "dominadas_supinas": 10
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
> - `name` (string): Nombre a mostrar en el ranking.
> - `grupo` (opcional): Código del turno o grupo (ej. `"LMV1730"`, `"MJ1900"`).
> - `fecha` (opcional): Fecha en formato `YYYY-MM-DD` en la que el atleta rindió la prueba.
> - `es_profe` (booleano): Indica si es profesor (`true`) o alumno (`false`).
> - `results` (objeto): Claves con el ID del ejercicio y valores numéricos de repeticiones.

### 2. Registrar el nuevo período
Edita `data/periodos.json` y agrega el nuevo período al inicio de la lista:

```json
[
  { "id": "2026-11", "nombre": "Noviembre 2026" },
  { "id": "2026-10", "nombre": "Octubre 2026" },
  { "id": "2026-09", "nombre": "Septiembre 2026" }
]
```

La aplicación detectará automáticamente el período, los ejercicios presentes y los turnos existentes.

---

## 🔧 Personalización de Criterios (`criterios.js`)

Cada criterio en [`criterios.js`](criterios.js) puede ser configurado o ampliado:

* **Habilitar / Deshabilitar**:
  ```javascript
  pos: {
    id: 'pos',
    enabled: true, // Si es false, no aparece en el selector ni se calcula
    ...
  }
  ```
* **Formato de Subtítulos**:
  - Salto de línea simple: `\n`.
  - Párrafo nuevo con espaciado vertical: `\n\n`.
  - El motor SVG ajusta las líneas automáticamente mediante un algoritmo de *word-wrap* centrado.

---

## 🚀 Ejecución Local

Dado que la aplicación realiza peticiones `fetch` para cargar los archivos JSON y las fuentes tipográficas locales, debe servirse mediante un servidor HTTP local:

### Con Node.js:
```bash
npx serve .
```

### Con Python:
```bash
python -m http.server 8000
```

Luego abre en tu navegador `http://localhost:3000` (o `http://localhost:8000`).

---

## 🌐 Despliegue

El proyecto se encuentra alojado y publicado a través de **GitHub Pages**. Cualquier cambio enviado a la rama `main` mediante `git push` se actualiza de forma automática en el sitio web en vivo.
