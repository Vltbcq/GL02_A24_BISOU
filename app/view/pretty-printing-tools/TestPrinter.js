

/**
 * Retourne sous forme de string les informations concernant un examen
 * @param test {Test} - Test à afficher
 * @return {string} - Chaîne de caractères "human-readable"
 */
function prettyTest(test) {
    const testString = `Test : ${test.name}`;
    let questionString = "Questions :";
    for (const question of test.questions) {
        questionString += `\n- ${question.question}`;
    }
    return `${testString}\n${questionString}`;
}

/**
 * Retourne sous forme de string les informations concernant une série d'examens
 * @param tests {Test[]} - Les examens à afficher
 * @return {string} - Chaîne de caractères "human-readable"
 */
function prettyTestList(tests) {
    const separator = "\n--------------------------------------------------";
    let message = "Tests in memory :";
    for (const test of tests) {
        message += `${separator}\n${prettyTest(test)}`;
    }
    return message;
}

module.exports = {
    prettyTest : prettyTest,
    prettyTestList : prettyTestList
}