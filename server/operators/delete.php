<?php
include('../koneksi.php');
$idp = $_POST['id_operator'];
$sql = "DELETE FROM tb_operators WHERE id_operator = '$idp'";

if(mysqli_query($conn, $sql)){
  echo json_encode(array('success' => true, 'msg' => 'Data Operator Berhasil Dihapus!'));
} else {
  echo json_encode(array('success' => false, 'msg' => 'Data Gagal Dihapus', 'err' => mysqli_error($conn)));
}

?>
