Template.parteElemento.helpers({
  leve: function(){
    return this.gravedad === 'Leve';
  },
  grave: function(){
    return this.gravedad === 'Grave';
  },
  muygrave: function(){
    return this.gravedad === 'Muy Grave';
  }
})
