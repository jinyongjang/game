function start() {
    $(".icon1").draggable({
        containment: ".icon__box",
        scroll: false,
        start: function () {
            $(".cursor img").attr("src", "images/game_mouse01.png");
            $("#header").css("background-color", "red");
            $("#footer .info").html("현재 빨간 뮤직듣기를 드래그 했습니다.");
        },
        stop: function () {
            setTimeout(function () {
                printAgent();
            }, 1000); // 1초 후에 실행
        },
    });
    $(".icon2").draggable({
        containment: ".icon__box",
        scroll: false,
        start: function () {
            $(".cursor img").attr("src", "images/game_mouse02.png");
            $("#header").css("background-color", "blue");
            $("#footer .info").html("현재 파란 뮤직듣기를 드래그 했습니다.");
        },
        stop: function () {
            setTimeout(function () {
                printAgent();
            }, 1000); // 1초 후에 실행
        },
    });
    $(".icon3").draggable({
        containment: ".icon__box",
        scroll: false,
        containment: ".icon__box",
        scroll: false,
        start: function () {
            $(".cursor img").attr("src", "images/game_mouse03.png");
            $("#header").css("background-color", "green");
            $("#footer .info").html("현재 그린 뮤직듣기를 드래그 했습니다.");
        },
        stop: function () {
            setTimeout(function () {
                printAgent();
            }, 1000); // 1초 후에 실행
        },
    });
    $(".icon4").draggable({
        containment: ".icon__box",
        scroll: false,
        containment: ".icon__box",
        scroll: false,
        start: function () {
            $(".cursor img").attr("src", "images/game_mouse04.png");
            $("#header").css("background-color", "yellow");
            $("#footer .info").html("현재 노란 뮤직듣기를 드래그 했습니다.");
        },
        stop: function () {
            setTimeout(function () {
                printAgent();
            }, 1000); // 1초 후에 실행
        },
    });

    $(".music__wrap").draggable({
        scroll: false,
    });

    $(".tetris__wrap").draggable({
        scroll: false,
    });

    window.onload = function () {
        window.addEventListener("mousemove", (e) => {
            gsap.to(".cursor", {
                duration: 0,
                left: e.pageX - 5,
                top: e.pageY - 10,
            });
        });
    };

    function printTime() {
        const clock = document.querySelector(".time");
        const now = new Date();

        let nowDate = now.getDate();
        if (nowDate < 10) nowDate = `0${nowDate}`;

        let nowHours = now.getHours();
        if (nowHours > 12) {
            nowHours = `오후 ${nowHours - 12}`;
        } else {
            nowHours = `오전 ${nowHours}`;
        }

        let nowMinutes = now.getMinutes();
        if (nowMinutes < 10) nowMinutes = `0${nowMinutes}`;

        let nowSeconds = now.getSeconds();
        if (nowSeconds < 10) nowSeconds = `0${nowSeconds}`;

        const nowTime =
            now.getFullYear() +
            "년 " +
            (now.getMonth() + 1) +
            "월 " +
            nowDate +
            "일 " +
            nowHours +
            "시 " +
            nowMinutes +
            "분 ";
        clock.innerText = nowTime;
        setTimeout(printTime, 1000);
    }
    printTime(); // 오른쪽 상단 시간

    function printAgent() {
        let os = navigator.userAgent.toLowerCase();
        let sw = screen.width;
        let sh = screen.height;
        let info = document.querySelector("#footer .info");

        if (os.indexOf("windows") >= 0) {
            info.innerHTML =
                "현재 윈도우를 사용하고 있으며, 화면 크기는 " +
                sw +
                "x" +
                sh +
                " 입니다.";
        } else if (os.indexOf("macintosh") >= 0) {
            info.innerHTML =
                "현재 맥을 사용하고 있으며, 화면 크기는 " +
                sw +
                "x" +
                sh +
                " 입니다.";
        } else if (os.indexOf("iphone") >= 0) {
            info.innerHTML =
                "현재 아이폰을 사용하고 있으며, 화면 크기는 " +
                sw +
                "x" +
                sh +
                " 입니다.";
        } else if (os.indexOf("android") >= 0) {
            info.innerHTML =
                "현재 안드로이드 폰을 사용하고 있으며, 화면 크기는 " +
                sw +
                "x" +
                sh +
                " 입니다.";
        }
    }
    printAgent(); // 하단 중앙 모니터 정보

    var makeItRain = function () {
        //clear out everything
        $(".rain").empty();

        var increment = 0;
        var drops = "";
        var backDrops = "";

        while (increment < 100) {
            //couple random numbers to use for various randomizations
            //random number between 98 and 1
            var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
            //random number between 5 and 2
            var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
            //increment
            increment += randoFiver;
            //add in a new raindrop with various randomizations to certain CSS properties
            drops +=
                '<div class="drop" style="left: ' +
                increment +
                "%; bottom: " +
                (randoFiver + randoFiver - 1 + 100) +
                "%; animation-delay: 0." +
                randoHundo +
                "s; animation-duration: 0.5" +
                randoHundo +
                's;"><div class="stem" style="animation-delay: 0.' +
                randoHundo +
                "s; animation-duration: 0.5" +
                randoHundo +
                's;"></div><div class="splat" style="animation-delay: 0.' +
                randoHundo +
                "s; animation-duration: 0.5" +
                randoHundo +
                's;"></div></div>';
            backDrops +=
                '<div class="drop" style="right: ' +
                increment +
                "%; bottom: " +
                (randoFiver + randoFiver - 1 + 100) +
                "%; animation-delay: 0." +
                randoHundo +
                "s; animation-duration: 0.5" +
                randoHundo +
                's;"><div class="stem" style="animation-delay: 0.' +
                randoHundo +
                "s; animation-duration: 0.5" +
                randoHundo +
                's;"></div><div class="splat" style="animation-delay: 0.' +
                randoHundo +
                "s; animation-duration: 0.5" +
                randoHundo +
                's;"></div></div>';
        }

        $(".rain.front-row").append(drops);
        $(".rain.back-row").append(backDrops);
    };

    $(".splat-toggle.toggle").on("click", function () {
        $("body").toggleClass("splat-toggle");
        $(".splat-toggle.toggle").toggleClass("active");
        makeItRain();
    });

    $(".back-row-toggle.toggle").on("click", function () {
        $("body").toggleClass("back-row-toggle");
        $(".back-row-toggle.toggle").toggleClass("active");
        makeItRain();
    });

    $(".single-toggle.toggle").on("click", function () {
        $("body").toggleClass("single-toggle");
        $(".single-toggle.toggle").toggleClass("active");
        makeItRain();
    });

    makeItRain();
}

export default start;
