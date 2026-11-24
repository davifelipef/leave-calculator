const translations = {
    "pt-BR": {
        title: "Calculadora de Afastamentos",
        startDate: "Selecione a data de início do afastamento:",
        duration: "Digite o número de dias de afastamento:",
        instruction: "Clique no botão abaixo para fazer o cálculo:",
        calculate: "Calcular data",

        result: (days, startDate, startDay, endDate, endDay,
                 returnDate, returnDay) =>
            `O afastamento de ${days} dia(s) a partir de
            ${startDay}, ${startDate},<br>
            terminará no dia ${endDate} (${endDay}).<br>
            Retorno ao trabalho: ${returnDate} (${returnDay}).`
    },

    "en-US": {
        title: "Leave Calculator",
        startDate: "Select the leave start date:",
        duration: "Enter the number of days of leave:",
        instruction: "Click the button below to calculate:",
        calculate: "Calculate date",

        result: (days, startDate, startDay, endDate, endDay,
                 returnDate, returnDay) =>
            `The ${days}-day leave starting on
            ${startDay}, ${startDate},<br>
            will end on ${endDate} (${endDay}).<br>
            Return to work: ${returnDate} (${returnDay}).`
    }
};

let currentLanguage = "pt-BR";

function setLanguage(language) {
    if (!translations[language]) {
        language = "pt-BR";
    }

    currentLanguage = language;

    document.documentElement.lang = language;
    document.title = translations[language].title;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        const translation = translations[language][key];

        if (element.tagName === "INPUT") {
            element.value = translation;
        } else {
            element.textContent = translation;
        }
    });

    localStorage.setItem("language", language);

    // Update previously calculated results
    if (document.getElementById("result").textContent.trim()) {
        calcDate();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("language");

    const browserLanguage = navigator.language.startsWith("en")
        ? "en-US"
        : "pt-BR";

    setLanguage(savedLanguage || browserLanguage);
});