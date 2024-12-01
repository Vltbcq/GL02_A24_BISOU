/**
 * Clone un tableau pour obtenir une version équivalente de celui-ci sans références
 * @param obj {[]} - Tableau à cloner
 * @returns {[]} - Clone du tableau
 */
function deepCloneArray(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepCloneArray(obj[key]);
        }
    }

    return clone;
}

module.exports = deepCloneArray;