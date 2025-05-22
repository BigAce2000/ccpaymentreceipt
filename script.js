document.addEventListener('DOMContentLoaded', function() {
    const receiptForm = document.getElementById('receiptForm');
    const receiptOutput = document.getElementById('receiptOutput');

    if (!receiptForm) {
        console.error("Receipt form not found!");
        return;
    }

    receiptForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Form submitted!"); // Debug log to confirm form submission

        try {
            const recipientName = document.getElementById('recipientName').value;
            const accountNumber = document.getElementById('accountNumber').value;
            const merchantCardNumber = document.getElementById('merchantCardNumber').value;
            const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
            const status = document.getElementById('status').value;

            // Mask the account number (showing last 4 digits)
            const maskedAccountNumber = '**** **** **** ' + accountNumber.slice(-4);

            // Mask the merchant card number (showing last 4 digits)
            const maskedMerchantCardNumber = 'xxxx xxxx xxxx ' + merchantCardNumber.slice(-4);

            // Generate a random Transaction ID (e.g., 4 letters + 4 numbers)
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';
            let transactionId = '';
            for (let i = 0; i < 4; i++) {
                transactionId += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            for (let i = 0; i < 4; i++) {
                transactionId += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }

            // Get the current date
            const date = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

            // Generate the receipt
            receiptOutput.style.display = 'block';
            receiptOutput.innerHTML = `
                <div class="receipt-header">
                    <h3>Credit Card Payment</h3>
                </div>
                <div class="receipt-body">
                    <div class="status-section">
                        <strong>Payment ${status}</strong>
                        <span>Transaction ID: ${transactionId}</span>
                    </div>
                    <p class="card-info"><strong>Card</strong><span>${maskedAccountNumber}<img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa Logo"></span></p>
                    <p class="merchant-card-info"><strong>Merchant Card</strong><span>${maskedMerchantCardNumber}<img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa Logo"></span></p>
                    <p><strong>Merchant</strong><span>${recipientName}</span></p>
                    <p><strong>Amount</strong><span>$${amount}</span></p>
                    <p><strong>Date</strong><span>${date}</span></p>
                    <p><strong>Reference</strong><span>${transactionId}</span></p>
                </div>
                <div class="receipt-footer">
                    <button class="print-btn">Print Receipt</button>
                    <div class="button-group">
                        <button class="back-btn">Back</button>
                        <button class="done-btn">Done</button>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error("Error generating receipt:", error);
        }
    });
});
