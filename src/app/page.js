"use client"; // Next.js 13+ için Client Component olarak işaretleyin

import { useEffect } from "react";

export default function Home() {
  
  useEffect(() => {
    function allowOnlyNumbers(event) {
      event.target.value = event.target.value.replace(/\D/g, "");
    }

    function clearInputs() {
      document.getElementById("amount").value = "";
      document.getElementById("year").value = "";
      document.getElementById("rate").value = "";

      
      
      document.querySelectorAll(".error-message").forEach((el) => el.remove());
      document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("border-red-500");
        
      });
      document.getElementById("money").style.backgroundColor = "rgb(219, 234, 254)"; 
      document.getElementById("money2").style.backgroundColor = "rgb(219, 234, 254)";
      document.getElementById("money3").style.backgroundColor = "rgb(219, 234, 254)";
      document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.checked = false;
    });
      
    }

    function toggleRadio(event) {
      if (event.target.checked) {
        event.target.dataset.clicked = event.target.dataset.clicked === "true" ? "false" : "true";

        if (event.target.dataset.clicked === "true") {
          event.target.checked = true;
        } else {
          event.target.checked = false;
        }
      }
    }
    

    const radios = document.querySelectorAll("input[type='radio']");
    radios.forEach((radio) => {
      radio.addEventListener("click", toggleRadio);
    });
    

    function calculateRepayments() {
      const amountInput = document.getElementById("amount");
      const yearInput = document.getElementById("year");
      const rateInput = document.getElementById("rate");
      const paybackRadio = document.getElementById("payback");
      const interestRadio = document.getElementById("interest");
      const radioDiv =document.getElementById("radiodiv");
      const radioDiv2 =document.getElementById("radiodiv2");

      const amount = parseFloat(amountInput.value);
      const year = parseInt(yearInput.value);
      const rate = parseFloat(rateInput.value);
      const isPaybackChecked = paybackRadio.checked;
      const isInterestChecked = interestRadio.checked;

      let isValid = true;

      document.querySelectorAll(".error-message").forEach((el) => el.remove());

      function showError(input, message) {
        input.classList.add("border-red-500","border-2");
        const errorMessage = document.createElement("p");
        errorMessage.textContent = message;
        errorMessage.className = "text-red-500 text-sm mt-1 error-message";
        input.parentNode.appendChild(errorMessage);
      }
      function showError2(input, message) {
        const errorMessage2 = document.createElement("p");
        errorMessage2.textContent = message;
        errorMessage2.className = "text-red-500 text-sm mt-1 error-message";
        input.parentNode.appendChild(errorMessage2);
      }
      

      function removeError(input) {
        input.classList.remove("border-red-500");
      }

      if (!amount || amount <= 0) {
        showError(amountInput, "This field is required");
        isValid = false;
        document.getElementById("money").style.backgroundColor="red";
        document.getElementById("money").style.color="white";//bu kod çalışmıyor text rengini değiştirmiyor
        
      } else {
        removeError(amountInput);
      }

      if (!year || year <= 0) {
        showError(yearInput, "This field is required");
        isValid = false;
        document.getElementById("money2").style.backgroundColor="red";
        document.getElementById("money2").style.color="white";
      } else {
        removeError(yearInput);
      }

      if (!rate || rate <= 0) {
        showError(rateInput, "This field is required");
        isValid = false;
        document.getElementById("money3").style.backgroundColor="red";
        document.getElementById("money3").style.color="white";
      } else {
        removeError(rateInput);
      }
      if (!isPaybackChecked && !isInterestChecked) {
        showError2(radioDiv, "This field is required");
        isValid = false;
      } else {
        removeError(paybackRadio);
        removeError(interestRadio);
      }

      if (!isValid) return;

      const monthlyRate = rate / 100 / 12;
      const months = year * 12;
      const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

      const totalrepayment=monthlyPayment * months;

      
      document.getElementById("illustration").style.display = "none";
      document.getElementById("p1").style.display="none";
      document.getElementById("p2").style.display="none";
      document.getElementById("sakla").style.display="block";
      document.getElementById("phide1").style.display="block";
      document.getElementById("phide2").style.display="block";
      document.getElementById("result").innerHTML =`£${monthlyPayment.toFixed(2)}`;
      document.getElementById("totalRepayment").innerHTML=`£${totalrepayment.toFixed(2)}`

      if (isPaybackChecked) {
        const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalRepayment = monthlyPayment * months;

        document.getElementById("sakla").style.display = "block";
        document.getElementById("phide1").style.display = "block";
        document.getElementById("phide2").style.display = "block";
        document.getElementById("result").innerHTML = `£${monthlyPayment.toFixed(2)}`;
        document.getElementById("totalRepayment").innerHTML = `£${totalRepayment.toFixed(2)}`;

        // Interest only divini gizle
        document.getElementById("sakla2").style.display = "none";
        document.getElementById("phide4").style.display = "none";
        document.getElementById("phide5").style.display = "none";
    }

    if (isInterestChecked) {
        const totalInterest = totalrepayment - amount; // Yıllık faiz hesaplaması

        document.getElementById("sakla2").style.display = "block";
        document.getElementById("phide4").style.display = "block";
        document.getElementById("phide5").style.display = "block";

        document.getElementById("TotalInt").innerHTML = `£${totalInterest.toFixed(2)}`;

        // Repayment divini gizle
        document.getElementById("sakla").style.display = "none";
        document.getElementById("phide1").style.display = "none";
        document.getElementById("phide2").style.display = "none";
    }
    }
    
    document.getElementById("sakla").style.display = "none";
    document.getElementById("sakla2").style.display = "none";
    document.getElementById("phide1").style.display="none";
    document.getElementById("phide2").style.display="none";
    document.getElementById("phide4").style.display="none";
    document.getElementById("phide5").style.display="none";
    document.getElementById("amount")?.addEventListener("input", allowOnlyNumbers);
    document.getElementById("year")?.addEventListener("input", allowOnlyNumbers);
    //document.getElementById("rate")?.addEventListener("input", allowOnlyNumbers);
    document.getElementById("clear")?.addEventListener("click", clearInputs);
    document.getElementById("calculate")?.addEventListener("click", calculateRepayments);

    return () => {
      document.getElementById("amount")?.removeEventListener("input", allowOnlyNumbers);
      document.getElementById("year")?.removeEventListener("input", allowOnlyNumbers);
      //document.getElementById("rate")?.removeEventListener("input", allowOnlyNumbers);
      document.getElementById("clear")?.removeEventListener("click", clearInputs);
      document.getElementById("calculate")?.removeEventListener("click", calculateRepayments);
      radios.forEach((radio) => {
        radio.removeEventListener("click", toggleRadio);
      });
      
      
    };
  }, []);

  return (
    <div className="bg-blue-100 h-screen flex justify-center items-center p-8">
      <div className="bg-white flex w-[50rem] h-9/12 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-white w-1/2 p-6 flex flex-col items-center space-y-4">
          <div className="flex justify-between w-full items-start">
            <h2 className="text-xl font-bold text-gray-500 flex">Mortgage Calculator</h2>
            <a id="clear" className="text-l font-semibold text-gray-400 flex underline cursor-pointer">Clear All</a>
          </div>

          <div className="relative w-full">
            <span className="text-gray-400 font-bold px-1 ">Mortgage Amount</span>
            <input
              type="text"
              className="bg-gray-100 cursor-pointer w-full h-10 pl-3 pr-10 rounded-md border-2 border-blue-100 focus:ring-2 focus:ring-[#e3e92b] focus:outline-none"
              id="amount"
            />
            <div id="money" className="bg-blue-100 absolute right-0 top-6 w-10 h-10 rounded-md focus-within:bg-[#e3e92b]">
            <span  className=" pl-1 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-bold">£</span>
            </div>
          </div>
          <div className="relative w-full flex space-x-10 items-start ">
          <div className="relative ">
           <span className="text-gray-400 font-bold text-sm absolute top-0 bg-white px-1">Mortgage Term</span>
           <input
            type="text"
            className="bg-gray-100 cursor-pointer w-36 h-10 pl-3 pr-10 rounded-md border-2 border-blue-100 focus:ring-2 focus:ring-[#e3e92b] focus:outline-none mt-7"
            id="year"
           />
          <div id="money2" className="absolute left-26 top-12 transform -translate-y-1/2 bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md focus-within:bg-[#e3e92b]">
           <span className="text-gray-700 font-bold">Year</span>
          </div>
          </div>
          <div className="relative pl-6 ">
           <span className="text-gray-400 font-bold text-sm absolute left-6 top-0 bg-white px-1">Interest Rate</span>
           <input
            type="text"
            className="bg-gray-100 cursor-pointer w-36 h-10 pl-3 pr-10 rounded-md border-2 border-blue-100 focus:ring-2 focus:ring-[#e3e92b] focus:outline-none mt-7"
            id="rate"
           />
           <div id="money3" className="absolute right-0 top-12 transform -translate-y-1/2 bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md focus-within:bg-[#e3e92b]">
           <span className="text-gray-700 font-bold">%</span>
           </div>
          </div>
          </div>
          
          <div className="w-full pb-5 mt-3">
             <span  className="text-gray-400 font-bold px-1 ">Mortgage Type</span>
            <div id="radiodiv2" className="flex items-center relative w-full mb-3.5 bg-gray-100 h-10 pl-3 pr-10 rounded-md border border-gray-300">
              <input type="radio" className="w-5 h-5 cursor-pointer  " id="payback" name="mortgageType"  />
              <label className="text-black ml-2">Repayment</label>
            </div>
            <div id="radiodiv" className="flex items-center relative w-full bg-gray-100 h-10 pl-3 pr-10 rounded-md border border-gray-300">
              <input type="radio" className="w-5 h-5 cursor-pointer " id="interest" name="mortgageType" />
              <label className="text-black ml-2">Interest only</label>
            </div>
          </div>
          <button id="calculate" className="bg-[#e3e92b] cursor-pointer text-black px-6 py-2 rounded-md text-lg font-semibold flex items-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105">
           <img src="/icon-calculator.svg" alt="Arrow" width={24} height={24} /> 
           <span>Calculate Repayments</span>
          </button>
          
        </div>
        <div className="bg-blue-950  w-1/2 flex items-center flex-col justify-start p-4 rounded-bl-[100]">
          <p id="phide1" className="text-white font-bold text-2xl ">Your results</p>
          <p id="phide2" className="text-gray-400 text-center">Your results are shown below based on the information you provided. to adjust the results, edit the form and click "calculate repayments" again</p>
          <img id="illustration" src="/illustration-empty.svg" alt="Arrow" className="self-center mt-4"  width={300}></img>
          <p id="p1" className="text-white text-center font-bold text-2xl mt-4" >Results Shown Here</p>
          <p id="p2" className="text-gray-400 mt-4 text-center">Complete the form and click "calculate repayments" to see what your monthly repayments would be</p>
          <div id="sakla" className="w-5/6 h-52 bg-[#013c73] border-t-4 border-t-[#e3e92b] top-2 rounded-xl mt-7">
            <p className="text-gray-400 pt-3 pl-6">Your monthly repayments</p>
          <span id="result" className=" text-[#e3e92b] text-5xl pt-3 pl-6"></span>
          <hr className="text-blue-950 mt-3 ml-6 w-64 border-t-4 items-center"></hr>
          <p id="phide3" className="pl-6 pt-3 text-gray-400">Total you will repay over the term</p>
          <span id="totalRepayment" className="text-white pl-6 text-xl font-bold pt-3"></span>
          </div>
          <p id="phide4" className="text-white font-bold text-2xl ">Interest Only</p>
          <p id="phide5" className="text-gray-400 text-center">This section only shows the amount of interest to be paid.</p>
          <div id="sakla2" className="w-5/6 h-52 bg-[#013c73] border-t-4 border-t-[#e3e92b] top-2 rounded-xl mt-7">
          <p className="text-gray-400 pt-3 pl-6">Total Interest Payable</p>
          <span id="TotalInt" className=" text-[#e3e92b] text-5xl pt-3 pl-6"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

