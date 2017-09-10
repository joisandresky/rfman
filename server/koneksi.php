<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, PUT , PATCH , OPTIONS, DELETE");

$host = 'localhost';
$user = 'rfid';
$pass = 'rfid2017';
$db = 'bansal';

$conn = mysqli_connect($host, $user, $pass, $db);
if(!$conn){
    die('koneksi masalah!');
}

 ?>