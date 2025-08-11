// netlify/functions/rap.js
const rappers = {
  '21 savage': { age: 29, birthName: 'Sheyaa Bin Abraham-Joseph', birthLocation: 'London, England' },
  'chance the rapper': { age: 29, birthName: 'Chancelor Bennett', birthLocation: 'Chicago, Illinois' },
  'dylan': { age: 29, birthName: 'Dylan', birthLocation: 'Dylan' },
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

  // 1) try query string: ?name=...
  let name = (event.queryStringParameters && event.queryStringParameters.name) || '';

  // 2) if not provided, try trailing path: /.netlify/functions/rap/<name>
  if (!name && event.path) {
    const m = event.path.match(/\/\.netlify\/functions\/rap\/(.+)$/);
    if (m) name = decodeURIComponent(m[1]);
  }

  // If no name at all, return full object
  if (!name) {
    return {
      statusCode: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify(rappers),
    };
  }

  const result = rappers[name.toLowerCase()] || rappers['dylan'];

  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  };
};
