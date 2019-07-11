const mongoose = require('mongoose')


// const base_url = 'mongodb://barbearia:barbearia2019@ds231387.mlab.com:31387/'
mongoose.connect('mongodb://barbearia:barbearia2019@ds231387.mlab.com:31387/barbearia',{
    useNewUrlParser: true,
}).then(() => {
    console.log('Successful connection to the database...')
}).catch((err) => {
    console.log(`ERROR: ${err}`)
})

mongoose.Promise = global.Promise

module.exports = mongoose