$(document).ready(function(){

    function emailValidation(email){
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.val() == '' || !re.test(email.val()))
        {
            return false;
        }
        return true;
    }



    if ($('.uiDate').length > 0){
        $('.uiDate').datetimepicker({
            format: 'DD-MM-YYYY HH-mm A'
        });
    }

    $('.toggleButton').on('click', function(){
        var dataToggle = $(this).attr('data-toggle');
        $(this).find('span').toggleClass('glyphicon-remove', 'glyphicon-th-list');
        $(dataToggle).toggleClass('open')
    });
    $('.navigation a').on('click', function(){
        $('.toggleButton').find('span').removeClass('glyphicon-remove').addClass('glyphicon-th-list');
        $('.navigation').removeClass('open')
    });

    /*** Email Validation **/
    $('#fieldEmail, #email_field').on('change', function(){
        var email = $(this);
        var validation = emailValidation(email);

        if (validation === false)
        {
            email.addClass('wrongData');
        }else{
            email.removeClass('wrongData')
        }
    });




    /*** Scroll Animate **/
    var inScroll;

    $(window).on('scroll load', function(){



        var screen_h = $(window).height();
        var screen_t = $(document).scrollTop();

        var ofsHead = $(window).scrollTop();
        if (ofsHead > 120){
            $('.theHead').addClass('white')
        }else{
            $('.theHead').removeClass('white')
        }

        $('.getReady').each( function(i){
            var bottom_of_object = $(this).offset().top; // 200
            var bottom_of_window = $(window).scrollTop() + ($(window).height() * 0.7 );
            var h = $(this).height();
            if( bottom_of_window > bottom_of_object &&  (bottom_of_object + h ) >= ( $(window).scrollTop() * 1.1)  ){
                $(this).addClass('ready inReady');
            }else{
                $(this).removeClass('inReady');
            }



        });

        $('[data-section^="jScroll_"]').each(function (e) {
            var st = $(window).scrollTop() + ($(window).height() / 2) ;
            var h = $(this).height();

            var offsetTop = $(this).offset().top;
            var section = $(this).attr('data-section');
            if (st  >= offsetTop && st  <= offsetTop + h) {
                inScroll =  $("[href='#"+section+"']");
                inScroll.addClass('actives')
            }else{
                $("[href='#"+section+"']").removeClass('actives')
            }
        });


    });

    /** Scroll To **/

    $(window).on('load', function(){
        var link = window.location.hash;
        if(link){
            iWantScroll(link);
        }
    });
    $('.scrollTo').on('click', function(){
        if(this.href.split('#')[0] == document.location.toString().split('#')[0]){
            var link = $(this).attr('href');
            iWantScroll(link);
        }
    });

    function iWantScroll(link){
        if ($(link).length > 0){
            $("html, body").animate({ scrollTop: $(link).offset().top -70 }, 1000);
            e.preventDefault(false)
        }else{
            window.location.href = "/"+link;
        }
    }

    /** Email - ON SUBMIT  **/




    $('#email_form').on('submit',function(e){

        var emailValid = $(this).find('.emailValidation');
        if ( emailValidation(emailValid) === false){
            $('<div class="tooltipError">Please enter a valid email address.</div>').insertAfter(emailValid);
            setTimeout(function(){
                $('.tooltipError').remove();
            }, 2000);
            return false;
        }

        $('#fieldMessage').html('Sent');
        $('.fieldWrap >*:not(.thanks)').addClass('hidden');
        $('.fieldWrap .thanks').removeClass('hidden');

        e.preventDefault(false);
    });
    $('#talking_form').on('submit',function(e){

        var emailValid = $(this).find('.emailValidation');
        if ( emailValidation(emailValid) === false){
            $('<div class="tooltipError">Please enter a valid email address.</div>').insertAfter(emailValid);
            setTimeout(function(){
                $('.tooltipError').remove();
            }, 2000);
            return false;
        }

        var thanks = $(this).find('.thanks');



        e.preventDefault(false);

        thanks.removeClass('semi-hidden');
        setTimeout(function(){
            thanks.addClass('semi-hidden')
        }, 5000);
    });





    /** Video  Modal & Play **/
    $('.watchTheVideo').on('click', function(){
        var videoID = $(this).attr('data-video');
        $('#'+videoID).modal().on('hidden.bs.modal', function(){
            $('#video_popup_video')[0].pause();
        });
        $('#video_popup_video')[0].play();

    });

});

$(window).on('load', function(){
    $('.setReady, .searchBanner').addClass('ready');
});



