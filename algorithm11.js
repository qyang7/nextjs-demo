function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

function parseQuery(url) {
  const params = {};
  const queryString = url.split('?')[1];
  if (!queryString) return params;
  queryString.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });
  return params;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function camelToSnake(str) {
  return str.replace(/[A-Z]/g, c => '_' + c.toLowerCase());
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { formatDate, parseQuery, capitalizeFirst, snakeToCamel, camelToSnake, sleep };