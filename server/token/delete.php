<?php
include('../koneksi.php');

$data = json_decode(file_get_contents("php://input"));
$token = $_POST['token_id'];
$sql = "DELETE FROM users_token WHERE token_id='$token'";

if(mysqli_query($conn, $sql)){
    echo json_encode(array('success' => true, 'msg' => 'Token Berhasil Dihapus!'));
} else {
    echo json_encode(array('success' => false, 'msg' => 'Ooppss..!! An Error Occured', 'err' => mysqli_error($conn)));
}
?>