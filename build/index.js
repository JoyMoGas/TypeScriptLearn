"use strict";
const creditDebit = document.querySelector('#creditDebitSelect');
const toFrom = document.querySelector('#toFromInput');
const amount = document.querySelector('#amountInput');
const details = document.querySelector('#details');
const sendEmail = document.querySelector('#sendEmail');
const form = document.querySelector('#form');
const totalCell = document.querySelector('#total');
let totalAmount = 0;
// Inicializar el total sumando las transacciones predefinidas
const initializeTotal = () => {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        var _a, _b;
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            const type = ((_a = cells[0].textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            const amountText = ((_b = cells[2].textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
            const amount = parseFloat(amountText.replace(/[^\d.-]/g, ''));
            if (!isNaN(amount)) {
                if (type === 'Débito') {
                    totalAmount += amount;
                }
                else if (type === 'Crédito') {
                    totalAmount -= amount;
                }
            }
        }
    });
    totalCell.innerHTML = `Total: ${totalAmount}`;
};
form.addEventListener('submit', event => {
    event.preventDefault();
    const transaction = {
        creditDebit: creditDebit.value,
        toFrom: toFrom.value,
        amount: amount.valueAsNumber,
        details: details.value,
        sendEmail: sendEmail.checked,
    };
    renderTransaction(transaction);
    updateTotal(transaction);
    clearForm();
});
const renderTransaction = (t) => {
    const tableRow = document.createElement('tr');
    const creditDebitData = document.createElement('td');
    creditDebitData.innerHTML = t.creditDebit;
    const toFromData = document.createElement('td');
    toFromData.innerHTML = t.toFrom;
    const amountData = document.createElement('td');
    amountData.innerHTML = (t.creditDebit === 'Débito' ? '+' : '-') + t.amount.toString();
    const detailsData = document.createElement('td');
    detailsData.innerHTML = t.details;
    tableRow.append(creditDebitData);
    tableRow.append(toFromData);
    tableRow.append(amountData);
    tableRow.append(detailsData);
    const tBody = document.querySelector('tbody');
    tBody.append(tableRow);
};
const updateTotal = (t) => {
    if (t.creditDebit === 'Débito') {
        totalAmount += t.amount;
    }
    else if (t.creditDebit === 'Crédito') {
        totalAmount -= t.amount;
    }
    totalCell.innerHTML = `Total: ${totalAmount}`;
};
const clearForm = () => {
    creditDebit.value = 'Crédito';
    toFrom.value = '';
    amount.value = '';
    details.value = '';
    sendEmail.checked = false;
};
// Inicializar el total con las transacciones predefinidas
initializeTotal();
