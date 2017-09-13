<?php
include('../koneksi.php');

$rfid = mysqli_real_escape_string($conn, $_POST['rf_id']);
$cari = "SELECT rf_id from rf_id_users WHERE rf_id = '$rfid'";
$cariId = mysqli_query($conn, $cari);
$kartu;
while($row = mysqli_fetch_object($cariId)){
  $kartu = $row->rf_id;
}

$sql = "INSERT INTO data_blacklist (rf_id) VALUES('$rfid')";

if(isset($kartu) && mysqli_query($conn, $sql)){
  echo json_encode(array('success' => true, 'msg' => 'Data Berhasil Disimpan'));
} else {
  echo json_encode(array('success' => false, 'msg' => 'RFID Tidak Terdaftar, Cek Kembali RFID tersebut'));
}

?>
