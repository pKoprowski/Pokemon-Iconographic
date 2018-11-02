function sign_up_tab() {
    var inputs = document.querySelectorAll('.input_form_sign');
    document.querySelectorAll('.ul_tabs > li')[0].className = "";
    document.querySelectorAll('.ul_tabs > li')[1].className = "active";

    for (var i = 0; i < inputs.length; i++) {
        if (i == 1) {
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
    document.querySelector('.btn_sign').innerHTML = "Rejestracja";
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
    document.querySelector('.btn_sign').innerHTML = "Zaloguj";

    $('#email_sign').attr('placeholder', 'Nazwa/Email');
}

window.onload = function () {
    document.querySelector('.cont_centrar').className = "cont_centrar cent_active";

}

function show_MainView()
{  
    //loadPokeBox();
    prepare_MainView_menu();   
    prepare_MainView_user();
    //todo dodać permission
    createDb_View();
    $('.main_view').show();
}

function prepare_MainView_menu() {
    $('#pokemonList').toggleClass('active_menu');
    $('#pokemonList_detail').css('display', 'block');
}

function prepare_MainView_news() {
 
}

function prepare_MainView_user() {
    let userName = localStorage.getItem('userName');
    let storageAvatar;
    let userObject;
    let strPath;

    database.ref('users/' + userName).on("value", function (snapshot) {
        console.log(snapshot.val());
        userObject = snapshot.val();
        strPath = 'Pokemons/' + userObject.avatar + '.png';
        storageAvatar = storageRef.child(strPath);

        storageAvatar.getDownloadURL().then(function (url) {
            $('#user_avatar').attr("src", url);
        }).catch(function (error) {
                console.log(error.code);
            });

        $('#user_Name').text(localStorage.getItem('userName'));
        $('#email').text(userObject.email);
    });    
}

function storeUserInLocalStorage(_userName)
{
    let email = $('#email_sign');
    let userNameDB;

    userNameDB = _userName;
    if (!_userName)
    {
        database.ref('users').orderByChild('email').equalTo(email.val()).on("value", function (snapshot) {
            console.log(snapshot.val());
            snapshot.forEach(function (data) {
                console.log(data.key);
                localStorage.setItem('userName', data.key);
            });
        });
    }  
}


function sign()
{   
    let pass = $('#pass_sign');
    let email = $('#email_sign');
    let name = $('#name_sign');
    let dbUserObject;
    let userObjectNode;
    let dbObject;
    let emailReg = /^([A-Za-z0-9_\-.])+@/;
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    switch ($('.active').attr('id'))
    {
        case 'tab_signIn':
            if (emailReg.test(email.val()))
            {
                firebase.auth().signInWithEmailAndPassword(email.val(), pass.val()).then(function () {
                    show_MainView();
                }).catch(function (error) {
                    alert(error.code);
                });
            }
            else
            {
                database.ref('users/' + email.val()).on("value", function (snapshot) {
                    dbUserObject = snapshot.val();
                    if (dbUserObject && dbUserObject.hasOwnProperty("email")) {
                        console.log(dbUserObject.email);
                        firebase.auth().signInWithEmailAndPassword(dbUserObject.email, pass.val()).then(function () {
                            show_MainView();
                    }).catch(function (error) {
                       console.log("Error: " + error.code);
                    });
                        }
                        else {
                            alert('No auth');
                        }
                    });                
            }
            
            break;

        case 'tab_signUp':
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            
            firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val()).then(function () {         
                if (firebase.auth().currentUser !== null) {
                    //user creation
                    firebase.database().ref('users/' + name.val()).set({
                        userId: firebase.auth().currentUser.uid,
                        email: email.val(),
                        avatar: '',
                        lastLogDay: dd + '/' + mm + '/' + yyyy
                    });

                    //userGraphics
                    firebase.database().ref('users/' + name.val()+'/graphcs').set({});

                }
                alert('Account created');
            }).catch(function (error) {
                alert(error.message);
                });
            break;

    }

    storeUserInLocalStorage();
    modifyLastLogDate();
}

function modifyLastLogDate()
{
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    database.ref('users/' + localStorage.getItem('userName')).update({
        lastLogDay: dd + '/' + mm + '/' + yyyy
    });  
}

function set_MenuActive(element)
{
    let activeMainMenu = $('.active_menu');

    if (activeMainMenu) {
        activeMainMenu.toggleClass('active_menu');
        $('#' + activeMainMenu[0].id + '_detail').css('display', 'none');
    }
    $('#' + element.id).toggleClass('active_menu');
    $('#' + element.id+'_detail').css('display', 'block');
}

function generateIconographic() {

}