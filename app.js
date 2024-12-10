const baseUrl = "https://api.currencylayer.com/convert?access_key=b714875b20272e9875c559fc83413eba";

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");

for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evnt) =>{
        updateFlag(evnt.target);
    });
};

const updateFlag = (element) =>{
    let currCode = element.value;
    let countCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evnt) =>{
    evnt.preventDefault();
    let amount = document.querySelector(".amount input");
    let ammountValue = amount.value;
    if(ammountValue === "" || ammountValue < 1 ){
        ammountValue = 1
        amount.value = "1"
    };
    console.log(fromCurr.value , toCurr.value);
    const URL = `${baseUrl}&from=${fromCurr.value}&to=${toCurr.value}&amount=${ammountValue}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data["result"];
    console.log(rate);

    let finalAmount = rate;
    msg.innerText = `${ammountValue} ${fromCurr.value} = ${rate} ${toCurr.value}`;
});