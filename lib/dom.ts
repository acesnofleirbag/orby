import { execUnitOfWork } from "./scheduler";
import { ElementProps, ElementType, OrbyElement, OrbyFiber } from "./types";

let __FIBER__: OrbyFiber | null = null;

// NOTE: React implements your own scheduler
export function workLoop(deadline: IdleDeadline) {
    let shouldYield = false;

    while (__FIBER__ && !shouldYield) {
        __FIBER__ = execUnitOfWork(__FIBER__);
        shouldYield = deadline.timeRemaining() < 1;
    }

    requestIdleCallback(workLoop);
}

export class OrbyDOM {
    static createTextElement(text: string): OrbyElement {
        return {
            type: "TEXT_ELEMENT",
            props: {
                nodeValue: text,
                children: [],
            },
        };
    }

    static createElement(type: ElementType | string, props?: ElementProps, ...children: (OrbyElement | string)[]) {
        return {
            type,
            props: {
                ...props,
                children: children.map((child) =>
                    typeof child === "object" ? child : OrbyDOM.createTextElement(child),
                ),
            },
        };
    }

    static render(element: OrbyElement, container: HTMLElement | Text) {
        __FIBER__ = {
            parent: null,
            dom: container,
            type: element.type,
            props: {
                children: [element],
            },
            child: null,
            sibling: null,
        };

        requestIdleCallback(workLoop);
    }

    static updateDOM(parent: HTMLElement, dom: HTMLElement | Text, isTextNode: boolean, props: ElementProps) {
        if (isTextNode) {
            return dom.nodeValue = props.nodeValue;
        }

        Object.keys(props)
            .filter((key) => key !== "children")
            .forEach((name) => (dom as HTMLElement).setAttribute(name, props[name]));

        props.children?.map((child) => OrbyDOM.render(child, dom));

        if (parent) {
            parent.appendChild(dom);
        }
    }

    static createDOM(fiber: OrbyFiber) {
        const isTextNode = fiber.type === "TEXT_ELEMENT";

        const dom = isTextNode ? document.createTextNode("") : document.createElement(fiber.type);

        OrbyDOM.updateDOM(fiber.dom as HTMLElement, dom, isTextNode, fiber.props);

        return dom;
    }
}
