<?php
include('../../koneksi.php');

$alat = mysqli_real_escape_string($conn, $_POST['idAlat']);
$sql = "SELECT val FROM tb_session WHERE id = '$alat' AND `key` = 'data_mhsDel'";
$hasil = mysqli_query($conn, $sql);
$data = '';
while($row = mysqli_fetch_object($hasil)){
  $data = $row->val;
}

if($data != "gada"){
  echo json_encode(true);
} else {
  echo json_encode(false);
}

?>
