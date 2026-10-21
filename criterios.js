// Criterios de puntuación para el Leaderboard General
// Cada criterio define su etiqueta en el selector, el título de la tarjeta,
// la descripción (subtítulo) y la función que calcula los puntos de un atleta.
//
// PARÁMETRO 'enabled':
// Si se establece en false, ese criterio no es tenido en cuenta (queda completamente
// deshabilitado: no aparece en el selector y se omite en todos los cálculos).

window.SCORING_CRITERIA = {
  pos: {
    id: 'pos',
    enabled: true, // Si es false, este criterio queda deshabilitado
    btnLabel: 'PUNTOS FIJOS',
    cardTitle: 'PUNTOS ACUMULADOS',
    ptsColumnHeader: 'PTS',
    // Escala de puntos por puesto: 1º=10, 2º=8, 3º=7, etc.
    // Si un participante queda del puesto 10º en adelante, recibe 0 pts (o cambia el valor por defecto).
    scale: {
      1: 10,
      2: 8,
      3: 7,
      4: 6,
      5: 5,
      6: 4,
      7: 3,
      8: 2,
      9: 1
    },
    defaultPoints: 0,
    getSubtitle: function (totalAthletes, totalExercises) {
      return 'Como en una competición, se asignan puntos según la posición en la tabla en cada ejercicio y se suman al final. \n\n La puntuación se asigna de la siguiente forma:\n 1º: 10 pts | 2º: 8 pts | 3º: 7 pts | 4º: 6 pts | 5º: 5 pts | 6º: 4 pts | 7º: 3 pts | 8º: 2 pts | 9º: 1 pt';
    },
    formatScore: function (pts) {
      return String(Math.round(pts));
    },
    // Calcula los puntos que aporta un ejercicio:
    // entry = { v: valor_repeticiones, r: posicion_en_ejercicio }
    // col = { list: [atletas_ordenados] }
    calcExercisePoints: function (entry, col, totalAthletes, totalExercises) {
      return this.scale[entry.r] !== undefined ? this.scale[entry.r] : this.defaultPoints;
    }
  },

  rel: {
    id: 'rel',
    enabled: false, // Si es false, este criterio queda deshabilitado
    btnLabel: 'RELATIVO AL LÍDER',
    cardTitle: 'ÍNDICE RELATIVO AL LÍDER',
    ptsColumnHeader: 'ÍNDICE',
    getSubtitle: function (totalAthletes, totalExercises) {
      const maxPerEx = totalExercises > 0 ? (100 / totalExercises).toFixed(1) : 0;
      return `Relativo al líder: cada ejercicio aporta hasta ${+maxPerEx} pts según la marca respecto al 1º`;
    },
    formatScore: function (pts) {
      return pts.toFixed(1);
    },
    // Cada ejercicio aporta hasta (100 / cantidad_ejercicios) en proporción a la marca del 1º
    calcExercisePoints: function (entry, col, totalAthletes, totalExercises) {
      const maxV = col.list[0] ? col.list[0].v : 0;
      if (maxV <= 0) return 0;
      const weight = 100 / totalExercises;
      return (entry.v / maxV) * weight;
    }
  },

  geom: {
    id: 'geom',
    enabled: true, // Si es false, este criterio queda deshabilitado
    btnLabel: 'BALANCEADO',
    cardTitle: 'PUNTUACIÓN BALANCEADA',
    ptsColumnHeader: 'PTS',
    getSubtitle: function (totalAthletes, totalExercises) {
      return `Para ser el mejor, hay que ser bueno en todo, no solo en algunos ejercicios.\n\n El ranking compara el rendimiento de cada atleta con el del mejor en cada ejercicio y luego los combina en un único resultado. De esta forma, un rendimiento destacado en un solo ejercicio no da tanta ventaja si no se obtienen buenos resultados en general.`;
    },
    formatScore: function (pts) {
      return pts.toFixed(1);
    },
    // Proporción individual respecto al líder (de 0 a 1)
    calcExercisePoints: function (entry, col, totalAthletes, totalExercises) {
      const maxV = col.list[0] ? col.list[0].v : 0;
      return maxV > 0 ? (entry.v / maxV) : 0;
    },
    // Calcula la media geométrica de los porcentajes contra el líder en cada ejercicio:
    // (p1 * p2 * ... * pn)^(1/n) expresado en escala porcentual (0 a 100%)
    calcAthleteScore: function (reps, cols, totalAthletes) {
      const n = cols.length;
      if (n === 0) return 0;
      let product = 1;
      let count = 0;
      for (let i = 0; i < n; i++) {
        const c = cols[i];
        const maxV = c.list[0] ? c.list[0].v : 0;
        const rep = reps[i];
        const val = (rep && rep.v > 0) ? rep.v : 0;
        const ratio = maxV > 0 ? (val / maxV) : 0;
        product *= ratio;
        if (val > 0) count++;
      }
      if (count === 0 || product <= 0) return 0;
      return Math.pow(product, 1 / n) * 100;
    }
  }
};
