const formatPrice = dollars => dollars.toLocaleString(
  'en-US',
  {
    style: 'currency',
    currencty: 'USD',
  },
);

export default formatPrice;
