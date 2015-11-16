var Schemas = {};

Schemas.Cursos = new SimpleSchema({
    curso: {
        type: String,
        label: "Curso"
    },
    tutor: {
        type: String,
        label: "Tutor",
        optional: true
    }
});

Cursos = new Mongo.Collection('cursos');
Cursos.attachSchema(Schemas.Cursos);

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
