<?php
include('../koneksi.php');

$rfid = mysqli_real_escape_string($conn, $_POST['rf_id']);
$sql = "DELETE FROM data_blacklist WHERE rf_id = '$rfid'";

if(isset($rfid) && mysqli_query($conn, $sql)){
  echo json_encode(array('success' => true, 'msg' => 'Data berhasil Dihapus!'));
} else {
  echo json_encode(array('success' => true, 'msg' => 'Gagal Memulihkan RFID'));
}

?>
