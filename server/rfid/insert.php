<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT , PATCH , OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include('../koneksi.php');

$data = json_decode(file_get_contents("php://input"));
if(count($data) > 0){
    $rf_id = mysqli_real_escape_string($conn, $data->rf_id);
    $no_induk = mysqli_real_escape_string($conn, $data->no_induk);
    $status = mysqli_real_escape_string($conn, $data->status);
    $time_expired = mysqli_real_escape_string($conn, $data->time_expired);

    $sql = "INSERT INTO rf_id_users (rf_id, no_induk, status, time_expired) VALUES('$rf_id', '$no_induk', '$status', '$time_expired');";
    if(mysqli_query($conn, $sql)){
        echo json_encode(array('success' => true, 'msg' => 'Data Berhasil Disimpan'));
    }else {
        echo json_encode(array('success' => false, 'msg' => 'Data Gagal Disimpan', 'err' => mysqli_error($conn)));
    }
}


 ?>