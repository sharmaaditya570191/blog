var firebaseConfig = {
    apiKey: "AIzaSyAEz8P0H2ByFouY0O9AQse0xA5TP7DVvEM",
    authDomain: "fir-webapp-4a4ae.firebaseapp.com",
    databaseURL: "https://fir-webapp-4a4ae.firebaseio.com",
    projectId: "fir-webapp-4a4ae",
    storageBucket: "fir-webapp-4a4ae.appspot.com",
    messagingSenderId: "889065246263",
    appId: "1:889065246263:web:ce41799df00d17def7b9b2",
    measurementId: "G-JMQX229FFC"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;
  
  $("#btn-login").click(function() {
    var email = $('#email').val();
    var password = $('#password').val();

    if(email != "" && password != "") {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        })
    }
    else {
        window.alert("Form is incomplete. Please fill out all fields.")
    }
  });

  $("#btn-logout").click(function() {
        firebase.auth().signOut();
  });


  $("#btn-signup").click(function() {
    var email = $('#email').val();
    var password = $('#password').val();
    var cPassword = $('#confirmPassword').val();


    if(email != "" && password != "" && cPassword != "") {
        if(password == cPassword) {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);
            result.catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            })
        }
        else {
            window.alert("Password do not match with the Confirm Password.")
        }
    }
    else {
        window.alert("Form is incomplete. Please fill out all fields.")
    }
  });

  $("#btn-resetPassword").click(function() {
    var auth = firebase.auth();
    var email = $('#email').val();

    if(email != "") {
        auth.sendPasswordResetEmail(email).then(function() {
            window.alert("Email has been sent to you, Please check and verify.")
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });
    }
    else {
        window.alert("Please write your email first.")
    }
});

$("#btn-update").click(function() {
    var phone = $('#phone').val();
    var address = $('#address').val();
    var bio = $('#bio').val();
    var fName = $('#firstName').val();
    var sName = $('#secondName').val();
    var country = $('#country').val();
    var gender = $('#gender').val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName != "" && sName != "" && phone != "" && country != "" && bio !="" && gender != "" && address != "") {
        var userData = {
            "phone" : phone,
            "address" : address,
            "bio" : bio,
            "firstName" : fName,
            "secondName" : sName,
            "country" : country,
            "gender" : gender
        };
        usersRef.set(userData, function(error) {
            if(error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            }
            else {
                window.location.href = "MainPage.html";
            }
        })
    }
    else {
        window.alert("Form is incomplete. Please fill out all fields.")
    }
});