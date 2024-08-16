let game_o_x = document.querySelector(".game-o-x");
let turn = localStorage.getItem("lastTurn") === "x" ? "o" : "x"; // تحديد من يبدأ بناءً على آخر دور
let squares = [];
let scoreX = parseInt(localStorage.getItem('scoreX')) || 0; // استرجاع النقاط من localStorage أو البدء من 0
let scoreO = parseInt(localStorage.getItem('scoreO')) || 0; // استرجاع النقاط من localStorage أو البدء من 0
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

// تحديث عرض النتائج عند تحميل الصفحة
scoreXElement.textContent = scoreX;
scoreOElement.textContent = scoreO;

function playVictorySound() {
  const audio = new Audio('./winning-218995.mp3'); // ضع مسار ملف الصوت هنا
  audio.play();
}

function resetScores() {
  scoreX = 0;
  scoreO = 0;
  localStorage.setItem('scoreX', scoreX); // تصفير النقاط في localStorage
  localStorage.setItem('scoreO', scoreO);
  scoreXElement.textContent = scoreX; // تحديث عرض النقاط إلى 0
  scoreOElement.textContent = scoreO;
}

function showWinnerMessage(winner) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'winner-message';
  messageDiv.innerHTML = `${winner} is the winner!`;
  document.body.appendChild(messageDiv);
}

function end(num1, num2, num3) {
    const winner = squares[num1];
    game_o_x.innerHTML = `${winner} winner`;
    document.getElementById("item" + num1).classList.add('winner-animation');
    document.getElementById("item" + num2).classList.add('winner-animation');
    document.getElementById("item" + num3).classList.add('winner-animation');
  
    showWinnerMessage(winner);
  
    if (winner === 'X') {
      scoreX++;
      localStorage.setItem('scoreX', scoreX); // حفظ النقاط في localStorage
      scoreXElement.textContent = scoreX;
    } else if (winner === 'O') {
      scoreO++;
      localStorage.setItem('scoreO', scoreO); // حفظ النقاط في localStorage
      scoreOElement.textContent = scoreO;
    }
  
    if (scoreX === 5 || scoreO === 5) {
      playVictorySound(); // تشغيل صوت الفوز
  
      // تصفير النقاط بعد انتهاء الصوت
      setTimeout(function() {
        resetScores();
        setTimeout(function() {
          location.reload(); // إعادة تحميل الصفحة بعد 5 ثوانٍ
        }, 0); // تأخير إعادة التحميل بـ 5 ثوانٍ بعد تصفير النقاط
      }, 5000); // تأخير تصفير النقاط بـ 5 ثوانٍ للسماح بتشغيل الصوت بالكامل
    } else {
      setInterval(function () {
        game_o_x.innerHTML += " .";
      }, 700);
  
      setTimeout(function () {
        location.reload();
      }, 2000); // إعادة تحميل الصفحة بعد 4 ثوانٍ في حالة الفوز العادي
    }
  }
  
function checkDraw() {
  let filled = 0;
  for (let i = 1; i < 10; i++) {
    if (squares[i] !== "") {
      filled++;
    }
  }
  if (filled === 9) {
    game_o_x.innerHTML = "It's a draw!";
    setTimeout(function () {
      location.reload();
    }, 2000);
  }
}

function winner() {
  for (let i = 1; i < 10; i++) {
    squares[i] = document.getElementById("item" + i).innerHTML;
  }
  if (squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != '') {
    end(1, 2, 3);
  } else if (squares[4] == squares[5] && squares[5] == squares[6] && squares[5] != '') {
    end(4, 5, 6);
  } else if (squares[7] == squares[8] && squares[8] == squares[9] && squares[7] != '') {
    end(7, 8, 9);
  } else if (squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != '') {
    end(1, 4, 7);
  } else if (squares[2] == squares[5] && squares[5] == squares[8] && squares[2] != '') {
    end(2, 5, 8);
  } else if (squares[3] == squares[6] && squares[6] == squares[9] && squares[3] != '') {
    end(3, 6, 9);
  } else if (squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != '') {
    end(1, 5, 9);
  } else if (squares[3] == squares[5] && squares[5] == squares[7] && squares[3] != '') {
    end(3, 5, 7);
  } else {
    checkDraw(); // التحقق من التعادل إذا لم يكن هناك فائز
  }
}

function game(id) {
  let element = document.getElementById(id);
  if (turn === "x" && element.innerHTML == "") {
    element.innerHTML = "X";
    turn = "o";
    game_o_x.innerHTML = "O";
  } else if (turn === "o" && element.innerHTML == "") {
    element.innerHTML = "O";
    turn = "x";
    game_o_x.innerHTML = "X";
  }
  localStorage.setItem("lastTurn", turn); // حفظ الدور الحالي لبدء اللعبة القادمة به
  winner();
}
