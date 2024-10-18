import { LightningElement } from 'lwc';

export default class CompositionIteration extends LightningElement {
    contacts = [
        {
            Id: '003171931112854375',
            Name: 'Amy Taylor',
            Title: 'VP of Engineering',
            Phone: '6172559632',
            Picture__c:
                'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/amy_taylor.jpg'
        },
        {
            Id: '003192301009134555',
            Name: 'Michael Jones',
            Title: 'VP of Sales',
            Phone: '6172551122',
            Picture__c:
                'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/michael_jones.jpg'
        },
        {
            Id: '003848991274589432',
            Name: 'Jennifer Wu',
            Title: 'CEO',
            Phone: '6172558877',
            Picture__c:
                'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/jennifer_wu.jpg'
        }
    ];


    renderedCallback() {
    
        const cardContainer = this.template.querySelector('.card-container');
        if (cardContainer) {
            cardContainer.style.backgroundColor = '#f0f8ff';  
            cardContainer.style.borderRadius = '10px';                   
        }

        const contactTiles = this.template.querySelectorAll('c-contact-tile');
        contactTiles.forEach(tile => {
            tile.style.backgroundColor = '#d3e2e4';  
            tile.style.fontSize = '14px'; 
            tile.style.color = '#102b85';
            tile.style.fontWeight = 'bold'
            tile.style.borderRadius = '8px';        
            tile.style.marginBottom = '10px';       
            tile.style.padding = '10px';             
            tile.style.border = '1px solid #dcdcdc'; 
        });
        
        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'darkblue';   
            footerText.style.fontSize = '12px'; 
            footerText.style.fontWeight = 'bold'    
        }

     
        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = 'darkred';  
            viewSource.style.fontSize = '13px'; 
            viewSource.style.fontWeight = 'bold'; 
        }
    }
    
}
