const paragraphs = [
    "Modern football originated in Britain in the 19th century. Since before medieval times, “folk football” games had been played in towns and villages according to local customs and with a minimum of rules. Industrialization and urbanization, which reduced the amount of leisure time and space available to the working class, combined with a history of legal prohibitions against particularly violent and destructive forms of folk football to undermine the game’s status from the early 19th century onward.",
    "However, football was taken up as a winter game between residence houses at public (independent) schools such as Winchester, Charterhouse, and Eton. Each school had its own rules; some allowed limited handling of the ball and others did not. The variance in rules made it difficult for public schoolboys entering university to continue playing except with former schoolmates.",
    "As early as 1843 an attempt to standardize and codify the rules of play was made at the University of Cambridge, whose students joined most public schools in 1848 in adopting these “Cambridge rules,” which were further spread by Cambridge graduates who formed football clubs.",
    "In 1863 a series of meetings involving clubs from metropolitan London and surrounding counties produced the printed rules of football, which prohibited the carrying of the ball. Thus, the “handling” game of rugby remained outside the newly formed Football Association (FA). Indeed, by 1870 all handling of the ball except by the goalkeeper was prohibited by the FA.",
    "The new rules were not universally accepted in Britain, however; many clubs retained their own rules, especially in and around Sheffield. Although this northern English city was the home of the first provincial club to join the FA, in 1867 it also gave birth to the Sheffield Football Association, the forerunner of later county associations. Sheffield and London clubs played two matches against each other in 1866, and a year later a match pitting a club from Middlesex against one from Kent and Surrey was played under the revised rules.",
    "In 1871 15 FA clubs accepted an invitation to enter a cup competition and to contribute to the purchase of a trophy. By 1877 the associations of Great Britain had agreed upon a uniform code, 43 clubs were in competition, and the London clubs’ initial dominance had diminished.",
    "The development of modern football was closely tied to processes of industrialization and urbanization in Victorian Britain. Most of the new working-class inhabitants of Britain’s industrial towns and cities gradually lost their old bucolic pastimes, such as badger-baiting, and sought fresh forms of collective leisure. From the 1850s onward, industrial workers were increasingly likely to have Saturday afternoons off work, and so many turned to the new game of football to watch or to play.",
    "Key urban institutions such as churches, trade unions, and schools organized working-class boys and men into recreational football teams. Rising adult literacy spurred press coverage of organized sports, while transport systems such as the railways or urban trams enabled players and spectators to travel to football games. Average attendance in England rose from 4,600 in 1888 to 7,900 in 1895, rising to 13,200 in 1905 and reaching 23,100 at the outbreak of World War I. Football’s popularity eroded public interest in other sports, notably cricket.",
    "Leading clubs, notably those in Lancashire, started charging admission to spectators as early as the 1870s and so, despite the FA’s amateurism rule, were in a position to pay illicit wages to attract highly skilled working-class players, many of them hailing from Scotland.",
    "Working-class players and northern English clubs sought a professional system that would provide, in part, some financial reward to cover their “broken time” (time lost from their other work) and the risk of injury. The FA remained staunchly elitist in sustaining a policy of amateurism that protected upper and upper-middle class influence over the game."
];

const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const tryAgain = document.querySelector(".wrapper button");
const timeTag = document.querySelector(".time-left span");
const mistakeTag = document.querySelector(".mistakes span");
const wpmTag = document.querySelector(".wpm span");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistake = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random()* paragraphs.length);
    typingText.innerHTML = "";
    inputField.value = "";
    paragraphs[ranIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    if(charIndex < characters.length -1 && timeLeft > 0){
        
    if(!isTyping){
        timer = setInterval( initTimer, 1000);
        isTyping = true;
    }
    
    if(typedChar == null) {
        charIndex--;
        characters[charIndex].classList.remove("correct" ,"incorrect");

    } else {
        if (characters[charIndex].innerText === typedChar){
            characters[charIndex].classList.add("correct");
            console.log(characters[charIndex]);
            console.log(typedChar);
        } else {
            characters[charIndex].classList.add("incorrect");
            console.log(characters[charIndex]);
            console.log(typedChar);
        }
        charIndex++;
    }

    
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    const numberOfMistakes = document.querySelectorAll(".incorrect").length;
    mistakeTag.innerText = numberOfMistakes;
    const wordpm = inputField.value.split(" ").length;
    let wpm = Math.round(((wordpm - 1) / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
    } else {
        inputField.value = "";
        clearInterval(timer);
    }
}   

function initTimer() {
    if (timeLeft > 0){
        timeLeft--;
        timeTag.innerText = `${timeLeft} s`;
    } else {
        clearInterval(timer);
    }
}

loadParagraph();

inputField.addEventListener("input", initTyping);

tryAgain.addEventListener("click", () => {
    loadParagraph();
    maxTime = 60;
    timeLeft = maxTime;
    charIndex = mistake = isTyping = 0;
    timeTag.innerText = `${timeLeft} s`;
    mistakeTag.innerText = 0;
    wpmTag.innerText = 0;
    
})