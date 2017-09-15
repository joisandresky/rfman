<?php
include('../../koneksi.php');

$npm = mysqli_real_escape_string($conn, $_POST['npm']);
$alat = mysqli_real_escape_string($conn, $_POST['idAlat']);
$query = "SELECT val FROM tb_session WHERE `key` = 'data_mhsDel' AND id = '$alat'";
$hasil = mysqli_query($conn, $query);
$key = '';
if(mysqli_num_rows($hasil) > 0){
  $sql = "UPDATE tb_session SET `val` = '$npm' WHERE id = '$alat' AND `key` = 'data_mhsDel'";
  if(mysqli_query($conn, $sql)){
    echo json_encode(array('success' => true));
  } else {
    echo json_encode(array('success' => false, 'err' => mysqli_error($conn)));
  }
} else {
  $sql = "INSERT INTO tb_session (`id`, `key`, `val`) VALUES('$alat', 'data_mhsDel', '$npm')";
  if(mysqli_query($conn, $sql)){
    echo json_encode(array('success' => true));
  } else {
    echo json_encode(array('success' => false, 'err' => mysqli_error($conn)));
  }
}

?>
