import expect from 'bordering-countries-with-greatest-ratio-in-gdp-per-capita/tests/expect';
import index from 'bordering-countries-with-greatest-ratio-in-gdp-per-capita';

describe('index', () => {
  it('returns an array', () => {
    expect(index).to.be.an('array');
    expect(index).to.have.length.at.least(1);
    index.forEach((info) => {
      expect(info.richer.cca2).to.be.a('string').with.length(2);
      expect(info.richer.cca3).to.be.a('string').with.length(3);
      expect(info.richer.name).to.be.a('string');
      expect(info.richer.gdp).to.be.a('number');
      expect(info.richer.date).to.be.an.instanceOf(Date);
      expect(info.poorer.cca2).to.be.a('string').with.length(2);
      expect(info.poorer.cca3).to.be.a('string').with.length(3);
      expect(info.poorer.name).to.be.a('string');
      expect(info.poorer.gdp).to.be.a('number');
      expect(info.poorer.date).to.be.an.instanceOf(Date);
      expect(info.region).to.be.an('array').with.length.at.least(1).and.at.most(2);
    });
  });
});
