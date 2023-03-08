(function () {
  let template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
          display: inline-block;
          position: relative;
          width: 100px;
          height: 100px;
      }

 #progress-spinner {
      border-radius: 50%;
      height: 100px;
      width: 100px;
    }

    #middle-circle {
      position: absolute;
      border-radius: 50%;
      height: 80px;
      width: 80px;
      background-color: rgb(248, 248, 248);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: large;
      font-weight: bold;
    }
    </style>
  <div
      style="
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div id="middle-circle">10%</div>
      <div id="progress-spinner"></div>
    </div>
  `;
  class Widget extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({
        mode: "open"
      });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }
    async connectedCallback() {
      this.initMain();
    }
    async initMain() {
      const progressBar = this.shadowRoot.querySelector("#progress-spinner");
      const progressText = this.shadowRoot.querySelector("#middle-circle");

      const barColor = this._props.barColor || "#03ff4f";
      const emptyBarColor = this._props.emptyBarColor || "#ededed";
      const percentage = this._props.percentage || 75;

      var i = 0;
      var interval = setInterval(function () {
        progressBar.style.background =
          "conic-gradient(" + barColor + " " +
          i +
          "%," + emptyBarColor + " " +
          i +
          "%)";

        progressText.innerText = `${i}%`;

        if (i == percentage || i >= 100) {
          clearInterval(interval);
        }
        i++;
      }, 20);



    }
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = {
        ...this._props,
        ...changedProperties
      };
    }
    onCustomWidgetAfterUpdate(changedProperties) {
      this.initMain();
    }
  }
  customElements.define("com-rohitchouhan-sap-circleprogressbarwidget", Widget);
})();