Alumnos = new Mongo.Collection('alumnos');
alumnosPuedeModificar=function(userId,doc){
  if(userId && Roles.userIsInRole(userId, ['admin']))
    return true;
  else
    return false
}

Alumnos.allow({
  insert: alumnosPuedeModificar,
  update: alumnosPuedeModificar,
  remove: alumnosPuedeModificar
});
