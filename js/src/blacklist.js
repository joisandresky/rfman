var serverUrl = "http://localhost/e-presents/server/";

$(document).ready(function(){
  getBlacklistUser();
})

function getBlacklistUser(){
  var  tb = $('#blacklistTable').DataTable({
      processing: true,
      serverSide: true,
      sAjaxSource: serverUrl + 'rfid/user-blacklist.php',
      aoColumns: [
          null,
          null,
          null,
          null
      ]
  });

  $('#blacklistTable tbody').on('click', 'tr', function(){
      if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
      }
      else {
          tb.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
      }
  })

  $('#refreshBtn').click(function(){
      $('#blacklistTable').DataTable().ajax.reload();
  })

  $('#tmbhBtn').click(function(){
    $('#panelTambahData').modal('toggle');
  })

  $('#rfid').keypress(function(e){
    if(e.which == 13){
      var rfid = $('#rfid').val();
      if(rfid != ""){
        swal({
            title: "Yakin ingin Memblacklist RFID : " + rfid + " ?",
            text: "Kamu Akan Memblacklist Kartu ini , Jika Sudah Valid Tekan Yes",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
          },
          function(){
            setTimeout(function(){
              setBlacklist(rfid);
            }, 1800);
        });
      } else {
        swal('Ooppss..!', 'Field Tidak Boleh Kosong!', 'error');
      }
    }
  })

  // Tombol Pemulihan Kartu
  $('#delBtn').click(function(){
    var dt = tb.rows('.selected').data();
    if(dt.length == 0) return;
    var rfid = dt[0][1];
    swal({
        title: "Yakin ingin Memulihkan RFID : " + rfid + " ?",
        text: "Kamu Akan Memulihkan Kartu ini , Jika Sudah Valid Tekan Yes",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
      },
      function(){
        setTimeout(function(){
          pulihkan(rfid);
        }, 1800);
    });
  })
}

function setBlacklist(id){
  var rid = id;
  $.ajax({
    method: 'POST',
    url: serverUrl + 'rfid/set-blacklist.php',
    data: {
      rf_id: id
    },
    success: function(res){
      var data = JSON.parse(res);
      console.log(data);
      if(data.success){
        swal('Saved!', 'RFID : ' + rid + ', Telah Di Blacklist', 'info');
        $('#blacklistTable').DataTable().ajax.reload();
        $('#panelTambahData').modal('hide');
        $('#rfid').val("");
      } else {
        swal('Ooppss..!', data.msg, 'error');
      }
    }
  })
}

function pulihkan(rfid) {
  var rid = rfid;
  $.ajax({
    method: 'POST',
    url: serverUrl + 'rfid/restore-rfid.php',
    data: {
      rf_id: rfid
    },
    success: function(res){
      var dt = JSON.parse(res);
      if(dt.success){
        swal('Success!', 'RFID: '+rfid+', Telah Dipulihkan dari Status Blacklist', 'success');
        $('#blacklistTable').DataTable().ajax.reload();
      } else {
        swal('Ooppss..!', dt.msg, 'error');
      }
    },
    error: function(res){
      swal(res);
    }
  })
}
