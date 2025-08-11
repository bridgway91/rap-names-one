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

// Simple CORS so other projects can call it, too
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors };
  }

  // Two ways name can arrive:
  // 1) /api/:name -> via redirect we’ll add, becomes a query string ?name=...
  // 2) direct call /.netlify/functions/rap?name=...
  const name =
    (event.queryStringParameters && event.queryStringParameters.name) || '';

  if (!name) {
    // No name: return the whole collection (nice for debugging)
    return {
      statusCode: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify(rappers),
    };
  }

  const key = name.toLowerCase();
  const result = rappers[key] || rappers['dylan'];

  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  };
};
