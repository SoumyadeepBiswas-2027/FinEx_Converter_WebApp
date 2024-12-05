const BASE_URL = "https://v6.exchangerate-api.com/v6/48925c02f2ef6c8f31897523/latest";


  const dropdowns =document.querySelectorAll(".drop-down select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");
  


  for(let select of dropdowns){
    for(currCode in countryList){
      let newOption= document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name=== "from" && currCode==="USD"){
        newOption.selected= "selected";
      } else if(select.name=== "to" && currCode==="INR"){
        newOption.selected= "selected";
      } 
      select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
  }

  //now we want when we change the country-name then flag should also change so,
  //we do the following below:-


const updateFlag =(element) =>{
    let currCode=element.value;
    let countryCode= countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;
};

btn.addEventListener("click", (evt)=>{
 evt.preventDefault();     
 updateExchangeRate();    });

 
const updateExchangeRate =async()=>{
  let amount = document.querySelector(".amount input");
    let amtVal =amount.value;
   if(amtVal ==="" || amtVal <1){
      amtVal =1;
      amount.value="1";
    }


// // console.log(fromCurr.value,toCurr.value);
//  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
//  let response= await fetch(URL);
//  console.log(response);
//   });

//in above the code was done previously but due to changes made in the URL ,the approch is changed below as we took another valid "BASE_URL"

 //Changed the API request URL format (old format was /latest/{fromCurrency}/{toCurrency}.json)
 const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;  // New format

   try {
        // Fetch the exchange rates data
     let response = await fetch(URL);
     if (!response.ok) {
         throw new Error("Failed to fetch exchange rates");
       }
       let data = await response.json();
  
       // Get the rate for the target currency from the new response format
       const rate = data.conversion_rates[toCurr.value];  // New format
  
       // console.log("Rate:", rate);
       console.log(rate);
  
       // Calculate the converted amount
       let convertedAmount = amtVal * rate;
       msg.innerText=(`${amtVal} ${fromCurr.value} is equal to ${convertedAmount} ${toCurr.value}`);
      
     } catch (error) {
       console.error("Error fetching exchange rates:", error);
     }
}
window.addEventListener("click", (evt)=>{
  evt.preventDefault();     
  updateExchangeRate();    
});
 

window.addEventListener("load",()=>{
  updateExchangeRate();
  });

