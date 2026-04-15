import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, cartTotal, onClose, onPaymentComplete }) => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' or 'failure'
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Generate fake transaction ID
  const generateTransactionId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9).toUpperCase();
    return `TXN${timestamp.toString().slice(-6)}${random}`;
  };

  // Format card number (add spaces every 4 digits)
  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  // Format expiry (MM/YY)
  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = formatCardNumber(value.replace(/\s/g, ''));
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'expiry') {
      const formatted = formatExpiry(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 3);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.cardName.trim()) {
      setErrorMessage('Cardholder name is required');
      return false;
    }
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      setErrorMessage('Card number must be 16 digits');
      return false;
    }
    if (!formData.expiry.match(/^\d{2}\/\d{2}$/)) {
      setErrorMessage('Expiry must be in MM/YY format');
      return false;
    }
    if (formData.cvv.length !== 3) {
      setErrorMessage('CVV must be 3 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing (2-3 seconds)
    await new Promise(resolve => 
      setTimeout(resolve, 2000 + Math.random() * 1000)
    );

    // 90% success rate, 10% failure rate
    const isSuccess = Math.random() < 0.9;

    if (isSuccess) {
      const txnId = generateTransactionId();
      setTransactionId(txnId);
      setPaymentStatus('success');
      
      // Wait before calling completion callback
      setTimeout(() => {
        onPaymentComplete(txnId);
      }, 2000);
    } else {
      setPaymentStatus('failure');
      setErrorMessage('Payment declined. Please try again or use a different card.');
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus(null);
    setFormData({
      cardName: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    });
  };

  const handleClose = () => {
    if (!isProcessing) {
      setPaymentStatus(null);
      setFormData({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
      });
      setErrorMessage('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay" onClick={handleClose}>
      <div className="payment-modal-container" onClick={e => e.stopPropagation()}>
        <div className="payment-modal-header">
          <h2>Complete Your Purchase</h2>
          <span className="demo-badge">🔒 DEMO MODE</span>
          {!isProcessing && paymentStatus === null && (
            <button className="close-button" onClick={handleClose}>✕</button>
          )}
        </div>

        {/* Loading State */}
        {isProcessing && paymentStatus === null && (
          <div className="payment-processing">
            <div className="processing-spinner"></div>
            <p>Processing your payment...</p>
            <p className="text-sm text-gray-600">Please wait</p>
          </div>
        )}

        {/* Success State */}
        {paymentStatus === 'success' && (
          <div className="payment-success">
            <div className="success-icon">✓</div>
            <h3>Payment Successful!</h3>
            <p className="transaction-details">
              Transaction ID: <strong>{transactionId}</strong>
            </p>
            <p className="amount-paid">
              Amount: <strong>${cartTotal.toFixed(2)}</strong>
            </p>
            <p className="success-message">
              Your order has been confirmed. Closing in a moment...
            </p>
          </div>
        )}

        {/* Failure State */}
        {paymentStatus === 'failure' && (
          <div className="payment-failure">
            <div className="failure-icon">✕</div>
            <h3>Payment Failed</h3>
            <p className="error-msg">{errorMessage}</p>
            <button 
              className="retry-button"
              onClick={handleRetry}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Form State */}
        {paymentStatus === null && !isProcessing && (
          <form onSubmit={handleSubmit} className="payment-form">
            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Card Name */}
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                placeholder="John Doe"
                disabled={isProcessing}
              />
            </div>

            {/* Card Number */}
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                disabled={isProcessing}
              />
              <small>Test: 4532 1488 0343 6467 (Demo card)</small>
            </div>

            {/* Expiry and CVV */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry">Expiry (MM/YY)</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  placeholder="12/25"
                  maxLength="5"
                  disabled={isProcessing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="3"
                  disabled={isProcessing}
                />
                <small>3 digits on back</small>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="error-banner">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="pay-button"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
            </button>

            {/* Information */}
            <p className="demo-info">
              💡 This is a demo payment system. No real charges will be made.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
