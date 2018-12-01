'use strict'

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

export function formatPrice(num) {
    return formatter.format(num)
}