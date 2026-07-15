// مصفوفة الأسئلة
const questions = [
    {
        q: "كيف نقول 'ولد' بالإنجليزية؟",
        options: ["Girl", "Boy", "Apple", "Water"],
        answer: "Boy"
    },
    {
        q: "ما معنى كلمة 'Car'؟",
        options: ["منزل", "شجرة", "سيارة", "كتاب"],
        answer: "سيارة"
    }
];

let currentLevel = 0;
let selectedOption = null;

function loadQuestion() {
    const qData = questions[currentLevel];
    document.getElementById('question-text').innerText = qData.q;
    const container = document.getElementById('options-container');
    container.innerHTML = "";

    qData.options.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerText = opt;
        div.onclick = () => selectOption(div, opt);
        container.appendChild(div);
    });
}

function selectOption(element, val) {
    document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedOption = val;
}

function checkAnswer() {
    if (!selectedOption) return alert("اختر إجابة أولاً!");

    const footer = document.getElementById('footer-bar');
    const isCorrect = selectedOption === questions[currentLevel].answer;

    if (isCorrect) {
        footer.classList.add('correct');
        // زيادة شريط التقدم
        currentLevel++;
        let progress = (currentLevel / questions.length) * 100;
        document.getElementById('progress-fill').style.width = progress + "%";
        
        setTimeout(() => {
            footer.classList.remove('correct');
            if (currentLevel < questions.length) {
                loadQuestion();
            } else {
                alert("تهانينا! أنهيت المستوى.");
            }
        }, 1500);
    } else {
        footer.classList.add('wrong');
        alert("إجابة خاطئة، حاول مرة أخرى.");
        setTimeout(() => footer.classList.remove('wrong'), 1000);
    }
}

// تشغيل السؤال الأول عند الفتح
loadQuestion();