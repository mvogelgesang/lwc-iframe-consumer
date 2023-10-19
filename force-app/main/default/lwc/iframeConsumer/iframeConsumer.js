import { LightningElement, api } from 'lwc';

export default class IframeConsumer extends LightningElement {
  @api iframeSrc = '';
  currentIframeUrl;

  connectedCallback() {
    if (this.iframeSrc !== '') {
      // listen for postMessage call from child iframe
    window.addEventListener(
      "message",
      (event) => {
        // verify the postMessage event is coming from a trusted source
        // if not, return and do nothing
        if (event.origin !== new URL(this.iframeSrc).origin) return;
        // if from trusted source, consume data
        this.currentIframeUrl = event.data.location;
      },
      false,
    );
    }
    
  }

}