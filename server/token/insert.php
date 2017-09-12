<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT , PATCH , OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include('../koneksi.php');
include('../koneksi_sim.php');

$st = '';
$id = '';
$nid = '';
$data = json_decode(file_get_contents("php://input"));
if(count($data) > 0){
    $token_id = mysqli_real_escape_string($conn, $data->token_id);
    //$rf_id = mysqli_real_escape_string($conn, $data->rf_id);
    $no_induk = mysqli_real_escape_string($conn, $data->no_induk);
    $used = mysqli_real_escape_string($conn, $data->used);
    $aksi = mysqli_real_escape_string($conn, $data->id_aksi);
    $nidp = mysqli_real_escape_string($conn, $data->nidp);
    //$status = mysqli_real_escape_string($conn, $data->status);

    $cari = "SELECT status, rf_id, no_induk from rf_id_users WHERE no_induk = '$no_induk'";
    $dtUser = mysqli_query($conn, $cari);

    if(mysqli_num_rows($dtUser) > 0){
        while($row = mysqli_fetch_object($dtUser)){
            $st = $row->status;
            $id = $row->rf_id;
            $nid = $row->no_induk;
        }

        $sql = "INSERT INTO users_token VALUES('$token_id', now(), '$used', '$aksi', '$id', '$st', '$no_induk', '$nidp')";
        if(mysqli_query($conn, $sql)){
            echo json_encode(array('success' => true, 'msg' => 'Data Berhasil Disimpan'));
        }else {
            echo json_encode(array('success' => false, 'msg' => 'Data Gagal Disimpan', 'err' => mysqli_error($conn)));
        }
    } else {
        echo json_encode(array('success' => false, 'msg' => 'NPM/NID Tidak Ditemukan!', 'err' => mysqli_error($conn)));
    }

}


 ?>
