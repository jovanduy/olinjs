var $loginForm = $("#login-form");
var $loginButton = $("#login");
var $users = $('.users');
var $delete = $('.delete');
resetButtons();

function resetButtons () {
    $delete = $('.delete');
    var name = $('#make-twote > p.name').text();
    console.log(name);
    $delete.each(function () {
        if ($(this).parent().hasClass(name)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    $delete.each(function () {
        $(this).click(function () {
            event.preventDefault();
            var $parent = $(this).parent();
            var text = $parent.children('.text').text();
            console.log(text);
            $.post('/twotes/delete', {
                text: text
            })
                .done(onSuccessDelete)
                .error(onError);
        })
    })
}

var onSuccessDelete = function (data, status) {
    console.log(data);
    var $twote = $("p:contains(" + data.text+ ")");
    $twote.parent().css('display', "none")
}

var onError = function (data, status) {
	console.log("status", status);
	console.log("error", data);
};

var onSuccessLogin = function (data, status) {
    window.location.replace('/');
    $('#make-twote').css('display, block');
    resetButtons();
}

var onSuccessLoadLogin = function (data, status) {
    window.location.replace('/login');
}

 $loginForm.submit(function (event) {
        event.preventDefault();
        var name = $loginForm.find("[name='name']").val();
        $.post('/login', {
            name: name
        })
            .done(onSuccessLogin)
            .error(onError);
    });

$loginButton.click(function () {
    event.preventDefault();
    $.get('/login')
        .done(onSuccessLoadLogin)
        .error(onError);
});

var onSuccessTwote = function (data, status) {
    var $twote = $('div.fakeTwote').first().clone();
    $twote.attr('class', 'twote');
    $twote.removeClass('fakeTwote');
    $twote.addClass('twote ' + data.author);
    $twote.find('p.text').html(data.text);
    $twote.find('p.author').html(data.author);
    $twote.css('display', "block");
    $("#twoteList").prepend($twote);
    resetButtons();
}

function submitTwote () {
    event.preventDefault();
    var $form = $("#make-twote");
    var text = $form.find("[name='twote']").val();
    var author = $("p.name").text();
    $.post('/twotes', {
        text: text,
        author: author
    })
        .done(onSuccessTwote)
        .error(onError);
}

function highlightTwotes(id) {
    event.preventDefault();
    $('.twote').css('background-color', '#d8d7d9');
    $('.users').css('background-color', '#d8d7d9');
    $('.' + id).css('background-color', '#c4c3c6');
    $('#' + id).css('background-color', '#c4c3c6');
}

var onSuccessLogout = function (data, status) {
    window.location.replace('/login');
}

function logout() {
    event.preventDefault();
    $.post('/logout', {
        name: $(".name").html()
    })
        .done(onSuccessLogout)
        .error(onError);
}