const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const BASE_URL = "https://v6.exchangerate-api.com/v6/7b2fb5f76f6be86284d540a9/latest/"
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


window.addEventListener("load", ()=>{
    updateExcRate();
})
for(let select of dropdowns){
    for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name==="from" && currCode === "USD"){
        newOption.selected = "selected"
    }else if(select.name==="to" && currCode === "INR"){
        newOption.selected = "selected"
    }
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target)
  })
}
const updateFlag =(element)=>{
let currCode = element.value;
let countryCode = countryList[currCode];
let img = element.parentElement.querySelector("img");
img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;;
};


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExcRate();
});

const updateExcRate = async() =>{
   let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    
    let convertedAmount = amtVal * rate;

    msg.innerText=`${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
    
}

