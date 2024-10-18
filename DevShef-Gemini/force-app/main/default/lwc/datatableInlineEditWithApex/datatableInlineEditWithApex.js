import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContactList';
import updateContacts from '@salesforce/apex/ContactController.updateContacts';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLS = [
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: true },
    { label: 'Title', fieldName: 'Title', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true }
];

export default class DatatableInlineEditWithApex extends LightningElement {
    columns = COLS;
    draftValues = [];

    @wire(getContacts)
    contacts;

    async handleSave(event) {
        const updatedFields = event.detail.draftValues;

        // Clear all datatable draft values
        this.draftValues = [];

        try {
            // Pass edited fields to the updateContacts Apex controller
            await updateContacts({ contactsForUpdate: updatedFields });

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contacts updated',
                    variant: 'success'
                })
            );

            // Display fresh data in the datatable
            await refreshApex(this.contacts);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }

    renderedCallback() {
        const datatableContainer = this.template.querySelector('lightning-datatable');
        if (datatableContainer) {
            datatableContainer.style.backgroundColor = '#f5f7fa';
            datatableContainer.style.borderRadius = '6px';
            datatableContainer.style.padding = '10px';
        }

        const cardContainer = this.template.querySelector('lightning-card');
        if (cardContainer) {
            cardContainer.style.backgroundColor = '#ebf1f5';
            cardContainer.style.padding = '15px';
            cardContainer.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            cardContainer.style.border = '2px solid #2a85d0';
        }

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'darkblue';  
            footerText.style.fontWeight = 'bold';   
            footerText.style.fontSize = '14px';    
            footerText.style.marginTop = '20px'; 
        }

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'darkred';
            viewSource.style.fontWeight = 'bold';
            viewSource.style.fontSize = '14px';
            footerText.style.textAlign = 'center'; 
            viewSource.style.marginTop = '10px';
        }
    }
} 

