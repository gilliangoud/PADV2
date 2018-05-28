    InventorySystem = class InventorySystem {

    constructor(){
        inventory = [];
        var z = document.getElementById("itemnameofzo");
        var chosenItem = z.value;
    }


    
    useItem(){
        this.inventory.pop(chosenItem);
    }

    addItem() {
        inventory.push(chosenItem);
    }

    getInventory() {return this.inventory[];}
    
    }

    export default InventorySystem;