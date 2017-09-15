var serverUrl = "http://localhost/e-presents/server/";
var totalPerkuliahan = 0;
var totalAlat = 0;
$(document).ready(function(){
  getPerkuliahan();
  getTotalMhs();
  getAlatAktif();
  $('#tglNow').html(getDate());
  setInterval(function(){
    getPerkuliahan();
    getTotalMhs();
    getAlatAktif();
  }, 3000)
  $('#panelListAlat').click(function(){
    $('#panelList').modal('toggle');
    if(totalAlat == 0){
      $('#pesan').html("<p class='text-success text-center'>Belum ada Kelas Mulai</p>'");
    } else {
      $('#pesan').html("<p class='text-success text-center'>Alat Ada yang aktif</p>'");
    }
  })
})

function getDate(){
  var hari = [
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
  ];
  var tgl = new Date();
  var dd = tgl.getDate();
  var mm = tgl.getMonth()+1;
  var yyyy = tgl.getFullYear();
  var hr = tgl.getDay();
  var day = hari[hr];
  if(dd < 10){
    dd = '0' + dd;
  }
  if(mm < 10){
    mm = '0' + mm;
  }
  tgl = day + ', ' + dd + '/' + mm + '/' + yyyy;
  return tgl;
}

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

function getAlatAktif(){
  $.ajax({
    method: 'GET',
    url: serverUrl + 'dashboard/cek-alat-aktif.php',
    success: function(res){
      var dt = JSON.parse(res);
      console.log(res)
      $('#totalAK').html(dt)
      totalAlat = dt;
    },
    error: function(res){
      console.log(res)
    }
  })
}
