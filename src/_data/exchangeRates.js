// _data/exchangeRates.js
import fetch from "node-fetch";

export default async function () {
  const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cad.json");
  const data = await response.json();

  // Return only the rates you care about
  return {
    CAD: 1,
    USD: data.cad.usd,
    EUR: data.cad.eur,
    GBP: data.cad.gbp,
    AUD: data.cad.aud,
    NZD: data.cad.nzd,
    JP: data.cad.jpy,
    CNY: data.cad.cny,
    HKD: data.cad.hkd,
    INR: data.cad.inr,
    MXN: data.cad.mxn,
    BRL: data.cad.brl,
    ZAR: data.cad.zar,
    CHF: data.cad.chf,
    SEK: data.cad.sek,
    NOK: data.cad.nok,
    DKK: data.cad.dkk,
    SGD: data.cad.sgd,
    KRW: data.cad.krw,
    AED: data.cad.aed,
    THB: data.cad.thb,
    PHP: data.cad.php
  };
};