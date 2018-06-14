function sign_up_tab() {
    var inputs = document.querySelectorAll('.input_form_sign');
    document.querySelectorAll('.ul_tabs > li')[0].className = "";
    document.querySelectorAll('.ul_tabs > li')[1].className = "active";

    for (var i = 0; i < inputs.length; i++) {
        if (i == 2) {

        } else {
            document.querySelectorAll('.input_form_sign')[i].className = "input_form_sign d_block";
        }
    }

    setTimeout(function () {
        for (var d = 0; d < inputs.length; d++) {
            document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block active_inp";
        }


    }, 100);
    document.querySelector('.link_forgot_pass').style.opacity = "0";
    document.querySelector('.link_forgot_pass').style.top = "-5px";
    document.querySelector('.btn_sign').innerHTML = "SIGN UP";
    setTimeout(function () {

        document.querySelector('.terms_and_cons').style.opacity = "1";
        document.querySelector('.terms_and_cons').style.top = "5px";

    }, 500);
    setTimeout(function () {
        document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_none";
        document.querySelector('.terms_and_cons').className = "terms_and_cons d_block";
    }, 450);

    $('#email_sign').attr('placeholder', 'E-MAIL');
}



function sign_in_tab() {
    var inputs = $('.input_form_sign');
    document.querySelectorAll('.ul_tabs > li')[0].className = "active";
    document.querySelectorAll('.ul_tabs > li')[1].className = "";    

    for (var i = 0; i < inputs.length; i++) {
        switch (i) {
            case 1:
                console.log(inputs[i].name);
                break;
            case 2:
                console.log(inputs[i].name);
            default:
                document.querySelectorAll('.input_form_sign')[i].className = "input_form_sign d_block";
        }
    }

    setTimeout(function () {
        for (var d = 0; d < inputs.length; d++) {
            switch (d) {
                case 1:
                    console.log(inputs[d].name);
                    break;
                case 2:
                    console.log(inputs[d].name);

                default:
                    document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block";
                    document.querySelectorAll('.input_form_sign')[2].className = "input_form_sign d_block active_inp";

            }
        }
    }, 100);

    document.querySelector('.terms_and_cons').style.opacity = "0";
    document.querySelector('.terms_and_cons').style.top = "-5px";

    setTimeout(function () {
        document.querySelector('.terms_and_cons').className = "terms_and_cons d_none";
        document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_block";

    }, 500);

    setTimeout(function () {

        document.querySelector('.link_forgot_pass').style.opacity = "1";
        document.querySelector('.link_forgot_pass').style.top = "5px";


        for (var d = 0; d < inputs.length; d++) {

            switch (d) {
                case 1:
                    console.log(inputs[d].name);
                    break;
                case 2:
                    console.log(inputs[d].name);

                    break;
                default:
                    document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign";
            }
        }
    }, 1500);
    document.querySelector('.btn_sign').innerHTML = "SIGN IN";

    $('#email_sign').attr('placeholder', 'NAME/E-MAIL');
}


window.onload = function () {
    document.querySelector('.cont_centrar').className = "cont_centrar cent_active";

}

function sign()
{   
    let pass = $('#pass_sign');
    let email = $('#email_sign');
    let name = $('#name_sign');
    let dbUserObject;
    let userObjectNode;
    let dbObject;

    switch ($('.active').attr('id'))
    {
        case 'tab_signIn':
            firebase.auth().signInWithEmailAndPassword(email.val(), pass.val()).then(function () {
                alert('userLogged');
            }).catch(function (error) {
                firebase.database().ref('users/' + email.val()).on("value", function (snapshot) {
                    dbUserObject = snapshot.val();
                    if (dbUserObject && dbUserObject.hasOwnProperty("email")) {
                        console.log(dbUserObject.email);
                        firebase.auth().signInWithEmailAndPassword(dbUserObject.email, pass.val()).then(function () {
                            alert('userLogged');
                        }).catch(function (error) {
                            console.log("Error: " + error.code);
                        });
                    }
                    else
                    {
                        alert('No auth');
                    }
                });            
            });
            
            break;

        case 'tab_signUp':
            firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val()).then(function () {         
                if (firebase.auth().currentUser !== null) {
                    firebase.database().ref('users/' + name.val()).set({
                        userId: firebase.auth().currentUser.uid,
                        email: email.val()
                    });
                }
                alert('Account created');
            }).catch(function (error) {
                alert(error.message);
                });
            break;

    }
 }