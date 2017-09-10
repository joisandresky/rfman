<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");
include('../koneksi.php');

$data = json_decode(file_get_contents("php://input"));
$rf_id = mysqli_real_escape_string($conn, $data->rf_id);
$query = "SELECT no_induk, status FROM rf_id_users WHERE rf_id = '$data->rf_id'";
$data = mysqli_query($conn, $query);
while($row = mysqli_fetch_object($data)){
    $output = $row;
}

if($data){
    echo json_encode(array('rf_id' => $output));
} else {
    echo json_encode(array('msg' => 'error', 'err' => mysqli_error($conn)));
}
?>