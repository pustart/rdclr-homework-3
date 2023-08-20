function delay(milliseconds) {
  const start = Date.now();
  while (Date.now() - start < milliseconds) { }
  return;
}

export default delay;
