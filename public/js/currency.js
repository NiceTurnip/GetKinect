async function convertPrice(exchangeRates) {
  const currencySymbols = {
    USD: "$", CAD: "$", EUR: "€", GBP: "£", AUD: "$", NZD: "$",
    JPY: "¥", CNY: "¥", INR: "₹", MXN: "$", BRL: "R$",
    ZAR: "R", CHF: "CHF", SEK: "kr", NOK: "kr", DKK: "kr",
    SGD: "$", KRW: "₩", AED: "د.إ", THB: "฿", PHP: "₱"
  };

  const countryCurrencyMap = {
    US: "USD", CA: "CAD", GB: "GBP", AU: "AUD", NZ: "NZD",
    JP: "JPY", CN: "CNY", IN: "INR", MX: "MXN", BR: "BRL",
    ZA: "ZAR", CH: "CHF", SE: "SEK", NO: "NOK", DK: "DKK",
    SG: "SGD", KR: "KRW", AE: "AED", TH: "THB", PH: "PHP"
  };

  try {
    const res = await fetch("https://ipinfo.io/json?token=d6c6eb125c7603");
    const data = await res.json();

    let currency = data.currency;

    if (!currency && data.country) {
      currency = countryCurrencyMap[data.country.toUpperCase()] || "CAD";
    }

    const rate = exchangeRates[currency] || 1;
    const symbol = currencySymbols[currency] || currency + " ";

    // console.log("Detected currency:", currency);
    // console.log("Exchange rate:", rate);
    // console.log("Currency symbol:", symbol);

    document.querySelectorAll(".price").forEach(el => {
      const base = parseFloat(el.dataset.cad);
      if (!isNaN(base)) {
        const converted = (base * rate).toFixed(0);
        el.textContent = `${converted}`;

        const labelEl = document.querySelector(".currencyLabel");
        if (labelEl) labelEl.textContent = currency;

        document.querySelectorAll(".symbol").forEach(s => {
          s.textContent = symbol;
        });
      }
    });
  } catch (err) {
    console.error("IP/Currency error:", err);
  }
}

// Only run if data is injected in layout
if (window.exchangeRates) {
  convertPrice(window.exchangeRates);
}
