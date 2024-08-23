function timestampToDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const result = `${year}-${month + 1}-${day - 1} ${hour}:${min}:${sec}`;
  return result;
}

module.exports = { timestampToDate };
