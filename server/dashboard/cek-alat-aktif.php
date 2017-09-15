<?php
include('../koneksi.php');

$dt = '';
$sql = "SELECT id as total FROM tb_session GROUP BY id";
$run = mysqli_query($conn, $sql);
$rowCout = mysqli_num_rows($run);

if($rowCout){
  echo json_encode($rowCout);
} else {
  echo json_encode($rowCout);
}

?>
