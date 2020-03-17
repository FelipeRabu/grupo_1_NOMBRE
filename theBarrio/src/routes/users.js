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


// ************ Controller Require ************
const usersController = require('../controllers/usersController');

// ************ Middlewares ************
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const logDBMiddleware = require('../middlewares/logDBMiddleware');

// ========= RUTAS DE USUARIOS =========

//REGISTER
router.get('/register', guestMiddleware, usersController.register);

//Prueba multer
//router.post('/register', upload.single('avatar'), usersController.store);

//Prueba express-validator
router.post('/register', logDBMiddleware, [
	check('first_name').isLength({min:2}).withMessage("El nombre debe tener como minimo 2 caracteres"),
	check('last_name').isLength({min:2}).withMessage("El apellido debe tener como minimo 2 caracteres"),
	check('email').isEmail().withMessage("Tiene que ser un email valido"),
	check('password').isLength({min:8}).withMessage("La constraseña debe tener como minimo 8 caracteres"),
] ,usersController.store);

//LOGIN
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.processLogin);  //para pedir visualizar login

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