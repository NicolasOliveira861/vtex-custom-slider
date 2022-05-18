import waitForEl from "../helpers/waitForEl";
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

export default class Exemple {
    constructor() {
        this.init();
        // ReactDOM.render(<App />, document.body);
    }

    async init() {
        await this.selectors();
        console.log(this.item);
    }

    async selectors() {
        this.item = await waitForEl(
            ".summary-cart-template-holder .cart-items"
        );
    }
}
