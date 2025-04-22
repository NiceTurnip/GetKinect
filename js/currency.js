async function convertPrice(exchangeRates) {
  const currencySymbols = {
    USD: "$", CAD: "$", EUR: "€", GBP: "£", AUD: "$", JPY: "¥", 
    NZD: "$", CNY: "¥", HKD: "$", INR: "₹", MXN: "$", BRL: "R$", 
    ZAR: "R", CHF: "CHF", SEK: "kr", NOK: "kr", DKK: "kr", 
    SGD: "$", KRW: "₩", AED: "د.إ", THB: "฿", PHP: "₱"
  };

  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const currency = data.currency || "CAD";

    const rate = exchangeRates[currency] || 1;
    const symbol = currencySymbols[currency] || currency + " ";

    document.querySelectorAll(".price").forEach(el => {
      const base = parseFloat(el.dataset.cad); // <-- CAD is now base
      if (!isNaN(base)) {
        const converted = (base * rate).toFixed(0);
        el.textContent = `${converted}`;

        const labelEl = document.querySelector(".currencyLabel");
        if (labelEl) labelEl.textContent = `${currency}`;

        document.querySelectorAll(".symbol").forEach(el => {
          el.textContent = `${symbol}`;
        });
      }
    });

  } catch (err) {
    console.error("IP/Currency error:", err);
  }
}

// Kick off after data is defined
if (window.exchangeRates) {
  convertPrice(window.exchangeRates);
}
