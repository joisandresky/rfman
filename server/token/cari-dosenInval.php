<?php
include('../koneksi.php');
    $tokenId = $_POST['token_id'];
    $sql = "SELECT nidp FROM users_token WHERE token_id ='$tokenId'";
    $run = mysqli_query($conn, $sql);
    $nid = '';
    while($row = mysqli_fetch_object($run)){
      $nid = $row->nidp;
    }

    if($nid){
      echo json_encode($nid);
    } else {
      echo json_encode($nid);
    }

?>
