module.exports = new Date().toLocaleString('en-GB').split(' ')[0].slice(0, -1).split('/').reverse().join('-')

