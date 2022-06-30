var bars = document.querySelectorAll(".bar");
var tooltips = document.querySelectorAll(".tooltip");
var data;
var date = new Date();

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function handleData() {
    data = await getData("data.json");

    let amounts = [];
    for (let i = 0; i < data.length; i++) {
        amounts.push(data[i].amount);
    }

    console.log(amounts);
    var maxAmount = (Math.max(...amounts));

    for (let i = 0; i < bars.length; i++) {
        const percent = (data[i].amount / maxAmount) * 100;
        bars[i].style.height = `${percent}%`;
        tooltips[i].textContent = `$${data[i].amount}`;
        
        // if date equals today
        if (i + 1 == date.getDay()) {
            // set class to today
            bars[i].classList.add("today");
        }
    }
}

handleData();
