<?php
    define( 'WP_USE_THEMES', FALSE );
    require( '../wp-load.php' );
?>


<?php
    // $to_email = get_field('r_email', 'option');
    // $bcc_email = get_field('bcc_email', 'option');

    $to_email = "szabogabor@hydrogene.hu";
    $bcc_email = "leads@vieeye.hu";

    $incomingsubject = __('[DEV] VIARENT.HU LAKOSSÁGI | Ajánlatkérés','viarent');
    $resp_subject = "[DEV] Viarent - Érdeklődésedet köszönjük";
    $data = array(
        'name' => array (
            'label' => __('Név', 'viarent'),
            'value' => '',
        ),
        'email' => array (
            'label' => __('E-mail cím', 'viarent'),
            'value' => '',
        ),
        'tel' => array (
            'label' => __('Telefon', 'viarent'),
            'value' => '',
        ),
        'address' => array (
            'label' => __('Település', 'viarent'),
            'value' => '',
        ),
        'acceptgdpr' => array (
            'label' => __('Adatkezelés elfogadva', 'viarent'),
            'value' => '',
        ),
        'acceptmarketing' => array (
            'label' => __('Marketing célú felhasználás elfogadva', 'viarent'),
            'value' => '',
        ),
        'message' => array (
            'label' => __('Üzenet', 'viarent'),
            'value' => '',
        ),
        'vehicle' => array (
            'label' => __('Jármű', 'viarent'),
            'value' => '',
        ),
        'time' => array (
            'label' => __('Bérlés időtartama', 'viarent'),
            'value' => '',
        )
    );
?>

<?php if($_POST) : ?>
<?php
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        $output = json_encode(array('type'=>'error', 'text' => 'Request must come from Ajax'));
        die($output);
    }

    if( !isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["tel"]) ) {
        $output = json_encode(array('type'=>'error', 'text' => __('Hiányzó kötelező mező. Ellenőrizze a megadott adatokat.','viarent') ));
        die($output);
    }

    $data['name']['value'] = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $data['email']['value'] = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $data['tel']['value'] = filter_var($_POST["tel"], FILTER_SANITIZE_STRING);
    $data['address']['value'] = filter_var($_POST["address"], FILTER_SANITIZE_STRING);
    $data['vehicle']['value'] = filter_var($_POST["vehicle"], FILTER_SANITIZE_STRING);
    $data['time']['value'] = filter_var($_POST["time"], FILTER_SANITIZE_STRING);
    $data['acceptgdpr']['value'] = filter_var($_POST["acceptgdpr"], FILTER_SANITIZE_STRING);
    $data['acceptmarketing']['value'] = filter_var($_POST["acceptmarketing"], FILTER_SANITIZE_STRING);


    $data['message']['value'] = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

    $data['message']['value'] = str_replace("\&#39;", "'", $data['message']['value']);
    $data['message']['value'] = str_replace("&#39;", "'", $data['message']['value']);

    if(strlen($data['name']['value'])<4) {
        $output = json_encode(array('type'=>'error', 'text' => __('Teljes név megadása kötelező!','viarent') ));
        die($output);
    }

    if(strlen($data['tel']['value'])<6) {
        $output = json_encode(array('type'=>'error', 'text' => __('Érvénytelen telefonszám!','viarent') ));
        die($output);
    }

    if(!filter_var($data['email']['value'], FILTER_VALIDATE_EMAIL)) {
        $output = json_encode(array('type'=>'error', 'text' => __('Érvénytelen e-mail cím!','viarent') ));
        die($output);
    }

    if(!filter_var($data['acceptgdpr']['value'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE)) {
        $output = json_encode(array('type'=>'error', 'text' => __('Az adatkezelés elfogadása kötelező','viarent') ));
        die($output);
    }



    $metas = array();
    foreach ($data as $key => $dataitem) {
        if ($dataitem['value']!=='') {
            $metas[$key] = $dataitem['value'];
        }
    }
?>

<?php ob_start(); ?>
<table width="100%" cellpadding="5" cellspacing="0">
<?php foreach ($metas as $key => $datavalue) : ?>
    <tr>
        <td><strong><?= $data[$key]['label'] ?></strong></td>
        <td><?= $data[$key]['value'] ?></td>
    </tr>
<?php endforeach; ?>
</table>
<br><hr><br>
<?php $incominghtmlcontent = ob_get_clean(); ?>

<?php
    $thelead = array(
        'post_title'    => $data['name']['value'],
        'post_status'   => 'publish',
        'post_type'     => 'lead',
        'meta_input'    => $metas,
        'post_content'  => $incominghtmlcontent
    );

    if( $leadid = wp_insert_post( $thelead ) ) {
        wp_update_post( array(
            'ID' => $leadid,
            'post_title' => __('Rövidtávú ajánlatkérés', 'viarent').' / '.$data['name']['value'].' #'.$leadid
        ));
    }
?>

<?php

    $incomingheaders = array(
        'From: '.$to_email,
        'Reply-To: '.$data['email']['value'],
        'BCC: '.$bcc_email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/html; charset=UTF-8'
    );

    $sentMail = @wp_mail($to_email, $incomingsubject, $incominghtmlcontent, $incomingheaders);

    if(!$sentMail) {
        $output = json_encode(array('type'=>'error', 'text' => __('Hiba történt küldés során, próbálkozz újra!','viarent')));
        die($output);
    } else {
        $output = json_encode(array('type'=>'success', 'text' => __('Köszönjük megkeresését! Üzenetét rögzítettük, munkatársunk hamarosan jelentkezik.','viarent')));
        die($output);
    }
?>
<?php endif; ?>