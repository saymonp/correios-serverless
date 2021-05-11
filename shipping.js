'use strict';
let Correios = require('node-correios');

module.exports.shipping = async event => {
  let correios = new Correios();

  const body = JSON.parse(event.body);

  const args = {
    nCdServico: body.nCdServico,
    sCepOrigem: body.sCepOrigem,
    sCepDestino: body.sCepDestino,
    nVlPeso: body.nVlPeso,
    nCdFormato: body.nCdFormato,
    nVlComprimento: body.nVlComprimento,
    nVlAltura: body.nVlAltura,
    nVlLargura: body.nVlLargura,
    nVlDiametro: body.nVlDiametro,
  }

  const deliverPricePromise = correios.calcPrecoPrazo(args)
  .then(result => {
    return result;
  })
  .catch(error => {
    console.log("Erro", error)
  });
  
  const deliverPrice = await deliverPricePromise


  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Accept',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(
      {
        "shipping": deliverPrice
      },
      null,
      2
    ),
  };
};
