    // Функция для получения параметров из URL
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let match;
        while (match = regex.exec(queryString)) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return params;
    }

    // Заполнение полей формы
    window.onload = function() {
        const params = getQueryParams();
        document.querySelector('input[readonly][value="1,000,000"]').value = params.guarantee-sum || "1,000,000";
        document.querySelector('input[readonly][value="365"]').value = params.guarantee-days || "365";
        document.querySelector('input[readonly][value="44-FZ"]').value = params.procedure-type || "44-FZ";
        document.querySelector('input[readonly][value="Contract Performance"]').value = params.guarantee-type || "Contract Performance";
    };