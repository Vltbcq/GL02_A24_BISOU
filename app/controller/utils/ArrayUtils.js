/**
 * Clone un tableau pour obtenir une version équivalente de celui-ci sans références
 * @param arr {[]} - Tableau à cloner
 * @returns {[]} - Clone du tableau
 */
function cloneArray(arr) {
    return JSON.parse(JSON.stringify(arr));
}

module.exports = cloneArray;