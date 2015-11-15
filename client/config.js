Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
accountsUIBootstrap3.setLanguage('es');
accountsUIBootstrap3.logoutCallback = function(error) {
  if(error) console.log("Error:" + error);
  Router.go('home');
}
