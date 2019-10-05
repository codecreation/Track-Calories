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
      {id: 0, name: 'Steak Dinner', calories: 450},
      {id: 1, name: 'Eggs', calories: 175},
      {id: 2, name: 'Cookies', calories: 240}
    ],
    currentItem: null,
    totalCalories: 0
  }

})();

//ui control
const UICtrl = (function(){

})();

//app control
const App = (function(ItemCtrl, UICtrl){

})(ItemCtrl, UICtrl);
