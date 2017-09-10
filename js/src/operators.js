var formState = 0;
var id_opr = null;
var serverUrl = 'http://localhost/sb-admin/server/';
$(document).ready(function(){
  getOperators();
});

function getOperators(){
  var tb = $('#operatorsTable').DataTable({
    processing: true,
    serverSide: true,
    sAjaxSource: serverUrl + 'operators/data-ssp.php',
    aoColumns: [
      null,
      null,
      null,
      null,
      null
    ]
  });

  $('#operatorsTable tbody').on('click', 'tr', function(){
      if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
      }
      else {
          tb.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
      }
  });

  $('#refreshBtn').click(function(){
    $('#operatorsTable').DataTable().ajax.reload();
  })

  $('#tmbhBtn').click(function(){
    formState = 0;
    $('#panelTambahData').modal('toggle');
    cekFormState(formState);
  })

  $('#editBtn').click(function(){
    formState = 1;
    var dt = tb.rows('.selected').data();
    if(dt.length == 0){
      return;
    } else {
      $('#panelTambahData').modal('toggle');
      cekFormState(formState);
      $('#id_op').val(dt[0][0]);
      $('#username_op').val(dt[0][1]);
      $('#nama_op').val(dt[0][2]);
    }
  })

  $('#btnChangePass').click(function(){
    var dt = tb.rows('.selected').data();
    if(dt.length == 0){
      return;
    } else {
      $('#panelUbahPass').modal('toggle');
      id_opr = dt[0][0];
    }
  })

  $('#btnChange').click(function(){
    var old_pass = $('#old_pass').val();
    var new_pass = $('#new_pass').val();
    if(old_pass != "" && new_pass != "" && id_opr != null){
      swal({
          title: "Apakah Kamu Yakin Ingin Menyimpan Password Ini ?",
          text: "Kamu Akan Merubah Password ID Operator : " + id_opr +", Jika Sudah Valid Tekan Yes",
          type: "info",
          showCancelButton: true,
          closeOnConfirm: false,
          showLoaderOnConfirm: true,
        },
        function(){
          setTimeout(function(){
            changePassword(id_opr, old_pass, new_pass);
          }, 1800);
      });
    }
  })

  $('#btnSave').click(function(){
    var idp = $('#id_op').val();
    var udp = $('#username_op').val();
    var pdp = $('#username_op').val();
    var ndp = $('#nama_op').val();
    var newOp = {
      id_operator: idp,
      username: udp,
      password: pdp,
      nama_operator: ndp
    }

    if(idp != "" && udp != "" && pdp != "" && ndp != ""){
      if(formState == 0){
        saveOperator(newOp);
      } else {
        updateOperator(newOp);
      }
    } else {
      swal('Oopss..!', 'Semua Field Tidak Boleh Kosong!', 'error');
    }
  })
}

function resetForm(){
  $('#id_op').val("");
  $('#username_op').val("");
  $('#pass_op').val("");
  $('#nama_op').val("");
}

function resetFormPass(){
  $('#old_pass').val("");
  $('#new_pass').val("");
  id_opr = null;
}

function cekFormState(state){
  if(state == 0){
    resetForm();
    $('#judulModal').html("Tambah Data");
    $('#id_op').prop('disabled', false);
    $('#pass_field').show();
  } else {
    $('#judulModal').html("Ubah Data");
    $('#id_op').prop('disabled', true);
    $('#pass_field').hide();
  }
}

function saveOperator(operator){
  var newOP = operator;
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
          url: serverUrl + 'operators/insert.php',
          data: JSON.stringify(newOP),
          success: function(res){
            var data = JSON.parse(res);
            if(data.success){
              swal('Saved!', data.msg, 'success');
              $('#operatorsTable').DataTable().ajax.reload();
              resetForm();
              $('#panelTambahData').modal('hide');
            } else {
              swal('Ooppss..!', data.msg, 'error');
            }
          },
          error: function(res){
            console.log(res)
            swal('Oopss..!', 'Error Tidak Diketahui', 'error')
          }
        })
      }, 1800);
  });
}

function updateOperator(operator){
  var currOperator = operator;
  swal({
      title: "Yakin ingin Menyimpan Perubahan?",
      text: "Kamu Akan Menyimpan Perubahan Data ini , Jika Sudah Valid Tekan Yes",
      type: "info",
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
    },
    function(){
      setTimeout(function(){
        $.ajax({
          method: 'POST',
          url: serverUrl + 'operators/update.php',
          data: JSON.stringify(currOperator),
          success: function(res){
            var data = JSON.parse(res);
            if(data.success){
              swal('Saved!', data.msg, 'success');
              $('#operatorsTable').DataTable().ajax.reload();
              resetForm();
              $('#panelTambahData').modal('hide');
            } else {
              swal('Ooppss..!', data.msg, 'error');
            }
          },
          error: function(res){
            console.log(res)
            swal('Oopss..!', 'Error Tidak Diketahui', 'error')
          }
        })
      }, 1800);
  });
}

function changePassword(id_op, old_pass, new_pass){
  var idp = id_op;
  var oldp = old_pass;
  var newp = new_pass;
  $.ajax({
    method: 'POST',
    url: serverUrl + 'operators/change-password.php',
    data: {
      id_operator: idp,
      old_pass: oldp,
      new_pass: newp
    },
    success: function(res){
      var data = JSON.parse(res);
      if(data.success){
        swal('Saved!', data.msg, 'success');
        $('#operatorsTable').DataTable().ajax.reload();
        resetFormPass();
        $('#panelUbahPass').modal('hide');
      } else {
        swal('Ooopss..!', data.msg, 'error');
      }
    },
    error: function(res){
      swal(res);
    }
  })
}