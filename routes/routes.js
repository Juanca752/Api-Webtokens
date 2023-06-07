const pool = require('../data/config');
const jwt = require('jsonwebtoken');

const secretKey = 'mi_clave_secreta';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // Si el token es válido, puedes acceder a los datos decodificados en decoded
    req.user = decoded;
    next();
  });
};

const router = app => {
  // Mostrar mensaje de bienvenida en la raíz
  app.get('/', (request, response) => {
    response.send({ message: 'Bienvenido a Juan Carlos Guerrero con Node.js Express REST API!' });
  });

  // Rutas de usuarios
  app.get('/users', verifyToken, (request, response) => {
    pool.query('SELECT * FROM users', (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.get('/users/:id', verifyToken, (request, response) => {
    const id = request.params.id;

    pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.post('/users', verifyToken, (request, response) => {
    pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
      if (error) throw error;

      response.status(201).send(`User added with ID ${result.insertedId}`);
    });
  });

  app.put('/users/:id', verifyToken, (request, response) => {
    const id = request.params.id;

    pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
      if (error) throw error;

      response.send('User updated successfully.');
    });
  });

  app.delete('/users/:id', verifyToken, (request, response) => {
    const id = request.params.id;

    pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
      if (error) throw error;

      response.send('User deleted.');
    });
  });

  // Rutas de productos
  app.get('/productos', verifyToken, (request, response) => {
    pool.query('SELECT * FROM productos', (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.get('/productos/:id', verifyToken, (request, response) => {
    const id = request.params.id;

    pool.query('SELECT * FROM productos WHERE id = ?', id, (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.post('/productos', verifyToken, (request, response) => {
    pool.query('INSERT INTO productos SET ?', request.body, (error, result) => {
      if (error) throw error;

      response.status(201).send(`Producto added with ID ${result.insertedId}`);
    });
  });

  app.put('/productos/:id', verifyToken, (request, response) => {
    const id = request.params.id;

    pool.query('UPDATE productos SET ? WHERE id = ?', [request.body, id], (error, result) => {
      if (error) throw error;

      response.send('Product updated successfully.');
    });
  });

  app.delete('/productos/:id', verifyToken, (request, response) => {
    const id = request.params.id;

    pool.query('DELETE FROM productos WHERE id = ?', id, (error, result) => {
      if (error) throw error;

      response.send('Product deleted.');
    });
  });

};

module.exports = router;