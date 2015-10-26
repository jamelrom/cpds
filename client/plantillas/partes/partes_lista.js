var partesDatos = [
  {
    alumno: 'Antonio',
    profesor: 'Melendo'
  },
  {
    alumno: 'Jesus',
    profesor: 'Marisa'
  },
  {
    alumno: 'Manolo',
    profesor: 'Rosa'
  }
];
Template.partesLista.helpers({
  partes: partesDatos
});
