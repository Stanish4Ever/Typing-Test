const paragraphs = [
    `One morning my friend and I were thinking about how we could plan our summer break away from school. Driving from our own state to several nearby states would help to expand our limited funds. Inviting six other friends to accompany us would lower our car expenses. Stopping at certain sites would also help us stretch our truly limited travel budget. Yesterday I engaged in an interesting and enlightening discussion about finances. I found it difficult to imagine that during my lifetime I might well earn at least one-half million dollars. It is also possible that I might spend as much as one-half million during the same period. The really difficult thing for me to do will be to save more of the half-million than I spend.`,
    `Thinking about today's high cost of living makes this seem an impossible task for most. Last week I asked a friend to talk with me and a girl-friend about college. Our friend is the Dean of Women at a nearby college. The Dean and her staff spend much of their time talking to students who plan to go to college. The first thing she said was to work very hard each day in high school. Good grades are most important for being accepted. Being on time for classes and having a good view toward all phases of the school life are two other things to remember.`,
    `Takemichi Hanagaki is a freelancer that's reached the absolute pits of despair in his life. He finds out that the only girlfriend he ever had, in middle school, Hinata Tachibana, had been killed by the ruthless Tokyo Manji Gang. The day after hearing about her death, he's standing on the station platform and ends up being pushed over onto the tracks by a herd of people. He closes his eyes thinking he's about to die, but when he opens his eyes back up, he somehow had gone back in time 12 years. Now that he's back living the best days of his life, Takemichi decides to get revenge on his life.`,
    `There once lived a pirate named Gol D. Roger. He obtained wealth, fame, and power to earn the title of Pirate King. When he was captured and about to be executed, he revealed that his treasure called One Piece was hidden somewhere at the Grand Line. This made all people set out to search and uncover the One Piece treasure, but no one ever found the location of Gol D. Roger's treasure, and the Grand Line was too dangerous a place to overcome. Twenty-two years after Gol D. Roger's death, a boy named Monkey D. Luffy decided to become a pirate and search for Gol D. Roger's treasure to become the next Pirate King.`,
]
const pg = document.getElementById('pg');
const userinput = document.querySelector(".text-input");
const resetbtn = document.querySelector(".container-in button");
const totaltime = document.querySelector(".time .txt2");
const totalwpm = document.querySelector(".wpm .txt2");
const totalmistake = document.querySelector(".mistake .txt2");
const totalcpm = document.querySelector(".cpm .txt2");
let timer;
let maxTime = 69;
let timeRemaining = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = 0;

const setparagraph = () => {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    pg.innerText = "";
    paragraphs[randIndex].split("").forEach(char => {
        console.log(char);
        pg.innerHTML += `<span>${char}</span>`
    })
    pg.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", () => userinput.focus())
    pg.addEventListener("click", () => userinput.focus())

    totaltime.innerText = timeRemaining;
    totalcpm.innerText = 0;
    totalwpm.innerText = 0;
    totalmistake.innerText = 0;

}
const startTyping = () => {
    let characters = pg.querySelectorAll('span');
    let typedChar = userinput.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeRemaining > 0) {
        if (!isTyping) {
            timer = setInterval(startTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0)
                charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("incorrect", "correct");

        }
        else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");

            }
            else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;

            }
            charIndex++;

        }
        characters.forEach(char => {
            char.classList.remove("active");
        })
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
        wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
        totalwpm.innerText = wpm;
        totalmistake.innerText = mistakes;
        totalcpm.innerText = charIndex - mistakes;

    }
    else {
        clearInterval(timer);
        isTyping = false;
    }

}

const startTimer = () => {
    if (timeRemaining > 0) {
        timeRemaining--;
        totaltime.innerText = timeRemaining;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
        totalwpm.innerHTML = wpm;
    }
    else {
        clearInterval(timer);
        isTyping = false;
    }

}
const resetGame = () => {
    setparagraph();
    clearInterval(timer);
    timeRemaining = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = 0;
    userinput.value = "";
    totaltime.innerText = timeRemaining;
    totalcpm.innerText = 0;
    totalwpm.innerText = 0;
    totalmistake.innerText = 0;

}

setparagraph();
resetbtn.addEventListener("click", resetGame);
userinput.addEventListener('input', startTyping);