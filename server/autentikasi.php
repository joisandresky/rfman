<?php
require __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;
include('koneksi.php');

$operator = '';
$data = json_decode(file_get_contents("php://input"));

$uname = mysqli_real_escape_string($conn, $data->username);
$pass = mysqli_real_escape_string($conn, $data->password);
if(count($data) > 0){
  $pwd = md5($pass);
    $query = "SELECT id_operator, username, nama_operator FROM tb_operators WHERE username = '$uname' AND password = '$pwd'";
    $op = mysqli_query($conn, $query);
    while($row = mysqli_fetch_object($op)){
        $operator = $row;
    }

    $rowCount = mysqli_num_rows($op);

    if($rowCount > 0){
        $name = $operator;
        $key = "supersaiyansecret";
        $token = array(
            "iss" => "http://stmik.banisaleh.ac.id",
            "aud" => "http://rfid.banisaleh",
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "name" => $name->username
        );

        $jwt = JWT::encode($token, $key);
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        echo json_encode(array('token' => $jwt, 'decode' => $decoded, 'user' => $name));
    } else {
        echo json_encode(array('error' => 'InvalidCredentialsError', 'err' => mysqli_error($conn)));
    }
}
?>
