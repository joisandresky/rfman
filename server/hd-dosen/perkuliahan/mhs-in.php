<?php
header("Access-Control-Allow-Origin: *");
include('../../koneksi_sim.php');

$data = json_decode(file_get_contents("php://input"));
if(count($data) > 0) {
    $idjdk = mysqli_real_escape_string($sim_con, $data->idjdk);

    $sql = "SELECT trabsenmhs.*, msmhs.NMMHSCMSMHS, msmhs.IMG FROM trabsenmhs LEFT JOIN msmhs ON trabsenmhs.NPMTRABSEN = msmhs.NIMHSCMSMHS WHERE DATE(TGLTRABSEN) = CURRENT_DATE() AND IDJDK = '$idjdk'";
    $mhs_in = mysqli_query($sim_con, $sql);

    $dtMhs = array();
    while($row = mysqli_fetch_assoc($mhs_in)) {
        $dtMhs[] = $row;
    }

    if ($dtMhs) {
        echo json_encode(array('success' => true, 'mhs_in' => $dtMhs));
    } else {
        echo json_encode(array('success' => false, 'error' => 'Belum ada Mahasiswa Masuk!'));
    }
}

?>