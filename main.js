const inputs = document.querySelectorAll('.input100');
inputs.forEach(input => {
  input.addEventListener('input', function () {
    if (input.value.trim() !== '') {
      input.classList.add('has-val');
    } else {
      input.classList.remove('has-val');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.login100-form');
  var messageContainer = document.getElementById('message-container');

  form.addEventListener('submit', async function (event) {
      event.preventDefault(); 

      var emailInput = document.querySelector('input[name="email"]');
      var passwordInput = document.querySelector('input[name="pass"]');

      messageContainer.innerHTML = '';

      // Validate Email
      if (!validateEmail(emailInput.value)) {
          displayMessage('Please enter a valid email address', 'error');
          return;
      }

      // Validate Password
      if (passwordInput.value.length < 8) {
          displayMessage('Password must be at least 8 characters long', 'error');
          return;
      }

      // Fake Request
      try {
          var response = await sendForm({ email: emailInput.value, password: passwordInput.value });
          if (response.ok) {
              // Check for specific conditions
              var responseData = await response.json();
              if (responseData.email === 'test@gmail.com' && responseData.password === '12345678') {
                  alert('You have successfully logged in!');
              } else {
                  displayMessage('Login failed. Please try again.', 'error');
              }
          } else {
              displayMessage('Login failed. Please try again.', 'error');
          }
      } catch (error) {
          console.error('Error:', error);
          displayMessage('An error occurred. Please try again later.', 'error');
      }
  });

  // Email validation function
  function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

  // Display validation message
  function displayMessage(message, type) {
      var messageElement = document.createElement('div');
      messageElement.className = 'message ' + type;
      messageElement.textContent = message;
      messageContainer.appendChild(messageElement);
  }

  async function sendForm(data) {
      try {
          // Simulate a fake fetch request
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating delay
          return {
              ok: true,
              json: async () => data // Return the data as if it came from the server
          };
      } catch (error) {
          console.error('Error sending form:', error);
          throw error;
      }
  }
});