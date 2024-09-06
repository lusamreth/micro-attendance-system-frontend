import {
    MainLayout,
    MainLayoutContent,
    MainLayoutHeader,
} from "@/components/primary-layout"
import CameraContent from "./content"

export default function PaymentViewPage() {
    return (
        <MainLayout className="max-w-3xl">
            <MainLayoutHeader back title="Camera" backUrl="/cameras" />
            <MainLayoutContent>
                <CameraContent />
            </MainLayoutContent>
        </MainLayout>
    )
}
