var token = '69';
var serverUrl = "http://localhost/e-presents/server/";
var dtAksi = '';
var isCheck = false;

$(document).ready(function(){
    getTokenUsers();
    $('#aksi-tambahan').hide();
    $('#btnCk2').hide();
});

function isChecked(check){
  if(check == false){
    $('#btnSave').prop('disabled', true);
  } else {
    $('#btnSave').prop('disabled', false);
  }
}

function getTokenUsers(){
    $('#st_aksi').on('change', function(){
      dtAksi = $('#st_aksi').val();
      if(dtAksi == '3'){
        $('#aksi-tambahan').show();
        $('#btnCk2').show();
        isChecked(false);
      } else {
        $('#aksi-tambahan').hide();
        $('#btnCk2').hide();
      }
      $('#nid-p').val("");
    })

    var  tb = $('#tokenTable2').DataTable({
        processing: true,
        serverSide: true,
        sAjaxSource: serverUrl + 'token/data-ssp.php',
        aoColumns: [
            null,
            null,
            null,
            null,
            null,
            null
        ]
    });

    $('#tokenTable2 tbody').on('click', 'tr', function(){
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
            deleteToken(dt[0][0]);
        }
    })

    $('#refreshBtn').click(function(){
        $('#tokenTable2').DataTable().ajax.reload();
    })

    $('#tmbhBtn').click(function(){
        loadAksiToken();
        $('#nid-p').val("");
        dtAksi = '';
        $('#aksi-tambahan').hide();
        var getToken = generateToken();
        $('#panelTambahData').modal('toggle');
        $('#token').val(getToken);
        isChecked(false);
    })

    $('#btnSave').click(function(){
        var tokenId = $('#token').val();
        var nid = $('#nid').val();
        var sta = $('#st_aksi').val();
        var nidp = dtAksi == 3 ? $('#nid-p').val() : '-';
        var newToken = {
            token_id: tokenId,
            no_induk: nid,
            used: 'N',
            id_aksi: sta,
            nidp: nidp
        }
        if(nid != ""){
            checkMaxToken(newToken);
        } else {
            swal('Ooppss..!', 'Data Tidak Boleh Kosong', 'error');
        }
    });

    $('#btnCheck').click(function(){
       var nid = $('#nid').val();
       if(nid == ""){
           return;
       }
       var stts = getStatusKartu(nid) == true ? true : false;
       if(dtAksi == '3'){
         isCheck = false;
         isChecked(isCheck);
         return;
       }
       isChecked(true);
    });

    $('#btnCk2').click(function(){
      var nid2 = $('#nid-p').val();
      if(nid2 == ""){
        return;
      }
      checkNI(nid2);
      isChecked(true);
    });

    $('#cekInval').click(function(){
      var dt = tb.rows('.selected').data();
      if(dt.length == 0 || dt[0][5] != "Dosen Di Inval"){
        return;
      }
      getDosenInval(dt[0][0]);
    });
}

function getStatusKartu(nid){
  var bl = null;
  var dt = null;
  $.ajax({
    method: 'POST',
    url: serverUrl + 'token/cek-blacklist.php',
    data: {
      nid: nid
    },
    success: function(res){
      dt = JSON.parse(res);
      console.log(dt)
      if(dt.status === "OK"){
        bl = true;
      } else {
        bl = false;
      }
    },
    error: function(res){
      console.log(res)
    },
    complete: function(){
      if(bl == false){
        checkNI(nid);
      } else {
        swal('Ooppss..!', dt.msg, 'warning');
        $('#btnSave').prop('disabled', true);
      }
    }
  })
}

function getDosenInval(tokenId){
  $.ajax({
    method: 'POST',
    url: serverUrl + 'token/cari-dosenInval.php',
    data: {
      token_id: tokenId
    },
    success: function(res){
      var dt = JSON.parse(res);
      checkNI(dt);
    },
    error: function(res){
      console.log(res)
    }
  })
}

