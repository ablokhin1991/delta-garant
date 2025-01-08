function calculate() {
    var amount = document.getElementById("amount").value;
    var result = amount * 0.02; // Например, 2% от суммы
    document.getElementById("result").innerHTML = "Стоимость гарантии: " + result + " рублей";
}
