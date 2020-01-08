const fs =  require('fs');   // requerimos filesisten
const path =  require('path');   // requerimos filesisten

const userController = {

    register: function (req, res) { 
       
        res.render('register')
   
    },

    login: function (req, res) { 
       
        res.render('login')

    },
    
    list: function (req, res){

        let users =  [
            {id: 1, name:"Dario"},
            {id: 2, name:"Carlos"},
            {id: 3, name:"ramon"},
            {id: 4, name:"chapulin"}
        ];

        res.render('userList', {users: users});

    },

    search: function (req, res){

        let loQueBuscoElUsuario = req.query;
        res.send(loQueBuscoElUsuario);

    },

    create: function(req, res) {
        
        let usuario ={

            nombre:  req.body.nombre,    // *** req.body ***   nos trae la informacion obtenida en el formulario si agregamos *** nombre *** ( req.body.nombre)
            correo:  req.body.email,
            contraseña: req.body.contraseña
            
        }; 

       //  GUARDARLA
        
       /* let usuarioJSON = JSON.stringify(usuario); // convertimos un objeto literal a string
          fs.writeFileSync('usuarios.json',usuarioJSON); // escribimos con la variable obtenida usuarioJESON y la guardamos en un archivo nuevo llamado  // usuarios.json //
          res.redirect('/users/list');
       */
        let ubicacionArchivo = path.join(__dirname, '../data/users.json');
        let archivoUsuario = fs.readFileSync(ubicacionArchivo ,{encoding: 'utf-8'});
        let usuarios = [];
        if(archivoUsuario != '') {
            
            usuarios = JSON.parse(archivoUsuario);

        }
        let ultimoUsuario = usuarios[usuarios.length - 1];
        req.body = {
            id: ultimoUsuario.id + 1,
			...req.body
		};

        usuarios.push(req.body);

        usuariosJSON = JSON.stringify(usuarios, null, ' ');
        fs.writeFileSync(ubicacionArchivo, usuariosJSON);
        res.send('¡Creaste tu usuario con éxitooooo!');


    },

    edit: function(req,res){
        const idUser = req.params.idUser ;

        const users = [
            {id: 1, name:"Dario"},
            {id: 2, name:"Carlos"},
            {id: 3, name:"ramon"},
            {id: 4, name:"chapulin"}
        ];

        const userToEdit = users[idUser];
        res.render('userEdit', {userToEdit : userToEdit});

    },
   

};

module.exports = userController;