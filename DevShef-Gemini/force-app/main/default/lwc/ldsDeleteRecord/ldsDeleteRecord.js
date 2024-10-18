import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import { reduceErrors } from 'c/ldsUtils';

export default class LdsDeleteRecord extends LightningElement {
    accounts;
    error;

    /** Wired Apex result so it can be refreshed programmatically */
    wiredAccountsResult;

    @wire(getAccountList)
    wiredAccounts(result) {
        this.wiredAccountsResult = result;
        if (result.data) {
            this.accounts = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.accounts = undefined;
        }
    }

    async deleteAccount(event) {
        const recordId = event.target.dataset.recordid;

        try {
            await deleteRecord(recordId);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account deleted',
                    variant: 'success'
                })
            );
            await refreshApex(this.wiredAccountsResult);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: reduceErrors(error).join(', '),
                    variant: 'error'
                })
            );
        }
    }


  
    renderedCallback() { // from Shef 
        const accountList = this.template.querySelectorAll('.slds-var-m-around_medium');
        
        accountList.forEach(element => {
            element.style.backgroundColor = 'lightyellow';  
            element.style.borderRadius = '8px';             
            element.style.padding = '15px';                
            element.style.marginBottom = '10px';            
            element.style.color = 'darkblue';
            element.style.fontSize ='16px';
            element.style.fontWeight = 'bold'
        });

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'maroon';      
            footerText.style.fontWeight = 'bold'; 
            footerText.style.fontSize = '14px';     
        }
    }
}
