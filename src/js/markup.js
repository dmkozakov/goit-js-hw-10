import { refs } from "./refs";

function resetMarkup() {
  refs.countryList.innerHTML = "";
  refs.countryInfo.innerHTML = "";
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
  <p><b>Languages:</b> ${Object.values(country[0].languages).join(", ")}</p>
`;
}

export { makeCountryListItem, makeCountryInfoItem, resetMarkup };
