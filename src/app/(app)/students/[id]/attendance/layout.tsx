import { MainLayout, MainLayoutHeader } from "@/components/primary-layout";
import { PropsWithChildren } from "react";

export default function AttdLayout(props: PropsWithChildren) {
    return <div className="">
        <MainLayout>
            <MainLayoutHeader title={"student attendance detail"} back backUrl={"/students"} />
            {props.children}
        </MainLayout>
    </div >
}
