import { LightningElement } from 'lwc';
import checkApexTypes from '@salesforce/apex/ApexTypesController.checkApexTypes';

export default class ApexImperativeMethodWithComplexParams extends LightningElement {
    listItemValue = 4;
    numberValue = 50;
    stringValue = 'Some string';

    message;
    error;

    handleStringChange(event) {
        this.stringValue = event.target.value;
    }

    handleNumberChange(event) {
        this.numberValue = event.target.value;
    }

    handleListItemChange(event) {
        this.listItemValue = event.target.value;
    }

    async handleButtonClick() {
        // Creating the object that represents the shape
        // of the Apex wrapper class.
        let parameterObject = {
            someString: this.stringValue,
            someInteger: this.numberValue,
            someList: []
        };
        // Populating a list
        for (let i = 0; i < this.listItemValue; i++) {
            parameterObject.someList.push(this.stringValue);
        }

        // Calling the imperative Apex method with the JSON
        // object as parameter.
        try {
            this.message = await checkApexTypes({ wrapper: parameterObject });
            this.error = undefined;
        } catch (error) {
            this.message = undefined;
            this.error = error;
        }
    }


    renderedCallback() {
        const cardContainer = this.template.querySelector('.card-container');
        if (cardContainer) {
            cardContainer.style.backgroundColor = '#f0f0f0';  
            cardContainer.style.fontSize = '14px';
            cardContainer.style.color = '#102b85'                  
        }

        const inputElements = this.template.querySelectorAll('lightning-input');
        inputElements.forEach(input => {
            input.style.border = '1px solid #0070d2'; 
            input.style.padding = '10px';            
            input.style.marginBottom = '10px';        
        });

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'darkred';  
            viewSource.style.fontSize = '12px';  
            viewSource.style.fontWeight = 'bold'; 
        }

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'green';   
            footerText.style.fontWeight = 'bold';   
            footerText.style.fontSize = '14px';    
        }
    }
}
