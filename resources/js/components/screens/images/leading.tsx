import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto flex max-w-5xl flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-32" />
                </div>

                <div className="space-y-10">
                    {[1, 2].map((group) => (
                        <div key={group} className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-5" />
                                <Skeleton className="h-8 w-48" />
                            </div>
                            <Skeleton className="h-px w-full" />
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-background overflow-hidden rounded-lg border"
                                    >
                                        <Skeleton className="aspect-square w-full" />
                                        <div className="space-y-2 p-3">
                                            <Skeleton className="h-5 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
