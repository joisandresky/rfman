<?php
include('../koneksi.php');

$sql = "SELECT * from tb_aksi_token";
$query = mysqli_query($conn, $sql);
$output = array();
while($row = mysqli_fetch_assoc($query)){
  $output[] = $row;
}

if($output){
  echo json_encode($output);
} else {
  echo json_encode($output);
}

?>
