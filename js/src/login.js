var serverUrl = "http://localhost/e-presents/server/";

$(document).ready(function(){
  $('form').submit(function(e){
    e.preventDefault();
    var uname = $('#uname').val();
    var pass = $('#pass').val();

    var data = {
      username: uname,
      password: pass
    }

    if(uname != "" && pass != ""){
      $.ajax({
        method: 'POST',
        url: serverUrl + 'autentikasi.php',
        data: JSON.stringify(data),
        beforeSend: function(){
          $('#btnLogin').val("Mohon Tunggu...");
          $('#btnLogin').prop('disabled', true);
        },
        success: function(res){
          var response = JSON.parse(res);
          if(response.token){
            window.localStorage.setItem('token', response.token);
            window.localStorage.setItem('user', JSON.stringify(response.user));
            window.location.href = "./";
          } else {
            swal(response.error, 'Username atau Password nya Salah Mbak/Mas', 'error');
          }
        },
        error: function(res){
          console.log(res)
        },
        complete: function(){
          $('#btnLogin').val("LOGIN");
          $('#btnLogin').prop('disabled', false);
        }
      })
    } else {
      swal('Ooppss..!', 'Field Tidak Boleh Kosong Bang!', 'error');
      return;
    }
  })
});
