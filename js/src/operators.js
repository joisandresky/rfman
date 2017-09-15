var formState = 0;
var id_opr = null;
var serverUrl = "http://localhost/e-presents/server/";
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
    var pdp = $('#pass_op').val();
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

  $('#delBtn').click(function(){
    var dt = tb.rows('.selected').data();
    if(dt.length == 0) return;
    swal({
        title: "Yakin Ingin Menghapus?",
        text: "Kamu Akan Menghapus Data Operator : " + dt[0][0],
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ya, Hapus!",
        closeOnConfirm: false
      },
      function(){
        deleteOperator(dt[0][0]);
    });
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
    $('#username_op').prop('disabled', false);
    $('#pass_field').show();
  } else {
    $('#judulModal').html("Ubah Data");
    $('#id_op').prop('disabled', true);
    $('#username_op').prop('disabled', true);
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

function deleteOperator(idop){
  var idLog = idop;
  var user = JSON.parse(window.localStorage.user);
  if(user.id_operator == idop){
    swal('Waduh!!!', 'Kamu Tidak Bisa Menghapus Akun Milikmu Sendiri!', 'warning');
    return;
  }
  $.ajax({
    method: 'POST',
    url: serverUrl + 'operators/delete.php',
    data: {
      id_operator: idop
    },
    success: function(res){
      var dt = JSON.parse(res);
      if(dt.success){
        swal('Deleted!', dt.msg, 'success');
        $('#operatorsTable').DataTable().ajax.reload();
      } else {
        swal('Oopss..!', dt.msg, 'error');
      }
    },
    error: function(res){
      swal(res)
    }
  })
}
