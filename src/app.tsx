import { Orby } from "../lib";

function App() {
    return (
        <div id="foo"></div>
    );
}

const container = document.getElementById("root");

Orby.render(<App />, container);
