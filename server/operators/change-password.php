<?php
include('../koneksi.php');

$currentPass = '';

$id_op = $_POST['id_operator'];
$old_pass = $_POST['old_pass'];
$new_pass = $_POST['new_pass'];
$query = "SELECT password FROM tb_operators WHERE id_operator = '$id_op'";
$runQuery = mysqli_query($conn, $query);

while($row = mysqli_fetch_object($runQuery)){
  $currentPass = $row->password;
}

$input = array($id_op, $old_pass, $new_pass);

if($old_pass == $currentPass){
  $sql = "UPDATE tb_operators SET password = '$new_pass' WHERE id_operator = '$id_op'";
  if(mysqli_query($conn, $sql)) {
    echo json_encode(array('success' => true, 'msg' => 'Password Berhasil Diubah!'));
  } else {
    echo json_encode(array('success' => false, 'msg' => 'Password Gagal Diubah!', 'err' => mysli_error($conn)));
  }
} else {
  echo json_encode(array('success' => false, 'msg' => 'Password Lama Tidak Sesuai!', 'in' => $input, 'currPass' => $currentPass));
}


?>
