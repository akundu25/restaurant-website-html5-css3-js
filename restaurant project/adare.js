//UI-controller

//we are the using IFFE for data privacy

var UIcontroller = (function() {
    
     var DOMStrings = {
        
         costOfPlate: '.platecost',
         welcomeDrinks: '.drinks',
         vegStarter: '.veg-starter',
         nonvegStarter: '.nonveg-starter',
         salad: '.salad-items',
         fishMaincourse: '.fish-maincourse',
         chickenMaincourse: '.chicken-maincourse',
         muttonMaincourse: '.mutton-maincourse',
         vegetableMaincourse: '.vegetable-maincourse',
         rice: '.rice-items',
         roti: '.roti-items',
         chutney: '.chutney',
         papad: '.papad',
         dessert: '.dessert-items',
         perPlate: '.total-price'
    }
    
     
    var calcTotal = function(fields) {
        
        var fieldsArr, totalValue;
        
        totalValue = 0;
        
        fieldsArr = Array.prototype.slice.call(fields);
        
        fieldsArr.forEach(function(current) {
            
            totalValue += parseFloat(current.value);
            
        });
        
        return totalValue;
        
    } 
    
    return {
        
        
        inputData: function() {
            
            return {
                
                drinks: parseFloat(document.querySelector(DOMStrings.welcomeDrinks).value),
                
                starter: calcTotal(document.querySelectorAll(DOMStrings.vegStarter + ', ' + DOMStrings.nonvegStarter)),
                
                salads: parseFloat(document.querySelector(DOMStrings.salad).value),
                
                maincourse: calcTotal(document.querySelectorAll(DOMStrings.fishMaincourse + ', ' + DOMStrings.chickenMaincourse + ', ' + DOMStrings.muttonMaincourse + ', ' + DOMStrings.vegetableMaincourse)),
                
                itemsOfRice: parseFloat(document.querySelector(DOMStrings.rice).value),
                
                itemsOfRoti: parseFloat(document.querySelector(DOMStrings.roti).value),
                
                accompaniments: calcTotal(document.querySelectorAll(DOMStrings.chutney + ', ' + DOMStrings.papad)),
                
                sweet: parseFloat(document.querySelector(DOMStrings.dessert).value),
                
                pricePerPlate: function() {
                    return (this.drinks + this.starter + this.salads + this.maincourse + this.itemsOfRice + this.itemsOfRoti + this.accompaniments + this.sweet);
                }
                
            };
            
        },
        
        displayPrice: function(price) {
            
            document.querySelector(DOMStrings.perPlate).textContent = price;
            
        },
        
        getDOM: function() {
            return DOMStrings;
        }
        
    }; 
    
})();


//Global controller

var controller = (function(UICtrl) {
    
    //0. setup the event listeners
    
    var setupEventListener = function() {
        
        var DOM = UICtrl.getDOM();
        
        document.querySelector(DOM.costOfPlate).addEventListener('click', ctrlOrder);
        
    };
    
    
    var ctrlOrder = function() {
        var input, costPerPlate;
        //1. take the inputs from the UI
    
        input = UICtrl.inputData();

        //2. calculate the total price 
        
        costPerPlate = input.pricePerPlate();
        
        //3. Display the total price on the UI
        
        UICtrl.displayPrice(costPerPlate);
        
    };
    
    return {
        init: function(){
            //Initiating function
            
            setupEventListener();
        }
    };
    
})(UIcontroller);


//starting the process

controller.init();