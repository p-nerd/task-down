import type { TImage } from "@/types/models";

import { AppLayout } from "@/components/layouts/app-layout";
import { Loading, Timeline } from "@/components/screens/images/timeline2";
import { Deferred, Head } from "@inertiajs/react";

const Images = ({ images }: { images: TImage[] }) => {
    return (
        <AppLayout className="flex h-full w-full flex-col">
            <Head title="Images" />
            <div className="container mx-auto px-4 pt-8">
                <div className="mx-auto flex max-w-5xl flex-col space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Your Images from Notes & Todos</h1>
                    </div>
                    <Deferred data={["images"]} fallback={<Loading />}>
                        <Timeline images={images} />
                    </Deferred>
                </div>
            </div>
        </AppLayout>
    );
};

export default Images;
