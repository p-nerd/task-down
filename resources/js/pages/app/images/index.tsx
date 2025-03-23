import { AppLayout } from "@/components/layouts/app-layout";
import { Loading } from "@/components/screens/images/leading";
import { Timeline } from "@/components/screens/images/timeline";
import { Deferred, Head } from "@inertiajs/react";

const Images = () => {
    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Images" />
            <Deferred data={["images"]} fallback={<Loading />}>
                <Timeline />
            </Deferred>
        </AppLayout>
    );
};

export default Images;
