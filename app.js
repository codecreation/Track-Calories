//storage control


//item control
const ItemCtrl = (function(){
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  const data = {
    items: [
      // {id: 0, name: 'Steak Dinner', calories: 450},
      // {id: 1, name: 'Eggs', calories: 175},
      // {id: 2, name: 'Cookies', calories: 240}
    ],
    currentItem: null,
    totalCalories: 0
  }

  return{
    getItems: function() {
      return data.items;
    },
    logData: function() {
      return data;
    },
    addItem: function(name, calories) {
      console.log(name, calories);
      let id;
      //create ID
      if(data.items.length > 0)
      {
        id = data.items[data.items.length - 1].id + 1;
      }else{
        id = 0;
      }

      //calories to number
      calories = parseInt(calories);

      //create new item
      newItem = new Item(id, name, calories);

      data.items.push(newItem);
      data.items.totalCalories += newItem.calories;
      // console.log(newItem.calories);

      return newItem;

    },
    getTotalCalories: function() {
      let total = 0;
      data.items.forEach(function(item) {
        total += item.calories;
      })
      data.totalCalories = total;
      return total;
    },
    getItemById:function(id) {
      let found = null;
      //loop thru items
      data.items.forEach(function(item) {
        if(item.id === id)
        {
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories) {
      //caloris to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item) {
        if(item.id === data.currentItem.id)
        {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id) {
    const ids = data.items.map(function(item) {
        return item.id;
      });
      const index = ids.indexOf(id);
      data.items.splice(index, 1);
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    clearAllItems: function() {
      data.items = [];
    }

  }
})();

//ui control
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',

  };

//public methods
  return{
    populateItemList: function(items) {
      let html = '';
      console.log("At populate");

      items.forEach(function(item) {
        html+= `<li id="item-${item.id}" class="collection-item">
        <strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
        </li>`;
      });
      //insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return{
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      }
    },
    addListItem: function(item) {
      //show list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //create li element
      const li = document.createElement('li');
      //add class
      li.className = 'collection-item';
      //add id
      li.id = `item-${item.id}`;
      //add HTML
      li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
      <a href="" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`
      //insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemId = listItem.getAttribute('id');

        if(itemId === `item-${item.id}`)
        {
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
          <a href="" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`
        }
      })
    },
    deleteListItem: function(id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);
      listItems.forEach(function(item) {
        item.remove();
      })
    },
    getSelectors: function() {
      return UISelectors;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    addCalories: function(totalCalories) {
      const calories = document.getElementsByClassName('total-calories');
      calories[0].innerHTML = totalCalories;
    },
    showAlert: function(msg) {
      alert(msg);
    }
  }
})();

//app control
const App = (function(ItemCtrl, UICtrl){
  const loadEventListeners = function() {
    //get UI selectors
    const UISelectors = UICtrl.getSelectors();

    //add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //disable submit on enter
    document.addEventListener('keypress', function(e) {
      if(e.keyCode === 13 || e.which === 13)
      {
        e.preventDefault();
        return false;
      }
    });

    //edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    //update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    //bakc btn
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    //delete item
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    //clear all
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);


  }
  const itemAddSubmit = function(e) {
    const input = UICtrl.getItemInput();
    console.log(input);
    if(input.name !== '' && input.calories !== '')
    {
       console.log("Got here");
       const newItem =ItemCtrl.addItem(input.name, input.calories);
       UICtrl.addListItem(newItem);

       //get total calories
       const totalCalories = ItemCtrl.getTotalCalories();
       console.log(totalCalories);
       UICtrl.addCalories(totalCalories);
       //clear fields
       UICtrl.clearInput();

    }

    e.preventDefault();
  }

  const itemEditClick = function(e) {
    if(e.target.classList.contains('edit-item'))
    {
      const listId = e.target.parentNode.parentNode.id;

      //break into array
      const listIdArr = listId.split('-');

      //get actual id
      const id = parseInt(listIdArr[1]);
      //get item
      const itemToEdit = ItemCtrl.getItemById(id);

      //set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      //add new item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  }

  const itemUpdateSubmit = function(e) {
    //get item input
    const input = UICtrl.getItemInput();

    //update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //update UI
    UICtrl.updateListItem(updatedItem);

    const totalCalories = ItemCtrl.getTotalCalories();
    console.log(totalCalories);
    UICtrl.addCalories(totalCalories);
    UICtrl.clearEditState();

    e.preventDefault();
  }

  const itemDeleteSubmit = function(e) {
    const currentItem = ItemCtrl.getCurrentItem();

    ItemCtrl.deleteItem(currentItem.id);
    UICtrl.deleteListItem(currentItem.id);

    const totalCalories = ItemCtrl.getTotalCalories();
    console.log(totalCalories);
    UICtrl.addCalories(totalCalories);
    UICtrl.clearEditState();


    e.preventDefault();
  }

  const clearAllItemsClick = function() {
    ItemCtrl.clearAllItems();

    const totalCalories = ItemCtrl.getTotalCalories();
    console.log(totalCalories);
    UICtrl.addCalories(totalCalories);

    UICtrl.removeItems();

    UICtrl.hideList();
  }

  return{
    init: function() {
      console.log('Initializing App...');
      //clear edit state / set initial set
      UICtrl.clearEditState();
      const items = ItemCtrl.getItems();

      if(items.length === 0)
      {
        UICtrl.hideList();
      }else{
        UICtrl.populateItemList(items);
      }
      const totalCalories = ItemCtrl.getTotalCalories();
      console.log(totalCalories);
      UICtrl.addCalories(totalCalories);

      console.log(items);


      //load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);

App.init();

ItemCtrl.getItems();
