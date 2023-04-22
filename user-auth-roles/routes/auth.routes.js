const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('./../models/User.model')
const { isLoggedOut, isLoggedIn } = require('../middlewares/route-guard')

const saltRounds = 10


// Signup form render
router.get('/sign-up', isLoggedOut, (req, res) => {
  res.render('auth/signup-form')
})

// Signup form controller. Check if user does not exists and generate hashed password.
// 1. bcrypt.genSalt(saltRounds)
// 2. bcrypt.hash(password, salt)
router.post('/sign-up', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if(!username || !email || !password) {
      res.render('auth/signup-form', { errorMessage: "Por favor rellena todos los campos."})
      return
    }

    const user = await User.findOne({ $or: [{ username }, { email }] }); 
    if(user){
      res.render('auth/signup-form', { errorMessage: "El usuario y/o el email están en uso."})
      return
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await User.create({ username, email, password:hashedPassword });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
})


// Login form render
router.get('/login', isLoggedOut,(req, res) => {
  res.render('auth/login-form')
})


// Login form controller. Check if user exists and check if password matches: bcrypt.compareSync
// Login action -> req.session.currentUser = user
router.post('/login', async (req, res, next) => {
  try{
    const { email, password } = req.body;
    if(!email || !password) {
      res.render('auth/login-form', { errorMessage: "Por favor rellena todos los campos."})
      return
    }

    const user = await User.findOne({ email });
    if(!user){
      res.render('auth/login-form', { errorMessage: "Usuario o contraseña incorrectos."});
      return
    }
    if(!bcrypt.compareSync(password, user.password)){
      res.render('auth/login-form', { errorMessage: "Usuario o contraseña incorrectos."});
      return
    }

    // Hacemos el inicio de sesión
    req.session.currentUser = user;
    res.redirect('/');

  } catch(error){
    next(error);
  }
})


router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('auth/profile');
})



// Logout controller -> req.session destroy method
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
})



module.exports = router