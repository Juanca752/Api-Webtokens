const pool = require ('../data/config');


// ruta de la app
const router = app =>{
    //mostrar mensaje de bienvenida a rooot
    app.get('/',(request, response)=>{
        response.send({ message: 'Bienvenido a Juan Carlos Guerrero con Node.js Express REST API!' });
    });

    app.get('/users',(request, response)=>{
        pool.query('SELECT * FROM users',(error,result)=>{
            if(error) throw error;
    
            response.send(result);
        });
    });


    //Mostrar un solo usuario por ID 
app.get('/users/:id',(request,response)=>{
    const id = request.params.id;

    pool.query('Select * FROM users WHERE id = ?',id,(error,result)=>{
        if(error) throw error;
    
        response.send(result);
    });
});

//Agregar un nuevo usuario
app.post('/users',(request,response)=>{
    pool.query('INSERT INTO users SET ?',request.body,(error,result)=> {
        if(error) throw error;
    
        response.status(201).send(`User added with ID ${result.insertedId}`);
    });
});

//Actualizar un usaurio exitente
app.put('/users/:id',(request, response)=>{
    const id = request.params.id;
    pool.query('UPDATE users SET ? WHERE id=?', [request.body, id], (error, result)=>{
        if (error) throw error;

        response.send('Users updated successfully. ');
    });
});

//Eliminar un usuario
app.delete('/users/:id', (request,response) =>{
    const id = request.params.id;
    pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        response.send('User Deleted.')
    });
});

//Tabla Productos
app.get('/productos',(request, response)=>{
    pool.query('SELECT * FROM productos',(error,result)=>{
        if(error) throw error;

        response.send(result);
    });
});


//Mostrar un solo usuario por ID 
app.get('/productos/:id',(request,response)=>{
const id = request.params.id;

pool.query('Select * FROM productos WHERE id = ?',id,(error,result)=>{
    if(error) throw error;

    response.send(result);
});
});

//Agregar un nuevo usuario
app.post('/productos',(request,response)=>{
pool.query('INSERT INTO productos SET ?',request.body,(error,result)=> {
    if(error) throw error;

    response.status(201).send(`Producto added with ID ${result.insertedId}`);
});
});

//Actualizar un usaurio exitente
app.put('/productos/:id',(request, response)=>{
    const id = request.params.id;
    pool.query('UPDATE productos SET ? WHERE id=?', [request.body, id], (error, result)=>{
        if (error) throw error;

        response.send('Products updated successfully. ');
    });
});

//Eliminar un usuario
app.delete('/productos/:id', (request,response) =>{
    const id = request.params.id;
    pool.query('DELETE FROM productos WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        response.send('User Deleted.')
    });
});

}


module.exports=router;