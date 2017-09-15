<?php
header("Access-Control-Allow-Origin: *");
include('../../koneksi.php');
include('../../koneksi_sim.php');

$data = json_decode(file_get_contents("php://input"));
global $hasilNya, $hsl;
$idAlat = '';
$mhs = '';
$dm = '';
$wa = '';
if(isset($_POST['nid'])) {
  $NID = mysqli_real_escape_string($conn, $_POST['nid']);

  $cariAlat = "SELECT id FROM `tb_session` WHERE `key` = 'DosenMasuk' AND val = '$NID';";
  $cekAlat = mysqli_query($conn, $cariAlat);
  while($row2 = mysqli_fetch_object($cekAlat)){
    $idAlat = $row2->id;
  }

  if(isset($idAlat)){
    $mhs = executeQuery($conn, $idAlat, "mhsabsen")->val;
    if($mhs == ''){
      echo json_encode("null");
      return;
    }
    $kls = executeQuery($conn, $idAlat, "dosenmengajarkelas")->val;
    $jdk = executeQuery($conn, $idAlat, "dosenmengajarjadwal")->val;
    $mk = executeQuery($conn, $idAlat, "dosenmengajarmatakuliah")->val;
    $mata_kuliah = getMatkul($sim_con, $mk);
    $ms = explode(",", $mhs);
    //array_splice($ms, 0, 1);
    $mahasiswaNya = array();
    $dt = '';
    // for ($i = 0;$i < count($ms);$i++) {
    //     $dt = getDetailMahasiswa($sim_con, $ms[$i]);
    //     array_push($mahasiswaNya, $dt);
    // }
    foreach ($ms as $m) {
      $dt = getDetailMahasiswa($sim_con, $m);
      array_push($mahasiswaNya, $dt);
    }
    $data = array(
      'ms' => $ms,
      'mahasiswa' => $mahasiswaNya,
      'kelas' => $kls,
      'jadwal' => $jdk,
      'matkul' => $mata_kuliah,
      'alat' => $idAlat,
      'err' => mysqli_error($conn),
      'erro' => mysqli_error($sim_con)
    );
    if(count($mahasiswaNya) > 0){
      echo json_encode($data);
    } else {
      echo json_encode(array('kelas' => 'Belum Ada!'));
    }
  } else {
    echo json_encode(array('mahasiswa' => array(), 'kelas' => 'Belum Ada!'));
  }
}

function executeQuery($conn, $alat, $key){
  $sql = "SELECT val from `tb_session` WHERE id = '$alat' AND `key` = '$key'";
  $hasil = mysqli_query($conn, $sql);
  while($row = mysqli_fetch_object($hasil)){
    $hasilNya = $row;
  }

  return $hasilNya;
}

function getMatkul($sim_con, $mk){
  $matkul;
  $sql = "SELECT NMTBMK from tbmk WHERE KDTBMK = '$mk'";
  $hasil = mysqli_query($sim_con, $sql);
  while($row = mysqli_fetch_object($hasil)){
    $matkul = $row->NMTBMK;
  }
  return $matkul;
}

function getDetailMahasiswa($sim_con, $npm){
  $hsl = array();
  $sql = "SELECT TIME(trabsenmhs.TGLTRABSEN) AS TGLTRABSEN, msmhs.NMMHSCMSMHS, msmhs.NIMHSCMSMHS FROM trabsenmhs LEFT JOIN msmhs ON trabsenmhs.NPMTRABSEN = msmhs.NIMHSCMSMHS WHERE trabsenmhs.NPMTRABSEN = '$npm' AND DATE(trabsenmhs.TGLTRABSEN) = CURRENT_DATE()";
  $hasil = mysqli_query($sim_con, $sql);
  while($row = mysqli_fetch_object($hasil)){
    $hsl = $row;
  }

  if(count($hsl) > 0){
    return $hsl;
  } else {
    return mysqli_error($sim_con);
  }
}

?>
