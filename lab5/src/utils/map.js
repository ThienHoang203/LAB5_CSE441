export const formatDate = stringDate => {
  const date = new Date(stringDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const formattedCurrency = price => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

export const mapServices = item => {
  const {name, _id, price, createdBy, createdAt, updatedAt} = item;

  return {
    name: name,
    id: _id,
    price: price,
    createdBy: createdBy,
    createdAt: formatDate(createdAt),
    updatedAt: formatDate(updatedAt),
  };
};
