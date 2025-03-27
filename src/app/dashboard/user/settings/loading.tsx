import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="grid gap-6 max-w-6xl mx-auto">
            <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* Tabs */}
            <Skeleton className="h-10 w-full" />

            {/* Content */}
            <Skeleton className="h-[600px] w-full" />
        </div>
    );
}
