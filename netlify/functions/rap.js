// netlify/functions/rap.js
const rappers = {
  '21 savage': {
    age: 29,
    birthName: 'Sheyaa Bin Abraham-Joseph',
    birthLocation: 'London, England',
  },
  'chance the rapper': {
    age: 29,
    birthName: 'Chancelor Bennett',
    birthLocation: 'Chicago, Illinois',
  },
  'dylan': {
    age: 29,
    birthName: 'Dylan',
    birthLocation: 'Dylan',
  },
};

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors };
  }

  // ?name=... still supported
  let name = event.queryStringParameters?.name || '';

  // If not provided, parse trailing segment after the function path
  if (!name && event.path?.startsWith('/.netlify/functions/rap/')) {
    name = event.path.slice('/.netlify/functions/rap/'.length);
  }

  if (!name) {
    return {
      statusCode: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify(rappers),
    };
  }

  const key = decodeURIComponent(name).toLowerCase();
  const result = rappers[key] || rappers['dylan'];

  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  };
};
