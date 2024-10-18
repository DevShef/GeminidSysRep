import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ApexWireMethodToProperty extends LightningElement {
    @wire(getContactList) contacts;

    renderedCallback() {
        // const cardContainer = this.template.querySelector('.card-container');
        // if (cardContainer) {
        //     cardContainer.style.backgroundColor = '#bfe9e6';  
        //     cardContainer.style.borderRadius = '10px';                   
        // }
        const contactElements = this.template.querySelectorAll('p');
        contactElements.forEach(contact => {
            contact.style.background = '#e3edee';
            contact.style.color = 'blue'; 
            contact.style.fontWeight = 'bold'; 
            contact.style.marginBottom = '10px'; 
        });

        
        const viewSource  = this.template.querySelector('c-view-source');
        if (viewSource ) {
            viewSource .style.color = 'darkred';
            viewSource .style.fontWeight = 'bold';
            viewSource .style.fontSize = '14px';
        }


        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'green';   
            footerText.style.fontWeight = 'bold';   
            footerText.style.fontSize = '12px';       
            footerText.style.textAlign = 'center';  
        }
    }
}
