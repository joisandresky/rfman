<?php
include('../koneksi_sim.php');

$status = '';
$runCari;
$nid = $_POST['no_induk'];
$ekstrak = substr($nid, 0, 1);
$cariMhs = "SELECT msmhs.NMMHSCMSMHS, trjdk.KLSKULTRJDK, trjdk.ID, trfrs.IDJDK FROM msmhs LEFT JOIN trfrs ON msmhs.NIMHSCMSMHS = trfrs.NPMTRFRS LEFT JOIN trjdk ON trfrs.IDJDK = trjdk.ID WHERE msmhs.NIMHSCMSMHS = '$nid' GROUP BY trfrs.TGLINPUT DESC LIMIT 1";
$carDsn = "SELECT DSNOTBDOS, DSNAMA FROM tbdosaktf WHERE DSNOTBDOS = '$nid'";

if($ekstrak == "D"){
    $status = "dosen";
    $runCari = mysqli_query($sim_con, $carDsn);
} else {
    $status = "mahasiswa";
    $runCari = mysqli_query($sim_con, $cariMhs);
}

$mahasiswa = '';
while($myrow = mysqli_fetch_object($runCari)){
    $mahasiswa = $myrow;
}
if($mahasiswa){
    echo json_encode(array('success' => true, 'mhs' => $mahasiswa, 'status' => $status,'err' => mysqli_error($sim_con)));
} else {
    echo json_encode(array('success' => false, 'mhs' => $mahasiswa, 'rr' => $ekstrak ,'err' => mysqli_error($sim_con)));
}

 ?>