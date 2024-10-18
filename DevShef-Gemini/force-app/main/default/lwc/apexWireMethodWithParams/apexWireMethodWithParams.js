import { LightningElement, wire } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 300;

export default class ApexWireMethodWithParams extends LightningElement {
    searchKey = '';

    @wire(findContacts, { searchKey: '$searchKey' })
    contacts;

    handleKeyChange(event) {
        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY);
    }

    renderedCallback() {
        const inputElements = this.template.querySelectorAll('lightning-input');
        inputElements.forEach(input => {
            input.style.border = '1px solid #0070d2';  // Apply Salesforce Blue border
            input.style.padding = '10px';             // Add some padding to the inputs
            input.style.marginBottom = '10px';        // Add spacing between the inputs
        });

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'blue'; 
            viewSource.style.fontWeight = 'normal';
            viewSource.style.fontSize = '10px';
            viewSource.style.fontStyle = 'italic'; 
        }

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'darkgreen';  
            footerText.style.fontWeight = 'bold';   
            footerText.style.fontSize = '12px';     
            footerText.style.marginTop = '12px';  
        }
    }

}
