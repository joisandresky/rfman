<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT , PATCH , OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include('../koneksi.php');

$data = json_decode(file_get_contents("php://input"));
if(count($data) > 0){
    $id_op = mysqli_real_escape_string($conn, $data->id_operator);
    $username = mysqli_real_escape_string($conn, $data->username);
    $password = mysqli_real_escape_string($conn, $data->password);
    $nama_operator = mysqli_real_escape_string($conn, $data->nama_operator);

    $sql = "INSERT INTO tb_operators VALUES('$id_op', '$username', '$password', '$nama_operator', now(), now());";
    if(mysqli_query($conn, $sql)){
        echo json_encode(array('success' => true, 'msg' => 'Data Operator Berhasil Disimpan'));
    }else {
        echo json_encode(array('success' => false, 'msg' => 'Data Operator Gagal Disimpan', 'err' => mysqli_error($conn)));
    }
}
?>
