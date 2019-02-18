import _ from 'lodash';
import countries from 'world-countries';
import countriesByGDPPerCapita from 'countries-by-gdp-per-capita-cia';

const countriesBy2Code = _.zipObject(countries.map(country => country.cca2), countries);
const countriesBy3Code = _.zipObject(countries.map(country => country.cca3), countries);
const gdpBy3Code = _.mapKeys(countriesByGDPPerCapita, (value, key) => countriesBy2Code[key].cca3);

const ratios = _.flatten(countries.map(country => country.borders.map((secondCountryCode) => {
  const countryGDP = gdpBy3Code[country.cca3];
  const secondCountryGDP = gdpBy3Code[secondCountryCode];

  return {
    country,
    countryGDP,
    ratio: countryGDP && secondCountryGDP ? countryGDP.valueInUSD / secondCountryGDP.valueInUSD : 0,
    secondCountry: countriesBy3Code[secondCountryCode],
    secondCountryGDP,
  };
})))
  .filter(({ ratio }) => ratio >= 2);

const sortedRatios = _.sortBy(ratios, info => -info.ratio);
const withSelectedProperties = sortedRatios.map(info => ({
  poorer: {
    cca2: info.secondCountry.cca2,
    cca3: info.secondCountry.cca3,
    date: info.secondCountryGDP.date,
    gdp: info.secondCountryGDP.valueInUSD,
    name: info.secondCountry.name.common,
  },
  ratio: info.ratio,
  region: _.uniq([info.country.region, info.secondCountry.region]),
  richer: {
    cca2: info.country.cca2,
    cca3: info.country.cca3,
    date: info.countryGDP.date,
    gdp: info.countryGDP.valueInUSD,
    name: info.country.name.common,
  },
}));

withSelectedProperties.forEach(({
  poorer, ratio, region, richer,
}, i) => {
  console.log('|-');
  // eslint-disable-next-line max-len
  console.log(`| ${i + 1} || style="text-align:left;" | {{flag|${richer.name}}} || ${richer.gdp.toLocaleString()} || ${richer.date.getFullYear()}&nbsp;<small>est.</small> || style="text-align:left;" | {{flag|${poorer.name}}} || ${poorer.gdp.toLocaleString()} || ${poorer.date.getFullYear()}&nbsp;<small>est.</small> || ${ratio.toFixed(3)} || style="text-align:left;" | ${region[0]}${region[1] ? ` / ${region[1]}` : ''}`);
});

export default withSelectedProperties;
