const cfg = require('./dbcfg').dbcfg;
const mongoose = require('mongoose')
mongoose.connect(cfg.url + cfg.db_name, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Successfully connect to database: ' + cfg.db_name)
})
mongoose.connection.once('close', () => {
    console.log('Connection closed')
})
module.exports = mongoose