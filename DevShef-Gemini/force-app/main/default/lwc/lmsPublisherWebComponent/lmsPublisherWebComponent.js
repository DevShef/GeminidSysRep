import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

export default class LmsPublisherWebComponent extends LightningElement {
    @wire(getContactList)
    contacts;

    @wire(MessageContext)
    messageContext;

    // Respond to UI event by publishing message
    handleContactSelect(event) {
        const payload = { recordId: event.target.contact.Id };

        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
    }


    renderedCallback() {
        const cardContainer = this.template.querySelector('lightning-card');
        if (cardContainer) {
            cardContainer.style.backgroundColor = '#f0f4f7'; 
            cardContainer.style.fontSize = '16px';
            cardContainer.style.fontWeight = 'bold';
        }

        const contactListItems = this.template.querySelectorAll('li');
        contactListItems.forEach(item => {
            item.style.backgroundColor = '#f1f0f0'; 
            item.style.border = '1px solid #d8dde6';
            item.style.boxShadow = '0 1px 1px 0 rgba(0,0,0,0.1)';
        
        });

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'darkred';
            viewSource.style.fontWeight = 'bold';
            viewSource.style.fontSize = '14px';
        }

        const footertext = this.template.querySelector('.footer-text');
        if (footertext) {
            footertext.style.color = '#2a85d0'; 
            footertext.style.fontWeight = 'normal';
            footertext.style.fontSize = '14px';
            footertext.style.fontWeight = 'normal';
    }
    
    }

}
