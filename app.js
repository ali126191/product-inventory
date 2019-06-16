let allItems = [];
let allQuantity = [];
let allPrices = [];
let allTotalPrices = [];
// Creates and adds a item element td
// Adds the element to the array
function addItems(text) {
    const item = {
        text,
        id: Date.now()
    }
    allItems.push(item);
    const list = document.querySelector('.table-body');

    const createTr = document.createElement('tr');
    list.appendChild(createTr)
    list.insertAdjacentHTML('beforeend', 
    `  
        <td class="item" data-key="${item.id}"> 
            <input value="${text}"/>
        </td>
    `)
}

// Creates and adds the quanity td
// Pushes new td to allQuantity array
function addQuanity(text) {
    const quantity = {
        text,
        id: Date.now()
    }
    allQuantity.push(quantity);
    const listOfTrs = document.querySelectorAll('tr');
    const lastTr = listOfTrs[listOfTrs.length - 1];
    let containsQuantity = false;
    lastTr.childNodes.forEach( item => {
       if (item.className === 'quantity') {
           containsQuantity = true;
       }
    })
    if (!containsQuantity) {
        lastTr.insertAdjacentHTML('beforeend', 
        `<td class="quantity" data-key="${quantity.id}">
            <input type="number" value="${text}"/>
        </td> 
    `);
    }
}

function addPrice(number) {
    const price = {
        number,
        id: Date.now()
    }
    allPrices.push(number);
    const listOfTrs = document.querySelectorAll('tr');
    const lastTr = listOfTrs[listOfTrs.length - 1];
    let containsPrice = false;
    lastTr.childNodes.forEach( item => {
       if (item.className === 'price') {
           containsPrice = true;
       }
    })
    if (!containsPrice) {
        lastTr.insertAdjacentHTML('beforeend', 
        `<td class="price" data-key="${price.id}">
            <input type="number"value="${number}"/>
        </td> 
    `);
    }
}

function findTotalPrice(priceText, quantityText) {
    // console.log(allItems, 'all Items');
    // console.log(allQuantity, 'all Quantity');
    // console.log(allPrices, 'all prices');

    const totalPrice = {
        id: Date.now()
    }
    const listOfTrs = document.querySelectorAll('tr');
    const lastTr = listOfTrs[listOfTrs.length - 1];
    console.log(quantityText, 'item')
    const value = quantityText * priceText;
    lastTr.insertAdjacentHTML('beforeend', 
    `<td class="total-price" data-key="${totalPrice.id}">
        <input type="text "value=${value}>
    </td>`)
}


// Updates the allItems array with the newly typed value
function changeItemValue(key, event) {
    const index = allItems.findIndex(item => item.id === Number(key));
    allItems[index] = event.value;
}

// Listens for input 
const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const inputItem = document.querySelector('.js-todo-input');
    const inputQuantity = document.querySelector('.input-number');
    const inputPrice = document.querySelector('.js-todo-price');
    const priceText  = inputPrice.value.trim();
    const quantityText = inputQuantity.value.trim();
    const Itemtext = inputItem.value.trim();
    if (Itemtext !== '') {
        addItems(Itemtext);
        inputItem.value = '';
        inputItem.focus();
        if (quantityText !== '') {
            addQuanity(quantityText);
            inputQuantity.value = '';
            inputItem.focus();
        }
        if (priceText !== '') {
            addPrice(priceText);
            inputPrice.value = '';
            inputItem.focus();
        }
        if (priceText !== '' && quantityText !== '') {
            findTotalPrice(priceText, quantityText);
        }
    }
})

//Listens for changing the input element
//Gets the items unique key value
// Evokes the changeItemValue function
const list = document.querySelector('.table');
list.addEventListener('change', event => {
    if (event.target.parentElement.classList.contains('item')) {
        const itemKey = event.target.parentElement.dataset.key;
        changeItemValue(itemKey, event.target);
    }
})

