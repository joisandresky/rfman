<?php
include('../koneksi.php');
include('../koneksi_sim.php');

$waktu = '';
$nid = '';
$idjdk = '';
$NMK = ''; $KLS = ''; $SKS = ''; $DSN = '';

$sql = "SELECT TIME(absensi_dosen.waktu_absen) as waktu_absen, rf_id_users.no_induk as NID, absensi_dosen.kd_jadwal FROM absensi_dosen LEFT JOIN rf_id_users ON rf_id_users.rf_id = absensi_dosen.rf_id WHERE DATE(waktu_absen) = CURRENT_DATE() ORDER BY waktu_absen DESC";
$getData = mysqli_query($conn, $sql);
$output = array();
while($row = mysqli_fetch_assoc($getData)){
  $waktu = $row["waktu_absen"];
  $nid = $row["NID"];
  $idjdk = $row["kd_jadwal"];

  $sqlJDK = "SELECT trjdk.ID as id_mk, tbmk.NMTBMK as mata_kuliah, trjdk.KLSKULTRJDK as kelas_mk, tbmk.SKSTBMK as sks_mk, tbdosaktf.DSNAMA as dosen_mk FROM trjdk LEFT JOIN tbmk ON tbmk.KDTBMK = trjdk.KDMKATRJDK LEFT JOIN tbdosaktf ON tbdosaktf.DSNOTBDOS = trjdk.DSNOTRJDK WHERE trjdk.ID = '$idjdk'";

  $cekJDK = mysqli_query($sim_con, $sqlJDK);
  while($row2 = mysqli_fetch_object($cekJDK)){
    $NMK = $row2->mata_kuliah;
    $KLS = $row2->kelas_mk;
    $SKS = $row2->sks_mk;
    $DSN = $row2->dosen_mk;
  }
  $data = array(
    'IDJDK' => $idjdk,
    'NID' => $nid,
    'DSN' => $DSN,
    'NMK' => $NMK,
    'KLS' => $KLS,
    'SKS' => $SKS,
    'WTA' => $waktu
  );

  array_push($output, $data);
}

// $sqlJDK = "SELECT trjdk.ID as id_mk, tbmk.NMTBMK as mata_kuliah, trjdk.KLSKULTRJDK as kelas_mk, tbmk.SKSTBMK as sks_mk, tbdosaktf.DSNAMA as dosen_mk FROM trjdk LEFT JOIN tbmk ON tbmk.KDTBMK = trjdk.KDMKATRJDK LEFT JOIN tbdosaktf ON tbdosaktf.DSNOTBDOS = trjdk.DSNOTRJDK";

if(count($output) > 0){
  echo json_encode(array('success' => true, 'data' => $output, 'err' => mysqli_error($sim_con)));
} else {
  echo json_encode(array('success' => false, 'data' => $output ,'err' => mysqli_error($conn)));
}

?>
