<?php
include('../../koneksi.php');

$idAlat = "";
$NID = mysqli_real_escape_string($conn, $_POST['nid']);
$cariAlat = "SELECT id FROM `tb_session` WHERE `key` = 'DosenMasuk' AND val = '$NID';";
$cekAlat = mysqli_query($conn, $cariAlat);
while($row2 = mysqli_fetch_object($cekAlat)){
  $idAlat = $row2->id;
}

if($idAlat != "") {
  echo json_encode(true);
} else {
  echo json_encode(false);
}


?>
