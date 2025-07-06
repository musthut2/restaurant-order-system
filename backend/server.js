const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'restaurant'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Routes
app.get('/', (req, res) => res.send('API Running'));

app.use('/api/menu', require('./routes/menu')(db));
app.use('/api/tables', require('./routes/table')(db));
app.use('/api/orders', require('./routes/order')(db));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
