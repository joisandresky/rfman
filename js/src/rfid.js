var formState = 0;
var serverUrl = "http://localhost/e-presents/server/";
$(document).ready(function(){
    getRfidUsers();
});

function getRfidUsers(){
    var  tb = $('#rfidTable').DataTable({
        processing: true,
        serverSide: true,
        sAjaxSource: serverUrl + 'rfid/data-ssp.php',
        aoColumns: [
            null,
            null,
            null
        ]
    });

    $('#rfidTable tbody').on('click', 'tr', function(){
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            tb.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    })

    $('#delBtn').click(function(){
        var dt = tb.rows('.selected').data();
        if(dt.length == 0){
            return;
        } else {
            deleteRfid(dt[0][0])
        }
    })

    $('#refreshBtn').click(function(){
        $('#rfidTable').DataTable().ajax.reload();
    })

    $('#tmbhBtn').click(function(){
        formState = 0;
        resetForm();
        $('#panelTambahData').modal('toggle');
        cekFormState(formState)
    })

    $('#editBtn').click(function(){
        formState = 1;
        var dt = tb.rows('.selected').data();
        if(dt.length == 0){
            return;
        } else {
            $('#panelTambahData').modal('toggle');
            cekFormState(formState);
            $('#rfid').val(dt[0][0]);
            $('#nid').val(dt[0][1]);
            $('#stts').val(dt[0][2]);
        }
    })

    $('#btnSave').click(function(){
        var rfid = $('#rfid').val();
        var nid = $('#nid').val();
        var stts = $('#stts').val();
        var newRfid = {
            rf_id: rfid,
            no_induk: nid,
            status: stts,
            time_expired: 6400
        };
        if(rfid != "" && nid != "" && stts != ""){
            if(formState == 0){
                saveRfid(newRfid);
            } else {
                updateRfid(newRfid);
            }
        } else {
            swal('Ooppss..!', 'Data Tidak Boleh Kosong', 'warning');
        }
    });
}

function resetForm(){
    $('#rfid').val("");
    $('#nid').val("");
    $('#stts').val("");
}

function cekFormState(state){
    if(state == 1){
        $('#judulModal').html("Ubah Data")
        $('#rfid').prop('disabled', true);
    } else {
        $('#judulModal').html("Tambah Data")
        $('#rfid').prop('disabled', false);
    }
}

function saveRfid(rfid){
    var newRfid = rfid;
    swal({
        title: "Yakin ingin Menyimpan?",
        text: "Kamu Akan Menyimpan Data ini , Jika Sudah Valid Tekan Yes",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
      },
      function(){
        setTimeout(function(){
          $.ajax({
              method: 'POST',
              url: serverUrl + 'rfid/insert.php',
              data: JSON.stringify(newRfid),
              success: function(res){
                  var data = JSON.parse(res);
                  if(data.success){
                    swal("Saved!", "Data Telah Tersimpan!", "success");
                    $('#rfidTable').DataTable().ajax.reload();
                    resetForm();
                    $('#panelTambahData').modal('hide');
                  } else {
                    swal("Oopss..!", "Data Gagal Tersimpan!", "warning");
                    $('#rfidTable').DataTable().ajax.reload();
                  }
              },
              error: function(res){
                  console.log(res)
                  swal('Oopss', 'Telah Terjadi Error yang Tidak Diketahui', 'error')
              }
          })
        }, 1800);
    });
}

function updateRfid(rfid){
    var currRfid = rfid;
    swal({
        title: "Yakin ingin Mengubah Data?",
        text: "Kamu Akan Menyimpan Perubahan Data, Tekan OK Untuk Konfirmasi Perubahan",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
      },
      function(){
        setTimeout(function(){
          $.ajax({
              method: 'POST',
              url: serverUrl + 'rfid/update.php',
              data: JSON.stringify(currRfid),
              success: function(res){
                  var data = JSON.parse(res);
                  if(data.success){
                    swal("Saved!", "Data Telah Tersimpan!", "success");
                    $('#rfidTable').DataTable().ajax.reload();
                    resetForm();
                    $('#panelTambahData').modal('hide');
                    formState = 0;
                  } else {
                    swal("Oopss..!", "Data Gagal Tersimpan!", "warning");
                    $('#rfidTable').DataTable().ajax.reload();
                  }
              },
              error: function(res){
                  console.log(res)
                  swal('Oopss', 'Telah Terjadi Error yang Tidak Diketahui', 'error')
              }
          })
        }, 1800);
    });
}

function deleteRfid(id){
    swal({
        title: "Yakin Ingin Menghapus?",
        text: "Kamu Akan Menghapus Data RFID: "+id,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ya, Hapus!",
        closeOnConfirm: false
      },
      function(){
          $.ajax({
              method: 'POST',
              url: serverUrl + 'rfid/delete.php',
              data: {
                  rf_id: id
              },
              success: function(res){
                  var data = JSON.parse(res);
                  if(data.success){
                    swal("Deleted!", "Data Telah Terhapus!", "success");
                    $('#rfidTable').DataTable().ajax.reload();
                  } else {
                    swal("Oopss..!", "Data Gagal Terhapus!", "error");
                    $('#rfidTable').DataTable().ajax.reload();
                  }
              },
              error: function(res){
                console.log(res)
                swal('Oopss', 'Telah Terjadi Error yang Tidak Diketahui', 'error')
              }
          })
    });
}
