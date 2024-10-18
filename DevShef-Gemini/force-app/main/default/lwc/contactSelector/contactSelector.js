import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ContactSelector extends LightningElement {
    contactOptions = [];
    error;

    @wire(getContactList)
    wiredContacts({ error, data }) {
        if (data) {
            this.contactOptions = data.map((record) => ({
                value: record.Id,
                label: record.Name
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contactOptions = undefined;
        }
    }

    handleRecordSelected(event) {
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: { recordId: event.target.value }
            })
        );
    }

    renderedCallback() {
        const pageBackground = this.template.querySelector('.page-background');
        if (pageBackground) {
            pageBackground.style.backgroundColor = '#3d9daa'; 
            pageBackground.style.padding = '20px';
        }

        const cardContainer = this.template.querySelector('lightning-card');
        if (cardContainer) {
            cardContainer.style.backgroundColor = '#cdd26a'; 
            cardContainer.style.borderRadius = '12px';
            cardContainer.style.padding = '20px';
            cardContainer.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            cardContainer.style.border = '2px solid #4caf50'; 
        }

        const selectorContainer = this.template.querySelector('.selector-container');
        if (selectorContainer) {
            selectorContainer.style.backgroundColor = '#f5f2da'; 
            selectorContainer.style.borderRadius = '8px';       
            selectorContainer.style.padding = '10px'; 
            selectorContainer.style.border = '1px solid #dcdcdc';
        }
        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = '#a8571f';   
            footerText.style.fontWeight = 'bold'; 
            footerText.style.fontSize = '13px'; 


            
        }

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'darkgreen';   
            viewSource.style.fontSize = '14px';  
            viewSource.style.fontWeight = 'bold'; 
            viewSource.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            viewSource.style.marginLeft = '20px';
            viewSource.style.marginTop = '15px';
            viewSource.style.padding = '10px';
        }
    }
}
