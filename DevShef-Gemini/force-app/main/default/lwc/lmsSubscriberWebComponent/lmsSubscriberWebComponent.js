import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';

// Import message service features required for subscribing and the message channel
import { subscribe, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PICTURE_FIELD from '@salesforce/schema/Contact.Picture__c';

const fields = [
    NAME_FIELD,
    TITLE_FIELD,
    PHONE_FIELD,
    EMAIL_FIELD,
    PICTURE_FIELD
];

export default class LmsSubscriberWebComponent extends LightningElement {
    subscription = null;
    recordId;

    Name;
    Title;
    Phone;
    Email;
    Picture__c;

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecord({ error, data }) {
        if (error) {
            this.dispatchToast(error);
        } else if (data) {
            fields.forEach(
                (item) => (this[item.fieldApiName] = getFieldValue(data, item))
            );
        }
    }

    // By using the MessageContext @wire adapter, unsubscribe will be called
    // implicitly during the component descruction lifecycle.
    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for LMS subscribe.
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            RECORD_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    // Handler for message received by component
    handleMessage(message) {
        this.recordId = message.recordId;
    }

    // Standard lifecycle hooks used to sub/unsub to message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    // Helper
    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                message: reduceErrors(error).join(', '),
                variant: 'error'
            })
        );
    }


    renderedCallback() {
        const cardContainer = this.template.querySelector('lightning-card');
        if (cardContainer) {
            cardContainer.style.backgroundColor = '#f9f9f9';  
            cardContainer.style.fontSize = '16px';
            cardContainer.style.fontWeight = 'bold'; 
        }

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'darkred'; 
            viewSource.style.fontWeight = 'bold';
            viewSource.style.fontSize = '14px';
        }

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = '#2a85d0'; 
            footerText.style.fontWeight = 'normal';
            footerText.style.fontSize = '14px';
            footerText.style.marginTop = '15px';
    }
}
}