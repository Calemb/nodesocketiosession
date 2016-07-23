$(document).ready(function () {
    //create socket connection
    var socket = io.connect('http://localhost:3000');

    //log In with ajax, ask app.js as serwer about users
    $("#aLogin").click(function () {
      var email = $("#iEmail").val();
      var pass = $("#iPass").val();
      socket.emit('login', {email, pass});
      // return false;

        //
        // $("#link").html("PROCESSING");
        // $.ajax({
        //     url: "login",
        //     method: "POST",
        //     data: { email: email, pass: pass }
        // }).done(function (msg) {
        //     $("#link").html(msg);
        // }).fail(function (jqXHR, textStatus) {
        //     $("#link").html("FAIL" + textStatus);
        // });
        //
        return false;
    });
    $("#aLogout").click(function () {

        $("#link").html("PROCESSING");
        $.ajax({
            url: "logout",
            method: "POST",
            data: {}
        }).done(function (msg) {
            $("#link").html(msg);
        }).fail(function (jqXHR, textStatus) {
            $("#link").html("FAIL" + textStatus);
        });

        return false;
    });

    //just click
    $("#link").click(function () {
        socket.emit('linkClkEvent', { my: 'data' });
        return false;
    });

    socket.on('inputResponse', function (response) {
        console.log(response);
    });
});
