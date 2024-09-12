import { PropsWithChildren } from "react";
export default function StudentLayout(props: PropsWithChildren) {
    return (
        <div className="mt-8">
            {props.children}
        </div>
    )
}
