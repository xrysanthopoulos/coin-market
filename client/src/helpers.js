const formatCurrency = (price, locale = 'en-US', currency = 'USD') => {
    return price.toLocaleString(locale, {
        style: 'currency',
        currency,
    });
};

const numberToPercentage = (num) => {
    return `${num.toFixed(1)}%`;
};

module.exports = {
    formatCurrency,
    numberToPercentage
};