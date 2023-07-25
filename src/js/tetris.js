function tetris() {
    const tetrisView = document.querySelector(".tetris__play .view ul");
    const tetScore = document.querySelector(".tetris__score");

    const line_rows = 20; //가로
    const line_cols = 12; //세로

    let Tsound = [
        "../audio/music_audio06.mp3",
        "../assets/audio/match.mp3",
        "../assets/audio/unmatch.mp3",
    ];
    let TsoundBg = new Audio(Tsound[0]);
    let TsoundMatch = new Audio(Tsound[1]);
    let TsoundUnMatch = new Audio(Tsound[2]);

    const movingItem = {
        //블록의 정보 변수
        type: "Tmino",
        direction: 0,
        top: 0,
        left: 6,
    };

    const blocks = {
        Tmino: [
            [
                [2, 1],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [1, 2],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [1, 2],
                [0, 1],
                [2, 1],
                [1, 1],
            ],
            [
                [2, 1],
                [1, 2],
                [1, 0],
                [1, 1],
            ],
        ],
        Imino: [
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
        ],
        Omino: [
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
        ],
        Zmino: [
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
            ],
            [
                [1, 0],
                [0, 1],
                [1, 1],
                [0, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
            ],
            [
                [1, 0],
                [0, 1],
                [1, 1],
                [0, 2],
            ],
        ],
        Smino: [
            [
                [1, 0],
                [2, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2],
            ],
            [
                [1, 0],
                [2, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2],
            ],
        ],
        Jmino: [
            [
                [0, 2],
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [2, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [0, 1],
                [0, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [2, 1],
            ],
        ],
        Lmino: [
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [0, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [0, 1],
                [1, 1],
                [2, 0],
                [2, 1],
            ],
        ],
    };

    let score = 0;
    let duration = 500;
    let tetrisLine = 0;
    let downInterval;
    let tempMovingItem;
    let gameover = false;


    let gameStarted = false; // 게임 시작 여부를 나타내는 변수
    // 시작하기 버튼 클릭 이벤트 핸들러
    function startGame() {
        if (!gameStarted) { // 게임이 시작되지 않은 경우에만 실행
            gameStarted = true; // 게임 시작 상태로 변경
            document.querySelector(".startButton, .startButton__wrap").style.display = "none"; // 시작 버튼 숨기기
            TsoundBg.play();
            init(); // 테트리스 초기화 및 시작
        }
    }

    //라인 만들기
    function newLine() {
        const li = document.createElement("li");
        const ul = document.createElement("ul");

        for (let j = 0; j < line_cols; j++) {
            const subLi = document.createElement("li");
            ul.prepend(subLi);
        }

        li.prepend(ul);
        tetrisView.prepend(li);
    }

    //시작하기
    function init() {
        gameover = false;
        
        score = 0;
        duration = 500;
        tetrisLine = 0;
        tetrisView.innerHTML = "";
        tempMovingItem = { ...movingItem };

        for (let i = 0; i < line_rows; i++) {
            newLine(); //라인만들기
        }

        generateNewBlock();
        console.log(score);
    }

    //블록 만들기
    function renderBlocks(moveType = "") {
        if (gameover) return;
        // console.log(movingItem.type);
        // console.log(movingItem.direction);
        // console.log(movingItem.top);
        // console.log(movingItem.left);
        // const type = movingItem.type;
        // const direction = movingItem.direction;
        // const top = movingItem.top;
        // const left = movingItem.left;
        const { type, direction, top, left } = tempMovingItem;
        // console.log(type, direction, top, left);

        const movingBlocks = document.querySelectorAll(".moving");
        movingBlocks.forEach((moving) => {
            moving.classList.remove(type, "moving");
        });

        //블록 모양잡기 foreach 대신 some 사용 some은 중간에 멈출 수 있음.
        blocks[type][direction].some((block) => {
            const x = block[0] + left;
            const y = block[1] + top;

            const target = tetrisView.childNodes[y]
                ? tetrisView.childNodes[y].childNodes[0].childNodes[x]
                : null;
            const isAvailable = checkEmpty(target);

            if (isAvailable) {
                target.classList.add(type, "moving");
            } else {
                tempMovingItem = { ...movingItem };
                setTimeout(() => {
                    renderBlocks();
                    if (moveType === "top") {
                        seizeBlock();
                    }
                }, 0);
                return true;
            }
        });
        movingItem.left = left;
        movingItem.top = top;
        movingItem.direction = direction;
    }

    //블록 감지하기
    function seizeBlock() {
        const movingBlocks = document.querySelectorAll(".moving");
        movingBlocks.forEach((moving) => {
            moving.classList.remove("moving");
            moving.classList.add("seized");
        });
        checkLose();
        checkMatch();
    }

    // 졌는지 확인
    function checkLose() {
        const childNodes = Array.from(tetrisView.children)[0].querySelectorAll(
        "ul li"
        );
        childNodes.forEach((ch) => {
        if (ch.classList.contains("seized")) {
            gameover = true;
            TsoundUnMatch;
            alert("game over")
        }
        });
    }

    //한줄 제거
    function checkMatch() {
        const childNodes = tetrisView.childNodes;

        childNodes.forEach((child) => {
            let matched = true;
            child.children[0].childNodes.forEach((li) => {
                if (!li.classList.contains("seized")) {
                    matched = false;
                }
            });
            if (matched) {
                child.remove();
                newLine();
                score += 10;
                TsoundMatch.play();
                tetScore.innerText = score + "점";
                tetrisLine++;
            }
        });

        generateNewBlock();
    }

    //새로운 블록 만든기
    function generateNewBlock() {
        if (gameover) {
            TsoundBg.pause();
            setTimeout(() => {
                document.querySelector(".tetris__gameover").style.display =
                    "block";
            }, 2000);
            document.querySelector(".tetris__gameover span").innerHTML =
                tetrisScore;
            return;
        }
        clearInterval(downInterval);
        downInterval = setInterval(() => {
            moveBlock("top", 1);
        }, duration);

        const blockArray = Object.entries(blocks);
        const randomIndex = Math.floor(Math.random() * blockArray.length);
        movingItem.type = blockArray[randomIndex][0];

        movingItem.top = 0;
        movingItem.left = 4;
        movingItem.direction = 0;
        tempMovingItem = { ...movingItem };

        renderBlocks();
    }

    //빈칸 감지
    function checkEmpty(target) {
        if (!target || target.classList.contains("seized")) {
            return false;
        }
        return true;
    }

    //블록 움직이기
    function moveBlock(moveType, amount) {
        tempMovingItem[moveType] += amount;
        renderBlocks(moveType);
    }

    //모양 변경하기
    function chageDirection() {
        const direction = tempMovingItem.direction;
        direction === 3
            ? (tempMovingItem.direction = 0)
            : (tempMovingItem.direction += 1);
        renderBlocks();
    }

    //스페이스바 누르기
    function dropBlock() {
        clearInterval(downInterval);
        downInterval = setInterval(() => {
            moveBlock("top", 1);
        }, 20);
    }

    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 39:
                moveBlock("left", 1);
                break;
            case 37:
                moveBlock("left", -1);
                break;
            case 40:
                moveBlock("top", 1);
                break;
            case 32:
                dropBlock();
                break;
            case 38:
                chageDirection();
                break;
            default:
                break;
        }
    });


    window.addEventListener("DOMContentLoaded", () => {
        init();
    });

    // DOMContentLoaded 이벤트 핸들러
    document.addEventListener("DOMContentLoaded", () => {
        const startButton = document.querySelector(".startButton");
        startButton.addEventListener("click", startGame);
    });
}
export default tetris;
