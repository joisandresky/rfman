<?php
include('../koneksi.php');

$nid = $_POST['nid'];

$sql = "SELECT data_blacklist.*, rf_id_users.no_induk from data_blacklist LEFT JOIN rf_id_users ON rf_id_users.rf_id = data_blacklist.rf_id WHERE rf_id_users.no_induk = '$nid'";
$run = mysqli_query($conn, $sql);
if(mysqli_num_rows($run) > 0){
  echo json_encode(array('success' => true, 'msg' => 'Kartu Dengan NPM/NID tersebut Dalam Status Blacklist', 'status' => 'OK'));
} else {
  echo json_encode(array('success' => false, 'status' => 'BAD'));
}
?>
