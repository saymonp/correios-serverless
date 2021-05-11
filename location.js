'use strict';
let Correios = require('node-correios');

module.exports.location = async event => {
  let correios = new Correios();


  const pp = event.pathParameters
  
  const locationPromise = correios.consultaCEP({ cep: pp.cepDestino })
  .then(result => {
    return result;
  })
  .catch(error => {
    console.log(error);
  });

  const location = await locationPromise

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Accept',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(
      {
        "location": location
      },
      null,
      2
    ),
  };
};
