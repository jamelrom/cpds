Cursos = new Mongo.Collection('cursos');

cursosPuedeModificar=function(userId,doc){
  if(userId && Roles.userIsInRole(userId, ['admin']))
    return true;
  else
    return false
}

Cursos.allow({
  insert: cursosPuedeModificar,
  update: cursosPuedeModificar,
  remove: cursosPuedeModificar
});
