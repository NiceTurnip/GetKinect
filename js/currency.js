async function displayPrices() {
  const setCurrencyUI = (currency) => {
    const labelEl = document.querySelector(".currencyLabel");
    if (labelEl) labelEl.textContent = currency;

    document.querySelectorAll(".symbol").forEach((el) => {
      el.textContent = "$";
    });
  };

  const renderPrices = (currency) => {
    const isCanada = currency === "CAD";

    document.querySelectorAll(".price").forEach((el) => {
      const value = isCanada ? el.dataset.cad : el.dataset.usd;

      if (value) {
        el.textContent = value;
      }
    });

    setCurrencyUI(currency);
  };

  try {
    const res = await fetch("https://ipinfo.io/json?token=d6c6eb125c7603");
    const data = await res.json();

    const isCanada = data.country?.toUpperCase() === "CA";
    renderPrices(isCanada ? "CAD" : "USD");
  } catch (err) {
    console.error("IP location error:", err);

    // Default to USD if lookup fails
    //renderPrices("USD");
  }
}

displayPrices();