if (Meteor.users.find().count() === 0) {
  var usuarios = [
      {nombre:"Administrador",usuario:"admin",contrasenia:"admin",roles:['admin']},
      {nombre:"Fran Melendo",usuario:"fran",contrasenia:"fran",roles:['tutor']},
      {nombre:"Virginia Milan",usuario:"virgi",contrasenia:"virgi",roles:['tutor']},
      {nombre:"Jefe Estudios",usuario:"jefe",contrasenia:"jefe",roles:['jefe']}
    ];
    var cursos=[
      {curso:"1º ESO A",tutor:"fran"},
      {curso:"1º ESO B", tutor:"virgi"}
    ];
    var alumnos=[
      {nombre:"Ermenegildo Perez Romero",curso:"1º ESO A"},
      {nombre:"Francisco Gómez Gonzalez",curso:"1º ESO A"},
      {nombre:"Antonio Carmona Pérez",curso:"1º ESO B"},
      {nombre:"Saray González Fernández",curso:"1º ESO B"}
    ];
    var partes=[
      {curso: '1º ESO A', alumno:"Francisco Gómez Gonzalez",fecha:"2015-11-05T11:30:00+01:00", profesor: 'fran',gravedad: 'Leve',comentario: 'El niño ha tirado un papel al suelo'},
      {curso: '1º ESO A', alumno:"Ermenegildo Perez Romero",fecha:"2015-11-06T12:54:00+01:00", profesor: 'virgi',gravedad: 'Grave',comentario: 'El niño ha tirado un papel a la cara del compañero'},
      {curso: '1º ESO B', alumno:"Antonio Carmona Pérez",fecha:"2015-11-04T12:54:00+01:00", profesor: 'fran',gravedad: 'Grave',comentario: 'Ha tirado un avión de papel en la clase'},
      {curso: '1º ESO B', alumno:"Antonio Carmona Pérez",fecha:"2015-11-03T12:54:00+01:00", profesor: 'virgi',gravedad: 'Muy Grave',comentario: 'Ha pegado un puñetazo a otro alumno'},
      {curso: '1º ESO B', alumno:"Saray González Fernández",fecha:"2015-11-01T12:54:00+01:00", profesor: 'fran',gravedad: 'Leve',comentario: 'No ha traido las tareas de casa'},
      {curso: '1º ESO A', alumno:"Ermenegildo Perez Romero",fecha:"2015-11-02T12:54:00+01:00", profesor: 'fran',gravedad: 'Grave',comentario: 'Ha insultado al profesor'}
    ]

//AÑADIR USUARIO
  for (i = 0; i < usuarios.length; i++) {
    usuarios[i].id = Accounts.createUser({
      username: usuarios[i].usuario,
      password: usuarios[i].contrasenia,
      profile: { name: usuarios[i].nombre }
    });
    if (usuarios[i].roles.length > 0) {
      Roles.addUsersToRoles(usuarios[i].id,usuarios[i].roles);//, 'default-group');
    }
  }
//CURSOS
  for (i = 0; i < cursos.length; i++) {
    cursos[i].id=Cursos.insert({
      curso: cursos[i].curso,
      tutor: Meteor.users.findOne({username:cursos[i].tutor})._id
    });

  }

//ALUMNOS
  for (i = 0; i < alumnos.length; i++) {
    Alumnos.insert({
      nombre: alumnos[i].nombre,
      curso: Cursos.findOne({curso:alumnos[i].curso})._id
    });
  }
//PARTES
  for (i = 0; i < partes.length; i++) {
    Partes.insert({
        curso_id: Cursos.findOne({curso:partes[i].curso})._id,
        curso: partes[i].curso,
        fecha: partes[i].fecha,
        alumno_id: Alumnos.findOne({nombre: partes[i].alumno})._id,
        alumno: Alumnos.findOne({nombre: partes[i].alumno}).nombre,
        profesor_id: Meteor.users.findOne({username:partes[i].profesor})._id,
        profesor: Meteor.users.findOne({username:partes[i].profesor}).profile.name,
        gravedad: partes[i].gravedad,
        comentario: partes[i].comentario
      });
  }

}
