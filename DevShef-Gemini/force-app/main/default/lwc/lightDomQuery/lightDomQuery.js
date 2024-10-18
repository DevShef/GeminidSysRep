import { LightningElement } from 'lwc';

export default class LightDomQuery extends LightningElement {
    handleButtonClick() {
        // Elements that are inside a Light DOM child component are directly accessible by the parent
        this.template.querySelector('p.lightDomParagraph').innerText =
            'Text changed by parent';
    }

    renderedCallback() {
        const pageBackground = this.template.querySelector('.page-background');
        if (pageBackground) {
            pageBackground.style.backgroundColor = '#a3e1e9'; 
            pageBackground.style.padding = '20px';
            pageBackground.style.fontSize = '13px';
            pageBackground.style.color = '#1a5a62';
            pageBackground.style.fontWeight = 'bold';
            
        }

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = '#1a5a62';  
            footerText.style.fontWeight = 'bold'; 
            footerText.style.fontSize = '13px';  
        }

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.color = '#9c3f31';   
            viewSource.style.fontWeight = 'bold';
            viewSource.style.fontSize = '13px';
        }
    }

}
