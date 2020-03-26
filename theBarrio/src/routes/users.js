// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {check, validationResult, body} = require('express-validator'); //Express validator para validar el back


//Para poder guardar las imagenes que sube el usuario (Ej foto de perfil)
const diskStorage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, path.join(__dirname, '../../public/images/avatars'));
	},
	filename: function(req, file, cb){
		let userName = req.body.first_name.replace(/ /g, '_').toLowerCase();
		let imageFinalName = userName + '_' + Date.now() + path.extname(file.originalname);
		cb(null, imageFinalName);
	}
});
const upload = multer({ storage: diskStorage });

//Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
const db = require('../database/models')
const sequelize = db.sequelize

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

// ************ Middlewares ************
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
// ========= RUTAS DE USUARIOS =========

//REGISTER
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('avatar'), [
	check('first_name').isLength({min:2}).withMessage("El nombre debe tener como minimo 2 caracteres"),
	check('last_name').isLength({min:2}).withMessage("El apellido debe tener como minimo 2 caracteres"),
	check('email').isEmail().withMessage("Tiene que ser un email valido"),
	check('password').isLength({min:8}).withMessage("La constraseña debe tener como minimo 8 caracteres"),
	check('email').custom(function(value){
		return db.Users
			.findAll({
				where: {
					email: value
				}
			})
			.then(user => { 
				if (user.length>0) {	
					return Promise.reject('Ya existe un usuario con ese email');
				}
            })
	}),



	
	
	body('avatar').custom((value, { req }) => {
		
		console.log("=====================NOMBRE DE LA IMAGEN======================")
		console.log(value)
		console.log(req.body)
		console.log("===========================================")

	}),
	

	/*
	check('avatar').custom(function(value){

		console.log("=====================NOMBRE DE LA IMAGEN======================")
		console.log(value)
		console.log("===========================================")

		let avatarExtension = inputValue.substring(inputValue.lastIndexOf('.') + 1).toLowerCase()

		if ((avatarExtension != "jpg" && avatarExtension != "png" && avatarExtension != "gif" && avatarExtension != "jpeg")) {

			console.log("=====================ENTRE AL IF PORQUE ESTA MAL LA EXT DE LA IMG======================")

		}

	}),
	*/

	], usersController.store);

//LOGIN
//router.get('/login', authMiddleware, usersController.login);
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', [
			check('email').isEmail().withMessage("Tiene que ser un email valido"),
			check('email').not().isEmpty().withMessage("Tiene que ser un email valido"),
			check('password').not().isEmpty().withMessage("No ingresaste una contraseña"),
], usersController.processLogin);

//LOGOUT
router.get('/logout', usersController.logout);

//LIST
router.get('/list', usersController.list);

//PERFIL
router.get('/profile', authMiddleware, usersController.profile);

//EDITAR
router.get('/edit/:userId', usersController.edit); 
router.post('/edit/:userId', usersController.update);

//ELIMINAR 
router.post('/delete/:userId', usersController.destroy);

module.exports = router;