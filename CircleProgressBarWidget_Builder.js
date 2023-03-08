(function () {
   let template = document.createElement("template");
   template.innerHTML = `
<br>
<style>
    #form {
        font-family: Arial, sans-serif;
        width: 400px;
        margin: 0 auto;
    }

    a {
        text-decoration: none;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
    }

    td {
        padding: 1px;
        text-align: left;
        font-size: 13px;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }


    input[type="color"] {
	-webkit-appearance: none;
	border: none;
	width: 32px;
	height: 32px;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}


    select {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    input[type="submit"] {
        background-color: #487cac;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        width: 100%;
    }

    #label {
        width: 140px;
    }
</style>
<form id="form">
    <table>
        <tr>
    <td>
    <p>Percentage</p>
    <input id="builder_percentage" type="number" placeholder="Enter Percentage">
    </td>
    </tr>
    <tr>
    <td>
    <p>Bar Color</p>
    <input id="builder_barColor" type="color" placeholder="Enter Bar Color">
    </td>
    </tr>
    <tr>
    <td>
    <p>Empty Bar Color</p>
    <input id="builder_emptyBarColor" type="color" placeholder="Enter Empty Bar Color">
    </td>
    </tr>
    
    </table>
    <input value="Update Settings" type="submit">
    <br>
    <p>Developed by <a target="_blank" href="https://linkedin.com/in/itsrohitchouhan">Rohit Chouhan</a></p>
</form>
`;
   class CircleProgressBarWidgetBuilderPanel extends HTMLElement {
      constructor() {
         super();
         this._shadowRoot = this.attachShadow({
            mode: "open"
         });
         this._shadowRoot.appendChild(template.content.cloneNode(true));
         this._shadowRoot
            .getElementById("form")
            .addEventListener("submit", this._submit.bind(this));
      }
      _submit(e) {
         e.preventDefault();
         this.dispatchEvent(
            new CustomEvent("propertiesChanged", {
               detail: {
                  properties: {
                     percentage: this.percentage,
                     barColor: this.barColor,
                     emptyBarColor: this.emptyBarColor
                  },
               },
            })
         );
      }

      set percentage(_percentage) {
         this._shadowRoot.getElementById("builder_percentage").value = _percentage;
      }
      get percentage() {
         return this._shadowRoot.getElementById("builder_percentage").value;
      }

      set barColor(_barColor) {
         this._shadowRoot.getElementById("builder_barColor").value = _barColor;
      }
      get barColor() {
         return this._shadowRoot.getElementById("builder_barColor").value;
      }

      set emptyBarColor(_emptyBarColor) {
         this._shadowRoot.getElementById("builder_emptyBarColor").value = _emptyBarColor;
      }
      get emptyBarColor() {
         return this._shadowRoot.getElementById("builder_emptyBarColor").value;
      }

   }
   customElements.define("com-rohitchouhan-sap-circleprogressbarwidget-builder",
      CircleProgressBarWidgetBuilderPanel
   );
})();