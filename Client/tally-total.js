window.onload = function(){
  $.ajax({
    url: '/total',
    contex: document.body
  }).done(function(data){
    var totals = JSON.parse(data);
    $('.total').text(totals.total);
    $('.indices').text(totals.indices);
    $('.packages').text(totals.packages);
  });
};
