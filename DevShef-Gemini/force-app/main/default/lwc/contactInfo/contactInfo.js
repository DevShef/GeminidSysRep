import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

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

export default class ContactInfo extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields }) contact;

    get name() {
        return getFieldValue(this.contact.data, NAME_FIELD);
    }

    get title() {
        return getFieldValue(this.contact.data, TITLE_FIELD);
    }

    get phone() {
        return getFieldValue(this.contact.data, PHONE_FIELD);
    }

    get email() {
        return getFieldValue(this.contact.data, EMAIL_FIELD);
    }

    get picture() {
        return getFieldValue(this.contact.data, PICTURE_FIELD);
    }

    renderedCallback() {
        const infoBackground = this.template.querySelector('.info-background');
        if (infoBackground) {
            infoBackground.style.backgroundColor = '#f9fbe7'; // Light yellow-green
            infoBackground.style.padding = '20px';
        }

        const cardContainer = this.template.querySelector('lightning-card');
        if (cardContainer) {
            cardContainer.style.backgroundColor = '#ffffff'; // White
            cardContainer.style.borderRadius = '12px';
            cardContainer.style.padding = '20px';
            cardContainer.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            cardContainer.style.border = '2px solid #ff7043'; // Light orange
        }

        const contactDetailsContainer = this.template.querySelector('.contact-details-container');
        if (contactDetailsContainer) {
            contactDetailsContainer.style.backgroundColor = '#e0f2f1'; 
            contactDetailsContainer.style.borderRadius = '8px';        
            contactDetailsContainer.style.padding = '15px';            
            contactDetailsContainer.style.marginTop = '15px';          
            contactDetailsContainer.style.border = '1px solid #00796b'; 
        }

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = '#388e3c';   
            footerText.style.fontWeight = 'bold'; 
            footerText.style.fontSize = '14px'; 
        }

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = '#1976d2';   
            viewSource.style.fontWeight = 'bold';
            viewSource.style.fontSize = '14px';
        }
    }

}
