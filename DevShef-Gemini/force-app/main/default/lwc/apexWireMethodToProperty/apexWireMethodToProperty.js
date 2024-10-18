import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ApexWireMethodToProperty extends LightningElement {
    @wire(getContactList) contacts;

    renderedCallback() {
        // Apply styles to the contact list
        const contactElements = this.template.querySelectorAll('p');
        contactElements.forEach(contact => {
            contact.style.color = 'blue'; // Change text color
            contact.style.fontWeight = 'bold'; // Make text bold
            contact.style.marginBottom = '10px'; // Add margin between contacts
        });

        //Target the view source and change its font color
        const viewSource  = this.template.querySelector('c-view-source');
        if (viewSource ) {
            viewSource .style.color = 'darkred';
            viewSource .style.fontWeight = 'bold';
            viewSource .style.fontSize = '16px';
        }


        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'darkgreen';   // Yazı rengini koyu yeşil yapalım
            footerText.style.fontWeight = 'bold';   // Yazıyı kalın yapalım
            footerText.style.fontSize = '16px';     // Yazı boyutunu büyütelim
            footerText.style.marginTop = '20px';    // Üstüne biraz boşluk ekleyelim
            footerText.style.textAlign = 'center';  // Yazıyı ortalayalım
        }
    }
}
