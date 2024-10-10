const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const cors = require('cors');
const urlOrigin = 'http://localhost:3000'


app.use(cors());
app.use(bodyParser.json());
app.use(cors({
    origin: urlOrigin  // Cambia por el origen de tu frontend
  }));

const filePath = './data.json';

// Obtener todos los elementos
app.get('/items', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(data);
});

// Obtener un elemento por ID
app.get('/items/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const item = data.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Agregar nuevo elemento
app.post('/items', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.json(newItem);
});

// Actualizar elemento
app.put('/items/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const index = data.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Eliminar elemento
app.delete('/items/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data = data.filter(i => i.id !== parseInt(req.params.id));
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.json({ message: 'Item deleted' });
});

app.listen(3001, () => {
  console.log('API running on http://localhost:3000');
});