function checkNI(nid){
  $.ajax({
      method: 'POST',
      url: serverUrl + 'token/cari-mhs.php',
      data: {
          no_induk: nid
      },
      success: function(res){
           var data = JSON.parse(res);
           if(data.success){
               switch(data.status){
                   case "mahasiswa":
                       swal({
                           title: data.mhs.NMMHSCMSMHS,
                           text: "NPM : " + nid + " <br> Kelas : " + data.mhs.KLSKULTRJDK,
                           html: true,
                           type: "info"
                       })
                       break;
                   case "dosen":
                       swal({
                           title: data.mhs.DSNAMA,
                           text: "NID : " + nid,
                           html: true,
                           type: "info"
                       })
                       isCheck = true;
                       break;
               }
           } else {
               swal('NPM/NID Tidak Ditemukan', 'Cek Kembali NO INDUK', 'error');
           }
      }
  })
}

function loadAksiToken(){
  $.ajax({
    method: 'GET',
    url: serverUrl + 'token/data-aksi.php',
    success: function(res){
      var data = JSON.parse(res)
      $('#st_aksi').empty();
      $.each(data, function(i, item){
        $('#st_aksi').append('<option value="'+ item.id_aksi +'">' + item.keterangan_aksi +'</option>');
      })
    },
    error: function(res){
      swal(res)
    }
  })
}

function resetForm(){
    $('#nid').val("");
}

function generateToken(){
    var now = new Date()
    var timeStamp = null
    var noUrut = 0
    var noBaru = null
    noUrut = parseInt(now.getSeconds().toString()) + parseInt(now.getHours().toString()) - 2
    noBaru = noUrut > 999 ? 0 : noUrut
    timeStamp = now.getSeconds().toString()
    timeStamp += (noBaru < 0 ? '0' : noBaru.toString()) + now.getDate().toString() + now.getHours().toString() + now.getMilliseconds().toString()
    return token + timeStamp
}

function saveToken(data){
    var newToken = data;
    swal({
        title: "Buat Token?",
        text: "Token Akan Disimpan, Konfirmasi Sekarang",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
      },
      function(){
        setTimeout(function(){
          $.ajax({
              method: 'POST',
              url: serverUrl + 'token/insert.php',
              data: JSON.stringify(newToken),
              success: function(res){
                  var data = JSON.parse(res);
                  if(data.success){
                    swal('Token : ' + newToken.token_id, 'Token Telah Disimpan', 'success')
                    $('#tokenTable2').DataTable().ajax.reload();
                    resetForm();
                    $('#panelTambahData').modal('hide');
                  } else {
                    console.log(data)
                    swal(data.msg,"NPM/NID Tidak Terdaftar Dalam RFID Users", "warning");
                    $('#tokenTable2').DataTable().ajax.reload();
                  }
              },
              error: function(res){
                  console.log(JSON.parse(res))

                  swal('Oopss', 'Telah Terjadi Error yang Tidak Diketahui', 'error')
              }
          })
        }, 1800);
    });
}

function checkMaxToken(token){
  var tkn = token;
  $.ajax({
      method: 'POST',
      url: serverUrl + 'token/cek-mhs-token.php',
      data: {
        no_induk: tkn.no_induk
      },
      success: function(res){
        var dt = JSON.parse(res);
        if(dt.accept_request){
          saveToken(tkn);
        } else {
          swal('Max!', dt.msg, 'warning');
        }
      }
  })
}

function deleteToken(id){
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
              url: serverUrl + 'token/delete.php',
              data: {
                  token_id: id
              },
              success: function(res){
                  var data = JSON.parse(res);
                  if(data.success){
                    swal("Deleted!", "Data Telah Terhapus!", "success");
                    $('#tokenTable2').DataTable().ajax.reload();
                  } else {
                    swal("Oopss..!", "Data Gagal Terhapus!", "error");
                    $('#tokenTable2').DataTable().ajax.reload();
                  }
              },
              error: function(res){
                console.log(res)
                swal('Oopss', 'Telah Terjadi Error yang Tidak Diketahui', 'error')
              }
          })
    });
}
