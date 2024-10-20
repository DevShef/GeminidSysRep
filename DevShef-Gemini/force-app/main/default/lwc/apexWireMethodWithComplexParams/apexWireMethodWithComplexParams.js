import { LightningElement, wire } from 'lwc';
import checkApexTypes from '@salesforce/apex/ApexTypesController.checkApexTypes';

export default class ApexWireMethodWithComplexParams extends LightningElement {
    listItemValue = 0;
    numberValue = 50;
    stringValue = 'Some string';
Zxcfdsa
    parameterObject = {
        someString: this.stringValue,
        someInteger: this.numberValue,
        someList: []
    };

    @wire(checkApexTypes, { wrapper: '$parameterObject' })
    apexResponse;

    handleStringChange(event) {
        this.parameterObject = {
            ...this.parameterObject,
            someString: (this.stringValue = event.target.value)
        };
    }

    handleNumberChange(event) {
        this.parameterObject = {
            ...this.parameterObject,
            someInteger: (this.numberValue = parseInt(event.target.value, 10))
        };
    }

    handleListItemChange(event) {
        const someList = [];
        for (let i = 0; i < event.target.value; i++) {
            someList.push(this.stringValue);
        }
        this.parameterObject = {
            ...this.parameterObject,
            someList
        };
    }

    renderedCallback() {
        const cardContainer = this.template.querySelector('.card-container');
        if (cardContainer) {
            cardContainer.style.backgroundColor = '#dadce1';  
            cardContainer.style.borderRadius = '10px';         
            cardContainer.style.padding = '15px';             
        }
    
        const inputElements = this.template.querySelectorAll('lightning-input');
        inputElements.forEach(input => {
            input.style.border = '2px solid #000080';  
            input.style.padding = '10px';             
            input.style.marginBottom = '10px'; 
            input.style.width = '100%';
            input.style.fontSize = '16px';
            input.style.fontWeight = 'bold';
            
        });

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'darkblue'; 
            viewSource.style.fontWeight = 'bold';
            viewSource.style.fontSize = '12px';
            viewSource.style.fontStyle = 'italic'; 

        }

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'darkblue';  
            footerText.style.fontWeight = 'normal';   
            footerText.style.fontSize = '13px';   
        }
    }

}
