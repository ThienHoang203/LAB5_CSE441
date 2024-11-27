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

export const calculateElapsedTime = startDate => {
  const start = new Date(startDate);
  const now = new Date();

  const differenceInMs = now - start;
  const seconds = Math.floor(differenceInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);
  let result = '';
  if (years == 1) {
    result += `${years} year `;
  } else if (years > 1) {
    result += `${years} years `;
  }
  if (days == 1) {
    result += `${days} day `;
  } else if (days > 1 && days <= 365) {
    result += `${days} days `;
  } else if (days > 365) {
    result += `${Math.floor(days % 365)} days `;
  }
  return result;
};

export const formatDateShort = stringDate => {
  const date = new Date(stringDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
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

export const mapCustomers = item => {
  const {name, _id, phone, loyalty, totalSpent, updatedBy, updatedAt} = item;

  return {
    name: name,
    id: _id,
    phone: phone,
    loyalty: loyalty,
    totalSpent: totalSpent,
    updatedBy: updatedBy,
    updatedAt: formatDate(updatedAt),
  };
};
