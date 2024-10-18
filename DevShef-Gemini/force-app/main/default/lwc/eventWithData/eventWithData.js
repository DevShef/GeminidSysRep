import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class EventWithData extends LightningElement {
    selectedContact;

    @wire(getContactList) contacts;

    handleSelect(event) {
        const contactId = event.detail;
        this.selectedContact = this.contacts.data.find(
            (contact) => contact.Id === contactId
        );
    }

    renderedCallback() {
        const pageBackground = this.template.querySelector('.page-background');
        if (pageBackground) {
            pageBackground.style.backgroundColor = '#f0f8ff'; 
            pageBackground.style.padding = '20px'; 
        }

        const cardContainer = this.template.querySelector('.layout-container');
        if (cardContainer) {
            cardContainer.style.backgroundColor = '#eaf1f5';
            cardContainer.style.borderRadius = '5px';
        }

        const contactItems = this.template.querySelectorAll('c-contact-list-item');
        contactItems.forEach(item => {
            item.style.backgroundColor = '#e6f7ff';
            item.style.borderRadius = '3px';
            item.style.border = '1px solid #c0bebe';
            item.style.marginBottom = '10px';
        });



        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'blue';
            footerText.style.fontWeight = 'bold';
            footerText.style.fontSize = '12px'
        }
    

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'darkred';
            viewSource.style.fontWeight = 'bold';
            viewSource.style.fontSize = '12px'
        }
    }
}
