document.addEventListener("DOMContentLoaded", () => {

    // Інформація про систему
    let osInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        time: new Date().toLocaleString()
    };

    // Зберігаємо в LocalStorage
    localStorage.setItem("myInfo", JSON.stringify(osInfo));

    // Виводимо в футері
    let footerInfo = document.getElementById("os-info");
    let savedData = localStorage.getItem("myInfo");

    if (savedData) {
        let info = JSON.parse(savedData);
        footerInfo.innerHTML = `
            <p><strong>Браузер:</strong> ${info.userAgent}</p>
            <p><strong>Платформа:</strong> ${info.platform || 'Невідомо'}</p>
            <p><strong>Мова:</strong> ${info.language}</p>
            <p><strong>Екран:</strong> ${info.screenWidth}x${info.screenHeight}</p>
        `;
    }

    // Завантаження коментарів
    let commentsContainer = document.getElementById("comments-container");
    let variant = 23;

    fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`)
        .then(res => res.json())
        .then(data => {
            commentsContainer.innerHTML = "";
            data.forEach(item => {
                let div = document.createElement("div");
                div.className = "comment";
                div.innerHTML = `
                    <p><b>${item.name}</b> (${item.email})</p>
                    <p>${item.body}</p>
                `;
                commentsContainer.appendChild(div);
            });
        })
        .catch(err => {
            console.log(err);
            commentsContainer.innerHTML = "<p>Помилка завантаження.</p>";
        });


    // Модальне вікно
    let modal = document.getElementById("feedback-modal");
    let closeBtn = document.getElementById("close-modal");

    // Показуємо форму через хвилину
    setTimeout(() => {
        modal.style.display = "block";
    }, 60000);

    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    };


    // Перемикач теми
    let themeToggle = document.getElementById("theme-toggle");

    function checkTimeForTheme() {
        let hour = new Date().getHours();
        // Вдень світла, вночі темна (з 07:00 до 21:00)
        if (hour >= 7 && hour < 21) {
            document.body.classList.remove("dark-mode");
            themeToggle.checked = false;
        } else {
            document.body.classList.add("dark-mode");
            themeToggle.checked = true;
        }
    }

    checkTimeForTheme();

    // Зміна теми вручну
    themeToggle.addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    });

});
