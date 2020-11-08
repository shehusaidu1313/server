const express = require('express');
const fs  = require('fs');

const app = express();


app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

// logger middleware
app.use((req, res, next) => {
    let now = new Date().toDateString();
    let log = `${now}: ${req.method}, ${req.url}`;
    
    console.log(log)
    // Create a file name 'server.log', start each log on new line '\n' 
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('unable to append server.log.')
        }
    })
    next()
})

// // maintenance middleware
// app.use((req, res, next)=> {
//     res.render('maintenance', {
//         pageTitle: 'Maintenance Page',
//         currentYear: new Date().toDateString()
//     })

//     next()// run the next code
// })

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        currentYear: new Date().toDateString()

    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        pageTitle: 'About page',
        welcomeMessage: 'Welcome to my home page',
        currentYear: new Date().toDateString()
    })
})

app.get('/bad', (req, res) => {
    res.send({
       message:"you have reach the bad route"
    })
})



app.listen(3000, () => {
    console.log('Server started...')
})