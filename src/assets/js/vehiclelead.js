$(".vcardform").on("submit", function(ev, frm) {
    ev.preventDefault();
    $form = $(this);


    //get input field values
    var user_name = $form.find("input[name=r_name]").val();
    var user_email = $form.find("input[name=r_email]").val();
    var user_tel = $form.find("input[name=r_tel]").val();
    var user_company = $form.find("input[name=r_company]").val();
    var user_address = $form.find("input[name=r_address]").val();
    var user_message = $form.find("textarea[name=r_message]").val();
    var user_vehicle = $form.find("input[name=r_vehicle]").val();
    var user_vehicleid = $form.find("input[name=r_vehicleid]").val();
    var user_vcat = $form.find("input[name=r_vcat]").val();
    var user_vcatid = $form.find("input[name=r_vcatid]").val();

    var user_acceptgdpr = $form.find("input[name=r_acceptgdpr]").is(":checked")?1:0;
    var user_acceptmarketing = $form.find("input[name=r_acceptmarketing]").is(":checked")?1:0;

    var user_time= '';
    var user_renttime = [];
    $.each($form.find('input[name="r_time[]"]:checked'), function(){
        user_renttime.push($(this).val());
    });
    user_time+=user_renttime.join(' | ');

    var proceed = true;
    var output = "";



    //everything looks good! proceed...
    if (proceed) {
        //data to be sent to server
        var post_data = {
            name: user_name,
            email: user_email,
            tel: user_tel,
            company: user_company,
            address: user_address,
            message: user_message,
            acceptgdpr: user_acceptgdpr,
            acceptmarketing: user_acceptmarketing,
            time: user_time,
            vehicle: user_vehicle,
            vehicleid: user_vehicleid,
            vcat: user_vcat,
            vcatid: user_vcatid
        };
        $form.find(".vcardformsubmit").addClass("disabled");
        $form.find(".vcardformsubmit").attr("disabled", "disabled");
        $form.find(".vcardformsubmit").text($form.find(".vcardformsubmit").data('progresstext'));

        //Ajax post data to server
        $.post(
            $form.attr("action"),
            post_data,
            function(response) {


                //load json data from server and output message
                if (response.type === "error") {
                    output = '<p class="itsnotok">' + response.text + '</p>';
                    console.log(response.text);
                } else {
                    output = '<p class="itsok">' + response.text + '</p>';
                    $form.addClass("is-alreadysent");
                    $form.find(".vcardformsubmit").addClass('light');
                    $form.find(".vcardformclose").text($form.find(".vcardformclose").data('succestext')).removeClass('light');
                    $form.find(".vcardformresult").prepend(output);
                    $form.find(".vcardformresult").addClass("is-active");

                    var fn = window.gtag;
                    if (typeof fn === "function") {
                        gtag("event", "sent", {
                            event_category: "form"
                        });
                        console.log("Gtag event fired");
                    } else {
                        console.log("No global gtag defined");
                    }

                    //reset values in all input fields
                    $form.find("input").val("");
                    $form.find("textarea").val("");
                }
                $form.find(".vcardformresult")
                    .hide()
                    .html(output)
                    .slideDown();
                $form.find(".vcardformsubmit").removeClass("disabled");
                $form.find(".vcardformsubmit").removeAttr("disabled");
                $form.find(".vcardformsubmit").text($form.find(".vcardformsubmit").data('sendtext'));
            },
            "json"
        );
    }

    return false;
});

//reset previously set border colors and hide all message on .keyup()
$('.vcardform input, .vcardform textarea, .vcardform [name="r_acceptgdpr"]').keyup(function() {
    $(".vcardformresult").slideUp();
});
