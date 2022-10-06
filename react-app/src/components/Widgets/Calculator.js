import React, { useState } from "react";

import "./Calculator.css"


const Calculator = ({ car }) => {

  let { price } = car;

  const [payPrice, setPayPrice] = useState(price);
  const [downPayment, setDownPayment] = useState((price/5).toFixed(0));
  const [terms, setTerms] = useState(72);
  const [apr, setApr] = useState(5.99);
  const [tax, setTax] = useState(7.25.toFixed(2));

  let loanTermsArray = [12, 24, 36, 48, 60, 72, 84];

  let principle = payPrice*(1+(tax/100)) - (downPayment);
  let rate = ((apr/1200)*((1+(apr/1200))**terms))/(((1+(apr/1200))**terms)-1)
  let monthlyPayment = (principle * rate).toFixed(0);


  return (
    <div id="calculator-overall-container">
      <div id="calculator-title">Payment calculator</div>
      <div id="calculator-payment-container">
        <div id="calculator-payment-row"><span id='calculator-payment-span'>${monthlyPayment}/mo.</span></div>
      </div>
      <div id="calculator-form-wrapper">
        <form>
          <div id="calculator-payPrice-wrapper">
            <div>
              <input
                id='calculator-payPrice-textfield'
                className='calculator-fields-class'
                name='payPrice'
                type='number'
                value={payPrice}
                required
                onChange={(e) => setPayPrice(e.target.value)}
              />
              <span className="floating-label-calculator">Car price ($USD)</span>
            </div>
            <div>
              <input
                id='calculator-downPayment-textfield'
                className='calculator-fields-class'
                name='downPayment'
                type='number'
                value={downPayment}
                required
                onChange={(e) => setDownPayment(e.target.value)}
              />
              <span className="floating-label-calculator">Down payment ($USD) (optional)</span>
            </div>
            <div id="calculator-length-of-loan-text">Length of loan (in months)</div>
            <div id="calculator-terms-grid">
              {loanTermsArray.map((term) => {
                return (
                  <>
                    {term === terms && <div id="calculator-terms-single" className='calculator-active-term' key={term}>{term}</div>}
                    {term !== terms && <div id="calculator-terms-single" key={term} onClick={() => setTerms(term)}>{term}</div>}
                  </>
                )
              })}
            </div>
            <div>
              <input
                id='calculator-apr-textfield'
                className='calculator-fields-class'
                name='apr'
                type='number'
                value={apr}
                required
                onChange={(e) => setApr(e.target.value)}
              />
              <span className="floating-label-calculator">Annual percentage rate (%)</span>
            </div>
            <div>
              <input
                id='calculator-tax-textfield'
                className='calculator-fields-class'
                name='tax'
                type='number'
                value={tax}
                required
                onChange={(e) => setTax(e.target.value)}
              />
              <span className="floating-label-calculator">Sales tax (%)</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
