var serverUrl = "http://localhost/sb-admin/server/";
var totalPerkuliahan = 0;
$(document).ready(function(){
  getPerkuliahan();
  getTotalMhs();
  setInterval(function(){
    getPerkuliahan();
    getTotalMhs();
  }, 2000)
})

function getPerkuliahan(){
  $.ajax({
    method: 'GET',
    url: serverUrl + 'dashboard/timeline-kehadiran.php',
    success: function(res){
      var data = JSON.parse(res);
      totalPerkuliahan = data.data.length;
      $('#timeline-kehadiran').empty();
      if(data.success){
        $('#totalPK').html(totalPerkuliahan);
        $.each(data.data, function(i, item){
          $('#timeline-kehadiran').append('<li class="list-group-item"><i class="fa fa-user fa-fw"></i> Kelas: <strong>'+ item.KLS +'</strong><span class="pull-right text-muted small"><em>Pukul: <strong>' + item.WTA + '</strong></em></span><br>Dosen: <strong>'+item.DSN+'</strong><br>Mata Kuliah: <strong>'+item.NMK+' - '+ item.SKS +' SKS</strong></li>');
        })
      } else {
        $('#timeline-kehadiran').append('<p class="text-center small text-success">Belum ada Perkuliahan Dimulai!</p>')
      }
    },
    error: function(res){
      console.log(res)
    }
  })
}

function getTotalMhs(){
  $.ajax({
    method: 'GET',
    url: serverUrl + 'dashboard/total-mahasiswa.php',
    success: function(res){
      var total = JSON.parse(res);
      $('#totalMhs').html(parseInt(total));
    },
    error: function(res){
      console.log(res)
    }
  })
}
