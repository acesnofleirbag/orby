import { OrbyDOM } from "./dom";
import { OrbyFiber } from "./types";

export function execUnitOfWork(fiber: OrbyFiber) {
    if (!fiber.dom) {
        fiber.dom = OrbyDOM.createDOM(fiber);
    }

    if (fiber.parent) {
        // SAFE: we checked for nullable DOM on previous if statement
        fiber.parent.dom!.appendChild(fiber.dom);
    }

    const elements = fiber.props.children;
    let prevSibling: OrbyFiber | null = null;

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        const newFiber: OrbyFiber = {
            parent: fiber,
            type: element.type,
            props: element.props,
            dom: null,
            child: null,
            sibling: null,
        };

        if (i === 0) {
            fiber.child = newFiber;
        } else {
            // SAFE: prevSibling is not null because the first child on array is assigned to prevSibling
            prevSibling!.sibling = newFiber;
        }

        prevSibling = newFiber;
    }

    if (fiber.child) {
        return fiber.child;
    }

    let nextFiber: OrbyFiber | null = fiber;

    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }

        nextFiber = nextFiber.parent;
    }

    return null;
}
