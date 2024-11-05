document.addEventListener('DOMContentLoaded', () => {
    // Assuming userContent and stockContent are already set globally, parse them
    const stocksData = JSON.parse(stockContent);
    let userData = JSON.parse(userContent); // Make sure to use `let` for mutability
    
    // Generate the user list when the page loads
    generateUserList(userData, stocksData);
  
    // Save Button Listener
    const saveButton = document.querySelector('#btnSave');
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
  
      if (userIndex !== -1) {
        // Update user data with the form values
        userData[userIndex].user.firstname = document.querySelector('#firstname').value;
        userData[userIndex].user.lastname = document.querySelector('#lastname').value;
        userData[userIndex].user.address = document.querySelector('#address').value;
        userData[userIndex].user.city = document.querySelector('#city').value;
        userData[userIndex].user.email = document.querySelector('#email').value;
  
        // Re-render the user list after saving changes
        generateUserList(userData, stocksData);
      }
    });
  
    // Delete Button Listener
    const deleteButton = document.querySelector('#btnDelete');
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
  
      if (userIndex !== -1) {
        // Remove the user from the array
        userData.splice(userIndex, 1);
  
        // Re-render the user list after deletion
        generateUserList(userData, stocksData);
      }
    });
  });
  
  // Function to generate the user list dynamically
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    
    // Clear the list before re-rendering
    userList.innerHTML = '';
    
    // Create list items for each user
    users.forEach(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });
    
    // Register the event listener for clicking on a user
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
  }
  
  // Event handler for clicking on a user
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
  
    // Find the user based on the clicked id
    const user = users.find(user => user.id == userId);
  
    // Populate the form with the user's data
    populateForm(user);
  
    // Render the user's portfolio
    renderPortfolio(user, stocks);
  }
  
  // Populate form with the user's data
  function populateForm(data) {
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }
  
  // Render the user's portfolio
  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
  
    // Clear previous portfolio items
    portfolioDetails.innerHTML = '';
  
    // Create elements for each stock in the portfolio
    portfolio.forEach(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
  
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
  
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    // Register the event listener for "View" buttons
    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }
  
  // Render the stock details when clicked
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
  
    if (stockArea) {
      // Find the stock by symbol
      const stock = stocks.find(s => s.symbol === symbol);
  
      // Populate stock details in the form
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
  
      // Set the logo image for the stock
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }