import { LightningElement } from 'lwc';

export default class ApiSpread extends LightningElement {
    props = {
        firstName: 'Amy',
        lastName: 'Taylor'
    };

    handleChange(event) {
        const field = event.target.name;
        if (field === 'firstName') {
            this.props = {
                firstName: event.target.value,
                lastName: this.props.lastName
            };
        } else if (field === 'lastName') {
            this.props = {
                firstName: this.props.firstName,
                lastName: event.target.value
            };
        }
    }

    renderedCallback() {

        const formContainer = this.template.querySelector('.form-container');
        if (formContainer) {
            formContainer.style.backgroundColor = '#c3dbd7'; 
        }

        const footerText = this.template.querySelector('.footer-text');
        if (footerText) {
            footerText.style.color = 'navy';
            footerText.style.fontWeight = 'bold';
            footerText.style.fontSize = '13px';

        const viewSource = this.template.querySelector('c-view-source');
        if (viewSource) {
            viewSource.style.backgroundColor = '#bfe6eb';
            viewSource.style.color = 'brown';
            viewSource.style.fontWeight = 'bold';
            viewSource.style.fontSize = '13px';
        }
    }

    }
}
