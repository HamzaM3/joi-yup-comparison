function randomAlphabeticString(len = 10) {
    return (new Array(len)).fill(0).map(x => {
        let r = Math.random()*26*2;
        return Math.floor(r) + (r < 26 ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0) - 26)
    }).map(x=> String.fromCharCode(x)).join('')
}

function randomNumberObject(len = 10) {
    const keys = (new Array(len)).fill(0).map(x => randomAlphabeticString(10))
    const res = {}
    keys.forEach(key => res[key] = Math.random() * 1000)
    return res
}

function randomArray(len = 10) {
    return (new Array(len)).fill(0).map(x => Math.random() * 1000)
}

module.exports = { randomAlphabeticString, randomNumberObject, randomArray }