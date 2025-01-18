import express from 'express'
const app = express()
const port = 3000

// app.get('/', (req,res) => {
//     res.send("Learning Backend is FUN!")
// })

// app.get('/learn', (req,res) => {
//     res.send("Express learning in process...")
// })

// app.get('/test', (req,res) => {
//     res.send("Testing Nodemon")
// })

app.use(express.json())

let teaData = []
let nextValue = 1

app.post('/teas', (req, res) => {
    const {name, price} = req.body
    const newTea = {id: nextValue++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get('/teas', (req,res) => {
    res.status(200).send(teaData)
})

app.get('/teas/:id', (req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(400).send('Tea not found')
    }
    res.status(200).send(tea)
})

app.put('/teas/:id', (req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(400).send("Tea not found")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

app.delete('/teas/:id', (req, res) => {
    const teaIndex = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(teaIndex === -1){
        return res.status(400).send('tea not found')
    }
    teaData.splice(teaIndex,1)
    return res.status(200).send(teaData)
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})