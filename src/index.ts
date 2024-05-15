const creditDebit = document.querySelector('#creditDebitSelect') as HTMLSelectElement;
const toFrom = document.querySelector('#toFromInput') as HTMLInputElement;
const amount = document.querySelector('#amountInput') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLTextAreaElement;
const sendEmail = document.querySelector('#sendEmail') as HTMLInputElement;

const form = document.querySelector('#form') as HTMLFormElement;
const totalCell = document.querySelector('#total') as HTMLTableCellElement;

interface TransactionInterface {
    creditDebit: string,
    toFrom: string,
    amount: number,
    details: string,
    sendEmail: boolean,
}

let totalAmount = 0;

// Inicializar el total sumando las transacciones predefinidas
const initializeTotal = () => {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            const type = cells[0].textContent?.trim() || '';
            const amountText = cells[2].textContent?.trim() || '';
            const amount = parseFloat(amountText.replace(/[^\d.-]/g, ''));
            if (!isNaN(amount)) {
                if (type === 'Débito') {
                    totalAmount += amount;
                } else if (type === 'Crédito') {
                    totalAmount -= amount;
                }
            }
        }
    });
    totalCell.innerHTML = `Total: ${totalAmount}`;
};

form.addEventListener('submit', event => {
    event.preventDefault();

    const transaction: TransactionInterface = {
        creditDebit: creditDebit.value,
        toFrom: toFrom.value,
        amount: amount.valueAsNumber,
        details: details.value,
        sendEmail: sendEmail.checked,
    }

    renderTransaction(transaction);
    updateTotal(transaction);
    clearForm();
});

const renderTransaction = (t: TransactionInterface) => {
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

    const tBody = document.querySelector('tbody')!;
    tBody.append(tableRow);
}

const updateTotal = (t: TransactionInterface) => {
    if (t.creditDebit === 'Débito') {
        totalAmount += t.amount;
    } else if (t.creditDebit === 'Crédito') {
        totalAmount -= t.amount;
    }
    totalCell.innerHTML = `Total: ${totalAmount}`;
}

const clearForm = () => {
    creditDebit.value = 'Crédito';
    toFrom.value = '';
    amount.value = '';
    details.value = '';
    sendEmail.checked = false;
}

// Inicializar el total con las transacciones predefinidas
initializeTotal();
