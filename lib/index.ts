import { OrbyDOM } from "./dom";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [key: string]: any;
        }
        interface ElementClass {
            render: any;
        }
    }
}

export const Orby = {
    createElement: OrbyDOM.createElement,
    render: OrbyDOM.render,
};

// const element = Orby.createElement(
    // "div",
    // { id: "foo" },
    // Orby.createElement("p", null, "lorem ipsum"),
    // Orby.createElement("b"),
// );
// const container = document.getElementById("root");

// Orby.render(element, container);
