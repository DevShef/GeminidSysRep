import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContactList';

const COLS = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    {
        label: 'Contact Picture',
        type: 'customPictureType',
        typeAttributes: {
            pictureUrl: { fieldName: 'Picture__c' }
        },
        cellAttributes: { alignment: 'center' }
    }
];
export default class DatatableCustomDataType extends LightningElement {
    columns = COLS;

    @wire(getContacts)
    contacts;

    renderedCallback() {
        const dataTableDiv = this.template.querySelector('.dataTableColor');
        if (dataTableDiv) {
            dataTableDiv.style.backgroundColor = 'lightgray';
            dataTableDiv.style.borderRadius = '10px';
            dataTableDiv.style.padding = '20px';
            dataTableDiv.style.border = '2px solid #ccc';
            dataTableDiv.style.fontSize = '16px';
            dataTableDiv.style.color = 'darkblue';
            dataTableDiv.style.fontWeight = 'bold'
        }

        const customDataTable = this.template.querySelector('c-custom-data-types');
        if (customDataTable) {
            customDataTable.style.backgroundColor = '#C0C0C0';
            customDataTable.style.borderRadius = '4px';
            customDataTable.style.padding = '10px';

        }

        const tableHeaders = this.template.querySelectorAll('.slds-cell-fixed .slds-truncate');
        tableHeaders.forEach(header => {
            header.style.fontWeight = 'bolder';
            header.style.color = 'darkblue';
            header.style.fontSize = '16px';
        });

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'darkblue';  
            footerText.style.fontWeight = 'bold';   
            footerText.style.fontSize = '16px';    
            footerText.style.marginTop = '20px'; 
            footerText.style.textAlign = 'center'; 
            footerText.style.fontSize = '16px'
        }

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'darkred';
            viewSource.style.fontWeight = 'bold';
            viewSource.style.fontSize = '14px';
            viewSource.style.marginTop = '10px';
        }
    }
    
}
