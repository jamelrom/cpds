if (Meteor.users.find().count() === 0) {
  var usuarios = [
      {nombre:"Administrador",usuario:"admin",contrasenia:"admin",roles:['admin']},
      {nombre:"Fran Melendo",usuario:"fran",contrasenia:"fran",roles:['tutor']},
      {nombre:"Jefe Estudios",usuario:"jefe",contrasenia:"jefe",roles:['jefe']}
    ];
    var cursos=[
      {curso:"1º ESO A",tutor:"fran"}
    ];
    var alumnos=[
      {nombre:"Ermenegildo Perez",curso:"1º ESO A"}
    ];

//AÑADIR USUARIO
  for (i = 0; i < usuarios.length; i++) {
    usuarios[i].id = Accounts.createUser({
      username: usuarios[i].usuario,
      password: usuarios[i].contrasenia,
      profile: { name: usuarios[i].nombre }
    });
    if (usuarios[i].roles.length > 0) {
      Roles.addUsersToRoles(usuarios[i].id,usuarios[i].roles, 'default-group');
    }
  }
//CURSOS
  var eso1aid= Cursos.insert({
    curso: '1º ESO A',
    tutor: Meteor.users.findOne({username:"fran"})._id
  });
  var eso1bid= Cursos.insert({
    curso: '1º ESO B',
    tutor: Meteor.users.findOne({username:"jefe"})._id
  });

//ALUMNOS
  var alumno1=Alumnos.insert({
    nombre: 'Francisco Gómez Gonzalez',
    curso: eso1aid
  });
//PARTES
    Partes.insert({
      curso_id: eso1aid,
      curso: '1º ESO A',
      alumno_id: alumno1,
      alumno: Alumnos.findOne(alumno1).nombre,
      profesor_id: Meteor.users.findOne({username:"fran"})._id,
      profesor: 'Francisco Javier Melendo Roman',
      gravedad: 'Leve',
      comentario: 'El niño ha tirado un papel al suelo'
    });

    Partes.insert({
      curso_id: eso1aid,
      curso: '1º ESO B',
      alumno_id: '1',
      alumno: 'Antonia Garcia Gonzalez',
      profesor_id: Meteor.users.findOne({username:"jefe"})._id,
      profesor: 'Virginia Gonzalez',
      gravedad: 'Grave',
      comentario: 'El niño ha tirado un papel a la cara del compañero'
    });

    Partes.insert({
      curso_id: eso1bid,
      curso: '1º ESO A',
      alumno_id: '1',
      alumno: 'Ermenegildo Parras',
      profesor_id: Meteor.users.findOne({username:"fran"})._id,
      profesor: 'Marisa Perula',
      gravedad: 'Muy Grave',
      comentario: 'El niño ha pegado a lotro compañero'
    });
}
