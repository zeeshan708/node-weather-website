const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const publicDirectoryPath = path.join(__dirname, '../public')

const port = process.env.PORT || 3000 ;

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home page',
        name: 'zeeshan asghar'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Zeeshan Asghar'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
            error: "Please enter a valid address!"
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude } = {}) => {
            if (error) {
               return res.send({ error })
            }
            forecast(latitude, longitude, (error, { temperature, unit, precip } = {}) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    location: req.query.address,
                    temperature: temperature,
                    unit: unit,
                    rain: precip
                })
            })

        })

    }

})
app.get('/products', (req, res) => {

    if (!req.query.search) {
        res.send({
            error: "Pleae enter search query!"
        })
    }
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zeeshan asghar',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zeeshan Asghar',
        errorMessage: 'Page not found'
    })
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})