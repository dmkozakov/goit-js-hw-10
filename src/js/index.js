import { fetchCountries } from "./fetchCountries.js";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import "../css/styles.css";

const DEBOUNCE_DELAY = 300;
const debounce = require("lodash.debounce");

const refs = {
  searchInput: document.querySelector("#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info"),
};

refs.searchInput.addEventListener(
  "input",
  debounce(onSearch, DEBOUNCE_DELAY, {
    leading: false,
    trailing: true,
  })
);

function onSearch(e) {
  const searchQuery = e.target.value.toLowerCase().trim();

  refs.countryList.innerHTML = "";
  refs.countryInfo.innerHTML = "";

  if (!searchQuery) {
    return;
  }

  fetchCountries(searchQuery).then(renderCountryInfo).catch(console.log);
}

function renderCountryInfo(data) {
  if (data.length > 10) {
    return Notify.info(
      "Too many matches found. Please enter a more specific name."
    );
  }
  if (data.length >= 2) {
    const countryListMarkup = data.map(makeCountryListItem).join("");
    return refs.countryList.insertAdjacentHTML("beforeend", countryListMarkup);
  }

  const countryInfoMarkup = makeCountryInfoItem(data);
  refs.countryInfo.insertAdjacentHTML("beforeend", countryInfoMarkup);
}

function makeCountryListItem(country) {
  return `
  <li class="country-list__item">
    <img  src="${country.flags.svg}" alt="${country.name.common} flag" width="50">
    <p>${country.name.common}</p>
  </li>`;
}

function makeCountryInfoItem(country) {
  return `
  <div class="country-name">
    <img src="${country[0].flags.svg}" 
    alt="${country[0].name.common} flag" width="50" />
    <h1>${country[0].name.common}</h1>
  </div>
  <p><b>Capital:</b> ${country[0].capital}</p>
  <p><b>Population:</b> ${country[0].population}</p>
  <p><b>Languages:</b> ${Object.values(country[0].languages)}</p>
`;
}
