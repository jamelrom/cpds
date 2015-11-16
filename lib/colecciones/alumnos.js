var Schemas = {};

Schemas.Alumnos = new SimpleSchema({
    nombre: {
        type: String,
        label: "Nombre"
    },
    curso: {
        type: String,
        label: "Curso",
        optional: true
    }
});



Alumnos = new Mongo.Collection('alumnos');
Alumnos.attachSchema(Schemas.Alumnos);


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
