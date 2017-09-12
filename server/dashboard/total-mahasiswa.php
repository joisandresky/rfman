<?php
include('../koneksi.php');
$total = 0;
$sql = "SELECT COUNT(*) as total FROM absensi_mahasiswa WHERE DATE(waktu_absen) = CURRENT_DATE()";
$run = mysqli_query($conn, $sql);
while($row = mysqli_fetch_object($run)){
  $total = $row->total;
}
echo json_encode($total);

?>
