<?php
include('../koneksi.php');

$nid = mysqli_real_escape_string($conn, $_POST['no_induk']);

$sql = "SELECT * FROM `users_token` WHERE YEARWEEK(DATE(created_date)) = YEARWEEK(DATE(CURRENT_DATE())) AND no_induk = '$nid';";
$hasil = mysqli_query($conn, $sql);

if(mysqli_num_rows($hasil) >= 3){
  echo json_encode(array('accept_request' => false, 'msg' => 'Limit Permintaan Token Telah Habis dalam minggu ini!'));
} else {
  echo json_encode(array('accept_request' => true, 'msg' => 'OK'));
}
?>
