<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT , PATCH , OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include('../koneksi.php');

$id = $_POST['rf_id'];
$delSql = "DELETE FROM rf_id_users WHERE rf_id='$id'";

if(mysqli_query($conn, $delSql)){
    echo json_encode(array('success' => true, 'msg' => 'Data Berhasil Dihapus'));
} else {
    echo json_encode(array('success' => false, 'msg' => 'Data Gagal Dihapus', 'err' => mysqli_error($conn)));
}


 ?>