<?php
include('../koneksi.php');
include('../koneksi_sim.php');
$data = json_decode(file_get_contents("php://input"));
// if(count($data) > 0) {
if(isset($_POST["username"]) &&  isset($_POST["password"])) {
    $ID_DOSEN = '';
    $IDJDK = '';
    // $username = mysqli_real_escape_string($conn, $data->username);
    // $password = mysqli_real_escape_string($conn, $data->password);

    $username = $_POST["username"];
    $password = $_POST["password"];
    
    $sql = "SELECT * FROM data_dosen WHERE username = '$username' AND password = '$password'";
    $run = mysqli_query($conn, $sql);
    
    while($row = mysqli_fetch_object($run)){
        $ID_DOSEN = $row->id_dosen;
    }

    $cariDSN = "SELECT DSNOTRJDK, ID FROM trjdk WHERE DSNOTRJDK = '$ID_DOSEN'";
    $runCari = mysqli_query($sim_con, $cariDSN);
    while($row2 = mysqli_fetch_object($runCari)){
        $IDJDK = $row2->ID;
    }

    if($ID_DOSEN && $runCari && $IDJDK){
        echo json_encode(array('success' => true, 'ID_DOSEN' => $ID_DOSEN, 'IDJDK' => $IDJDK));
    } else {
        echo json_encode(array('success' => false, 'msg' => 'Dosen Tidak Ditemukan'));
    }
}

?>