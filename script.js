let wordButtons = [
    { 
    buttonId: 1,
    word: 'CONE',
    group: 1
    },
    { 
    buttonId: 2,
    word: 'JAM',
    group: 1
    },
    { 
    buttonId: 3,
    word: 'LIGHTS',
    group: 1
    },
    { 
    buttonId: 4,
    word: 'SIGN',
    group: 1
    },
    { 
    buttonId: 5,
    word: 'BOARD',
    group: 2
    },
    { 
    buttonId: 6,
    word: 'PART',
    group: 2
    },
    { 
    buttonId: 7,
    word: 'ROUND',
    group: 2
    },
    { 
    buttonId: 8,
    word: 'VENUE',
    group: 2
    },
    { 
    buttonId: 9,
    word: 'MARTHA',
    group: 3
    },
    {
    buttonId: 10,
    word: 'MICROWAVE',
    group: 3
    },
    { 
    buttonId: 11,
    word: 'PAN',
    group: 3
    },
    { 
    buttonId: 12,
    word: 'SINK',
    group: 3
    },
    { 
    buttonId: 13,
    word: 'BAKED BEANS',
    group: 4
    },
    {
    buttonId: 14,
    word: 'MAPLE SYRUP',
    group: 4
    },
    { 
    buttonId: 15,
    word: 'HONEY',
    group: 4
    },
    { 
    buttonId: 16,
    word: 'BUTTER',
    group: 4
    }, 
]

//Fisher-Yates Sorting Algorithm to shuffle  on refresh
const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

shuffle(wordButtons);

let buttonIDs = [];
let buttonGroups = [];
const parentElement = document.querySelector('.game-container');
let i = 0;
let attemptsStr = "4 tries left!"
let attemptsLeft = 4;
let matchCount = 0;
document.getElementById('attempts').innerText = attemptsStr;

wordButtons.forEach(function (b) {
    const button = document.createElement('button');
    button.innerText = b.word;
    button.group = b.group;
    button.id = b.buttonId;
    button.active = false;
    parentElement.appendChild(button);

    button.onclick = function () {
        if (button.active === false) {
            // case if you click it and choose it
            buttonIDs.push(button.id);
            buttonGroups.push(button.group);
            button.active = true;
            button.style.backgroundColor = "white";
        } else {
            // case if you un-choose it
            button.active = false;
            button.style.backgroundColor = "rgb(241, 215, 225)";
            // remove button id from array
            buttonIDs.splice(buttonIDs.indexOf(button.id));
            buttonGroups.splice(buttonGroups.indexOf(button.group), 1);
        }

        console.log("The button ID #s = " + buttonIDs);
        console.log("The button groups are: " + buttonGroups);

        function nextFourMatch() {
            let workingGroups = buttonGroups.slice(i, i+4);
            console.log("working group: " + workingGroups);
            return workingGroups.every( x => x === workingGroups[0]);
        }

        function gameOver() {
            alert("You have lost the game. Refresh to try again :( ");
        }

        function gameWon(){
            alert("You WON!! I'm so proud of you! :) ")
        }

        if (buttonGroups.length % 4 === 0 && nextFourMatch()) {
            console.log("you matched a set!");
            i += 4;
            console.log("i = "+ i);
            matchCount += 1;
            // Disable only the clicked buttons
            wordButtons.forEach(b => {
                const buttonElement = document.getElementById(b.buttonId);
                buttonElement.disabled = buttonGroups.includes(b.group);
            });

            if (matchCount == 4){
                gameWon();
            }
            
        } else if (buttonGroups.length % 4 === 0 && !nextFourMatch()){
            attemptsLeft -= 1;
            document.getElementById('attempts').innerText = attemptsLeft + " tries left!"
            if (attemptsLeft === 0){
                gameOver();
            }
        }
    };
});

//PROBLEM: The game is broken sometimes when you unselect incorrect choices and try again incorrectly.

        


