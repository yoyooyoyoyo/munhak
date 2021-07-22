$(function(){

//만약 접속한 기기의 가로크기가 480이상이면 menu영역 보이고, 480이하이면 menu영역 숨김
var winWidth=$(window).width();
var winHeight=$(window).height();


if(winWidth>480){
    $("header").show();
    
}else{
    $("header nav").hide();
    $('.section').css('height',winHeight);
}
$(".mo_ham_sub").hide();
$("#ham_sub").hide();
//hamMenu를 클릭하면 mo_sub_menu영역이 나타남
$(".hamMenu").click(function(){
    if(winWidth>=1600){
        $("#hamMenu").show();
    }else{
        $(".mo_ham_sub").show();
    }
});


$(".close").click(function(){
    $("#ham_sub").hide();
});
$(".mo_close").click(function(){
    $(".mo_ham_sub").hide();
});

//모바일 버전 네비게이션 아코디언 메뉴
$(".mo_nav .mo_sub").hide();
$(".mo_nav > ul > li").click(function(){
    //만약 클락한 메뉴에 active가 설정되어 있지 않다면
    if($(this).attr("class")!="active"){
        $(".mo_nav > ul > li").removeClass("active");
        $(this).addClass("active");
        //내가 클릭하지 않은 서브 메뉴들은 다시 슬라이드 업 되세요        
        $(".mo_sub").slideUp();
        $(this).find(".mo_sub").slideToggle();
        //클릭한 메누에 active가 설정되어 있다면
    }else{
        $(this).removeClass("active");
        $(this).find(".mo_sub").slideUp();
    }
});




//메인슬라이드
//인덱스 번호를 나타내는 변수 선언 밑 초기화
var num=0;
//왼쪽 이미지의 촉 갯수를 읽어서 total 변수에 저장
var total=$(".photo").length;
//왼쪽 이미지의 높이를 읽어서  imgHeight변수에 저장
var imgHeight=$(".photo").height();
console.log(imgHeight);

//만약 접속한 기기의 가로길이가 1600이상이면 양쪽 슬라이드 실행되고 1600미만이면 모바일 슬라이드 실행
if(winWidth>=1600){
    //pc버전
    //왼쪽 이미지영역 - 첫번째 이미지가 보임
    $(".photo").css("z-index",1);
    $(".photo:first").css("z-index",5);
    //가운데 이미지 영역-첫번째 이미지만 보임
    $(".book_img").hide();
    $(".book_img:first").show();
    //오른쪽 글자 영역-첫번쨰 글자들만 보임
    $(".txt").removeClass("active");
    $(".txt:first").show().addClass("active");
    //number(숫자)영역-첫번쨰 숫자만 보임
    $(".number a").hide();
    $(".number a:first").show();
    //next버튼을 클릭하면 왼쪽 이미지가 위로 올라옴
$(".next_btn").click(function(){
    //기존의 설정되어있던 인터벌을 없애기
    clearInterval(auto);
    //새로운 인터벌 설정하기, 밑에 설정해 놓았던 바 움직이는 함수
    auto=setInterval(movefn,10000);
    barfn();


    //이미지의 인덱스 번호를 1씩 증가시킴
    num++;
    //이미지의 인덱스 번호가 이미지의 총 개수보다 크면 0으로 초기화
    if(num>=total){num=0;}
    //왼쪽 이미지의 개수만큼 반복
    $(".photo").each(function(){
        //왼쪽 이미지의 인덱스 번호를 imgNum변수에 저장
        var imgNum=$(this).index();//여기서 this는 photo를 가리킨다
        //만약에 num값과 imgNum값이 같다면
        if(num==imgNum){
            //모든이미지는 순서를 뒤로 함.
            //imgNum인덱스 번호에 해당하는 이미지 이동
            $(".photo").css("z-index",1);
            $(this).css({"top":imgHeight, "z-index":5});
            $(this).animate({"top":0},700,"easeOutExpo"); //easing 넣어줌
            $(this).prev().css("z-index",3);
        }
    });
    //가운데 이미지의 개수만큼 반복
    $(".book_img").each(function(){
        //가운데 이미지의 인덱스 번호를 centerNum변수에 저장
        var centerNum=$(this).index();
        //만약 num값과 centerNum값이 같다면
        if(num==centerNum){
            //모든 가운데 이미지 안보임
            $(".book_img").fadeOut();
            $(this).fadeIn();
        }
    });
    //number(숫자)의 개수만큼 반복
    $(".number a").each(function(){
        //숫자(a태그)의 인덱스번호를 numberNum변수에 저장
        var numberNum=$(this).index();
        //만약 num값과 numberNum값이 같다면
        if(num==numberNum){
            //모든숫자 안보임
            $(".number a").hide();
            //현재 해당 숫자만 보임
            $(this).show();
        }
    });
    //txt영역 글자 애니메이션
    $(".txt").each (function(){
        //txt영역의 인덱스 번호를 txtNum변수에 저장
        var txtNum=$(this).index();
        //만약 num값과 txtNum값이 같다면
        if(num==txtNum){
            $(".txt").removeClass("active").hide();
            $(this).show().addClass("active");
        }

    })
});
//prev버튼을 클릭하면 왼쪽 이미지가 위로 올라옴
$(".prev_btn").click(function(){
    //기존의 설정되어있던 인터벌을 없애기
    clearInterval(auto);
    //새로운 인터벌 설정하기, 밑에 설정해 놓았던 바 움직이는 함수
    auto=setInterval(movefn,10000);
    barfn();


    //이미지의 인덱스 번호를 1씩 감소시킴
    num--;
    //이미지의 인덱스 번호가 0보다 작으면 total-1로 초기화
    if(num<0){num=total-1;}
    //왼쪽 이미지의 개수만큼 반복
    $(".photo").each(function(){
        //왼쪽 이미지의 인덱스 번호를 imgNum변수에 저장
        var imgNum=$(this).index();//여기서 this는 photo를 가리킨다
        //만약에 num값과 imgNum값이 같다면
        if(num==imgNum){
            //모든이미지는 순서를 뒤로 함.
            //imgNum인덱스 번호에 해당하는 이미지 이동
            $(".photo").next().css("z-index",2);
            $(this).next().css("z-index",3);
            $(this).prev().css("z-index",1);
            $(this).css({"top":-imgHeight, "z-index":5});
            $(this).animate({"top":0},700,"easeOutExpo");
        }
    });
    //가운데 이미지의 개수만큼 반복
    $(".book_img").each(function(){
        //가운데 이미지의 인덱스 번호를 centerNum변수에 저장
        var centerNum=$(this).index();
        //만약 num값과 centerNum값이 같다면
        if(num==centerNum){
            //모든 가운데 이미지 안보임
            $(".book_img").fadeOut();
            $(this).fadeIn();
        }
    });
    //number(숫자)의 개수만큼 반복
    $(".number a").each(function(){
        //숫자(a태그)의 인덱스번호를 numberNum변수에 저장
        var numberNum=$(this).index();
        //만약 num값과 numberNum값이 같다면
        if(num==numberNum){
            //모든숫자 안보임
            $(".number a").hide();
            //현재 해당 숫자만 보임
            $(this).show();
        }
    });
    //txt영역 글자 애니메이션
    $(".txt").each (function(){
        //txt영역의 인덱스 번호를 txtNum변수에 저장
        var txtNum=$(this).index();
        //만약 num값과 txtNum값이 같다면
        if(num==txtNum){
            $(".txt").removeClass("active").hide();
            $(this).show().addClass("active");
        }

    })
});
//10초마다 자동으로  메인 페이지 다음버튼 누르기실행
var auto=setInterval(movefn,10000);

function movefn(){
    $(".next_btn").click();
    barfn();
}
//10초마다 자동으로 화면위의 바가 움직임
//함수 선언
function barfn(){
    $(".bar").stop();
    $('.bar').css('width',0);
    //slide_bar 안의 자식 객체 bar의 가로길이 길어짐
    $('.bar').stop().animate({'width':'100%'},9500); //바 가로길이 길어지게 할때 10초
}
//함수 호출
barfn();

/*
//new영역(.new_hover에 마우스 오버했을떄 .new_move가 살짝 이동함)
$(".new_hover").mouseover(function(){
    //0~50사이의 무작위수 발생
    var x=Math.ceil(Math.random()*50);
    var y=Math.ceil(Math.random()*50);
    $(this).find(".new_mive").animate({"left":x, "top":y});
});
*/


//.new_btn을 클릭하면 오른쪽 3개의 이미지가 이동함
var sw=0;
//.new_book ul 의 길이/2한값을 ulMove변수에 저장
var ulMove=Math.ceil($(".new_book ul").width()/2);
    $(".new_btn").click(function(e){
    //만약 sw값이 0이면
    e.preventDefault();
    if(sw==0){
        sw=1;
        $(".new_btn").css("background-position","left center");
        $(".new_book ul").stop().animate({left:-ulMove},700,"easeInOutExpo");
    }else{
        sw=0;
        $(".new_btn").css("background-position","right center");
        $(".new_book ul").stop().animate({left:0},700,"easeInOutExpo");
    };
});

//fullpage플러그인 쓸때 마우스 휠 내리면 화면 바뀔때 옆에 있는 동그란 네비게이션 바뀌는거
$("#fullpage").fullpage({
    //fullpage의 동그란 메뉴 사용
    navigation:true,
    //fellpage의 동그란 메뉴위치를 화면 왼쪽으로 설정
    navigationPosition:"left",
    //fullpage의 동그란 메뉴에 메뉴이름 설정
    navigationTooltips:["MAIN","NEW","COMMUNITY","WEBZINE","BOARD"],//네비게이션 점 옆에 써져있는 이름들
    //fullpage의 동그란 메뉴의 이름을 사용
    showActiveTooltip:true,
    //fullpage의 냉ㅛㅇ을 불러온 다음 function안의 명령어실행
    //매개변수 (anchorLink: 메뉴랑 section연동, index: secrion의 인덱스번호, direction:화면이 이동하는 방향)
    afterLoad:function(anchorLink, index, direction){
        //section의 인덱스 번호가 4인 경우
        if(index==4){
            //navigation의 주메뉴에 active 설정
            $("header nav > ul > li").addClass("active");
        }
        //첫번째 section이거나 3번째 section일때에는
        if(index==1 || index==2 || index==3 || index==5){
            //navigation의 주메뉴에 active 제거
            $("header nav > ul > li").removeClass("active")
        }
    },
    //section이 이동할때 function다음의 명령어 실행
    //매개변수(index:section의 인덱스번호, nextIndex:다음 section을 가리킴, direction:화면이 이동하는 방향)
    onLeave:function(index, nextIndex, direction){
        //만약 section의 인덱스 번호가 5이고 다음 section의 인덱스본호가 6이면 (section5에서 아래로 이동할때)
        //footer영역에서는 네비게이션 사라짐
        if(index==5 && nextIndex==6){
            $("header").fadeOut();
        //그렇지않으면 
        }else{
            //네비게이션 나타남
            $("header").fadeIn();
        }
    }
});
}else{
    //태블릿, 모바일버전 슬라이드
    //photo의 인덱스 번호를 나타내는 변수
    var mo_num=0;
    //photo의 총 개수를 mo_total변수에 저장
    var mo_total=$(".photo").length;
    //photo의 가로길이를 imgWidth변수에 저장
    var imgWidth=$(".photo").width();
    //모든 photo가 보임
    $(".photo").show();
    //모든 center_img안의 book도 보임
    $(".book_img").show();
    //마지막photo이미지를 첫번째 photo이미지의 왼쪽에 배치
    $(".photo:last-child").prependTo(".left_img");
    //마지막 book_img를 첫번째 book_img이비지의 왼쪽에 배치
    $(".book_img:last-child").prependTo(".center_img");
    //.left_img의 left값을 photo의 가로길이만큼 왼쪽으로 이동시킴
    $(".left_img").css("left",-imgWidth);
    //.center_img의 left값을 photo의 가로길이만큼 왼쪽으로 이동시킴
    $(".center_img").css("left",-imgWidth);
    //.bottom_btn 모든 숫자 숨김
    $(".number a").hide();
    $(".number a:first").show();
    //
    $(".right_txt .txt").hide();
    $(".right_txt .txt:first-child").show();
    

    //next_btn 에 클릭이벤트 설정
    $(".next_btn").click(function(){
        mo_num++;
        if(mo_num>=mo_total){mo_num=0};
        

        //"-="+imgWidth ==> 왼쪽으로 .photo의 가로길이만큼 이동해라
        $(".left_img").animate({left:"-="+imgWidth},700,"easeOutExpo",
        function(){
            //.left_img영역이 이동하고 난 후 첫번쨰 photo가 left_img영역의 맨뒤로 추가됨
            $(".photo:first-child").appendTo(".left_img");
            $(".left_img").css("left",-imgWidth);
        });
        $(".center_img").animate({left:"-="+imgWidth},700,"easeOutExpo",
        function(){
            //.left_img영역이 이동하고 난 후 첫번쨰 photo가 left_img영역의 맨뒤로 추가됨
            $(".book_img:first-child").appendTo(".center_img");
            $(".center_img").css("left",-imgWidth);
        });
        //number(숫자)의 개수만큼 반복
        $(".number a").each(function(){
            //숫자(a태그)의 인덱스번호를 numberNum변수에 저장
            var numberNum=$(this).index();
            //만약 num값과 numberNum값이 같다면
            if(mo_num==numberNum){
                //모든숫자 안보임
                $(".number a").hide();
                //현재 해당 숫자만 보임
                $(this).show();
            }
        });
        //right_txt
        $(".right_txt .txt").each(function(){
            //숫자(a태그)의 인덱스번호를 numberNum변수에 저장
            var txtNum=$(this).index();
            //만약 num값과 numberNum값이 같다면
            if(mo_num==txtNum){
                //모든숫자 안보임
                $(".right_txt .txt").hide();
                //현재 해당 숫자만 보임
                $(this).show();
            }
        });



    });

    //prev_btn 에 클릭이벤트 설정
    $(".prev_btn").click(function(){
        mo_num--;
        if(mo_num<0){mo_num=mo_total-1};
        


        //"-="+imgWidth ==> 오른쪽으로 .photo의 가로길이만큼 이동해라
        $(".left_img").animate({left:"+="+imgWidth},700,"easeOutExpo",
        function(){
            //.left_img영역이 이동하고 난 후 마지막 photo가 left_img영역의 맨앞로 추가됨
            $(".photo:last-child").prependTo(".left_img");
            $(".left_img").css("left",-imgWidth);
        });
        $(".center_img").animate({left:"+="+imgWidth},700,"easeOutExpo",
        function(){
            //.left_img영역이 이동하고 난 후 마지막 photo가 left_img영역의 맨앞로 추가됨
            $(".book_img:last-child").prependTo(".center_img");
            $(".center_img").css("left",-imgWidth);
        });
        //number(숫자)의 개수만큼 반복
        $(".number a").each(function(){
            //숫자(a태그)의 인덱스번호를 numberNum변수에 저장
            var numberNum=$(this).index();
            //만약 num값과 numberNum값이 같다면
            if(mo_num==numberNum){
                //모든숫자 안보임
                $(".number a").hide();
                //현재 해당 숫자만 보임
                $(this).show();
            }
        });
        //right_txt
        $(".right_txt .txt").each(function(){
            //숫자(a태그)의 인덱스번호를 numberNum변수에 저장
            var txtNum=$(this).index();
            //만약 num값과 numberNum값이 같다면
            if(mo_num==txtNum){
                //모든숫자 안보임
                $(".right_txt .txt").hide();
                //현재 해당 숫자만 보임
                $(this).show();
            }
        });
         


    });
    //new_book
        //outerWidth()메서드는 padding, margin값 포함한 가로길이 구함
        var mo_width=$(".mo_new_book ul li").outerWidth();
        $(".mo_new_book ul li:last-child").prependTo(".mo_new_book ul");
        $(".mo_new_book ul").css("left",-mo_width);

        //배열선언
        var startX={};
        var endX={};
        //이벤트를 사용할떄 on을 쓴다(2가지 이벤트 이상 사용할떄) 여기에서는 touchstart랑 touchmove
        $(".mo_new_book ul").on({
            //.mo_new_book ul 객체에 touchstart이벤트 설정, e:이벤트를 전달하는 매개변수
            "touchstart":function(e){
                //e.touches[0]: 터치이벤트가 발생한 객체
                //pageX: 가로스크롤을 포함한 브라우저 화면을 기준으로 한 x좌표
                startX=e.touches[0].pageX;
            },
            //.mo_new_book ul 객체에 touchmove이벤트 설정
            "touchmove":function(e){
                //touch움직임이 끝난 지점의 x좌표값을 endX배열에 저장
                endX=e.touches[0].pageX;
                //touch한 시작x좌표에서 움직임이 끝난 x좌표값을 빼서 fnx에 저장
                var fnX=startX-endX;
                //만약 fnX값이 0보다 크면 (왼쪽방향)
                if(fnX>0){
                    $(".mo_new_book ul").stop().animate({"left":"-="+mo_width},700, "easeInExpo",function(){
                        $(".mo_new_book ul li:first-child").appendTo(".mo_new_book ul");
                        $(".mo_new_book ul").css("left",-mo_width);
                    });

                //fnX값이 0보다 크지 않다면 (작거나 같다면, 오른쪽방향)   
                }else{
                    $(".mo_new_book ul").stop().animate({"left":"+="+mo_width},700, "easeInExpo",function(){
                        $(".mo_new_book ul li:last-child").prependTo(".mo_new_book ul");
                        $(".mo_new_book ul").css("left",-mo_width);
                    });

                }
            }
        });
}



});