Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY' //la autentificación se hará por usuario/contraseña
});
accountsUIBootstrap3.setLanguage('es'); //el acceso estará en español
accountsUIBootstrap3.logoutCallback = function(error) { //al deslogearse del sistema redirigimos a la ruta home, para que no quede en la dirección del navegador ninguna url
  if(error) console.log("Error:" + error);
  Router.go('home');
}
