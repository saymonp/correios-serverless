'use strict';
let Correios = require('node-correios');
let correios = new Correios();

module.exports.hello = async event => {
  const args = {
    nCdServico: "04510",
    sCepOrigem: '98801010',
    sCepDestino: '98700000',
    nVlPeso: 1,
    nCdFormato: 1,
    nVlComprimento: 27,
    nVlAltura: 8,
    nVlLargura: 10,
    nVlDiametro: 18
  }
  
  const deliverPricePromise = correios.calcPrecoPrazo(args)
  .then(result => {
    return result;
  })
  .catch(error => {
    console.log("Erro", error)
  });
  
  const locationPromise = correios.consultaCEP({ cep: '98801010' })
  .then(result => {
    return result;
  })
  .catch(error => {
    console.log(error);
  });
    
  const getData = async () => {
    const location = await locationPromise;
    const deliverPrice = await deliverPricePromise;
  
    const res = {location, deliverPrice}
    return res;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "data": getData()
      },
      null,
      2
    ),
  };
};
