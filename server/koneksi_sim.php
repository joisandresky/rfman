<?php
$host_sim = "localhost";
$user_sim = "rfid";
$pass_sim = "rfid2017";
$db_sim = "sim_bansal";


$sim_con = mysqli_connect($host_sim, $user_sim, $pass_sim, $db_sim);
if(!$sim_con){
    die();
    echo json_encode(array('connect' => false, 'msg' => 'Not Connected', 'err' => mysqli_error($sim_con)));
}

?>