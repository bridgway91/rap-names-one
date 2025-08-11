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

  // 1) Query string, if provided: ?name=...
  let name = event.queryStringParameters?.name || '';

  // 2) Original path from the rewrite: /api/<name>
  if (!name) {
    const orig = event.headers?.['x-nf-original-pathname'] || '';
    if (orig.startsWith('/api/')) {
      name = orig.slice('/api/'.length); // keep raw (may have %20)
    }
  }

  // 3) Fallback: trailing path after function name (rare, but harmless)
  if (!name && event.path?.startsWith('/.netlify/functions/rap/')) {
    name = event.path.slice('/.netlify/functions/rap/'.length);
  }

  // If still no name, return the whole object
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
