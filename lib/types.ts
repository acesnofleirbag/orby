export type ElementType = string;

export type ElementProps = {
    [key: string]: any;
    children?: OrbyElement[];
};

export type OrbyElement = {
    type: ElementType;
    props: ElementProps;
};

export type OrbyFiber = {
    dom: HTMLElement | Text | null;
    type: ElementType;
    props: {
        children?: OrbyElement[];
    };
    child: OrbyFiber | null;
    sibling: OrbyFiber | null;
    parent: OrbyFiber | null;
};
