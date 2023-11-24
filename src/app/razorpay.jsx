export const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  
  export const showSuccessMessage = (response) => {
    console.log('Payment Successful:', response);
    // You can handle success behavior here (e.g., redirect to a thank you page)
  };
  
  export const showErrorMessage = (message) => {
    console.error('Payment Error:', message);
    // You can handle error behavior here (e.g., show an error message to the user)
  };
  