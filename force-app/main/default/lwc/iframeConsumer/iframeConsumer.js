import { LightningElement, api } from "lwc";
import getIframeUrl from "@salesforce/apex/IframeSessionCache.getIframeUrl";
import setIframeUrl from "@salesforce/apex/IframeSessionCache.setIframeUrl";

export default class IframeConsumer extends LightningElement {
  @api defaultSrc = "";
  firstLoadIframeSrc = "";
  currentIframeUrl = "";
  cachedIframeUrl = "";

  async loadCache() {
    this.cachedIframeUrl = await getIframeUrl();
  }

  async setCache(url) {
    await setIframeUrl({url:url});
    await this.loadCache();
  }

  createListener() {
    if (this.firstLoadIframeSrc !== "") {
      // listen for postMessage call from child iframe
      window.addEventListener(
        "message",
        (event) => {
          // verify the postMessage event is coming from a trusted source
          // if not, return and do nothing
          if (event.origin !== new URL(this.defaultSrc).origin) return;
          // if from trusted source, consume data
          this.currentIframeUrl = event.data.location;
          this.setCache(event.data.location);
        },
        false
      );
    }
  }

  async connectedCallback() {
    await this.loadCache();
    if (this.cachedIframeUrl !== null) {
      this.firstLoadIframeSrc = this.cachedIframeUrl;
    } else {
      this.firstLoadIframeSrc = this.defaultSrc;
    }   
    this.createListener();
  }
}
