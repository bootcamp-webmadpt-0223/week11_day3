const isLoggedIn = (req, res, next) => {
  if(req.session.currentUser){
    next();
  } else {
    res.render('auth/login-form', { errorMessage: 'Debes iniciar sesión.'})
    return
  }
}

const isLoggedOut = (req, res, next) => {
  if(req.session.currentUser){
    res.redirect('/auth/profile')
  } else {
    next()
  }
}

// const isUser = (req, res, next) => {
//   if(req.session.currentUser === 'USER'){
//     next();
//   } else {
//     res.render('auth/login-form', { errorMessage: 'No tienes permisos.'})
//   }
// }

// const isEditor = (req, res, next) => {
//   if(req.session.currentUser === 'EDITOR'){
//     next();
//   } else {
//     res.render('auth/login-form', { errorMessage: 'No tienes permisos.'})
//   }
// }

// const isAdmin = (req, res, next) => {
//   if(req.session.currentUser === 'ADMIN'){
//     next();
//   } else {
//     res.render('auth/login-form', { errorMessage: 'No tienes permisos.'})
//   }
//

const checkRole = (roles=[]) => (req, res, next) => {
  if(roles.includes(req.session.currentUser.role)){
    next()
  } else {
    res.render('auth/login-form', { errorMessage: 'No tienes permisos.'})
  }
}

module.exports = { isLoggedIn, isLoggedOut, checkRole };