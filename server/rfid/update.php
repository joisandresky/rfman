<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT , PATCH , OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include('../koneksi.php');

$data = json_decode(file_get_contents("php://input"));

    $rf_id = mysqli_real_escape_string($conn, $data->rf_id);
    $no_induk = mysqli_real_escape_string($conn, $data->no_induk);
    $status = mysqli_real_escape_string($conn, $data->status);
    $time_expired = mysqli_real_escape_string($conn, $data->time_expired);

$updateSql = "UPDATE rf_id_users SET no_induk='$no_induk', status='$status', time_expired='$time_expired' WHERE rf_id='$rf_id'";
if(mysqli_query($conn, $updateSql)){
    echo json_encode(array('success' => true, 'msg' => 'Data Berhasil Diubah'));
}else {
    echo json_encode(array('success' => false, 'msg' => 'Data Gagal Diubah'));
}

 ?>