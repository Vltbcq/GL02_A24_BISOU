/**
 * Compare l'égalité de deux tableaux (on considère qu'ils doivent être ordonnés de la même façon)
 * @param arr1 {[]} - Premier tableau
 * @param arr2 {[]} - Deuxième tableau
 * @returns {boolean} - Vrai si les deux tableaux sont égaux
 */
function arrayEquals(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
}

module.exports = arrayEquals;