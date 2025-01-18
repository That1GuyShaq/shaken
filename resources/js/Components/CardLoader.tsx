
import { Skeleton } from "@/Components/ui/skeleton";
import { Card, CardContent } from "@/Components/ui/card";

export function CardLoader({ cards = 5 }: { cards?: number }) {
    return (
        <div className="grid gap-4 grid-cols-2">
            <Card className="col-span-2">
                <CardContent className='p-2 flex justify-between'>
                    <Skeleton className="h-10 w-56"/>
                    <Skeleton className="h-10 w-20"/>
                </CardContent>
            </Card>

            {Array.from({ length: cards }).map((_, key) => (
                <Card key={key} className="col-span-2">
                    <CardContent className='p-2'>
                        <div className="flex justify-between">
                            <Skeleton className="h-4 mb-2 w-72"/>
                            <Skeleton className="h-4 mb-2 w-8"/>
                        </div>
                        <Skeleton className="h-10"/>
                        <div className="flex pt-2">
                            <Skeleton className="h-6 mb-2 w-12 me-2"/>
                            <Skeleton className="h-6 mb-2 w-12 me-2"/>
                            <Skeleton className="h-6 mb-2 w-12 me-2"/>
                            <Skeleton className="h-6 mb-2 w-12"/>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
