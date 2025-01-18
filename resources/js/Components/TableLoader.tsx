import { Skeleton } from "@/Components/ui/skeleton";
import { Card, CardContent } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"

export function TableLoader({ rows = 5, columns = 4, span = 3 }: { rows?: number; columns?: number, span?: number }) {
    return (
        <div className={`col-span-${span} min-h-100`}>
            <div className="grid grid-cols-1 gap-4">
                <Card className="col-span-1">
                    <CardContent className='p-2 flex justify-between'>
                        <Skeleton className="h-8 w-[385px]"/>
                        <Skeleton className="h-8 w-[85px]"/>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardContent className='p-0 flex items-center'>
                        <div className="w-full p-6">
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                <TableHeader>
                                    <TableRow>
                                    {Array.from({ length: columns }).map((_, index) => (
                                        <TableHead key={index}>
                                            <Skeleton className="h-6 w-full" />
                                        </TableHead>
                                    ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array.from({ length: rows }).map((_, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {Array.from({ length: columns }).map((_, colIndex) => (
                                        <TableCell key={colIndex}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        ))}
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </div>
                            <div className="flex justify-end items-center mt-4">
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-8" />
                                    <Skeleton className="h-8 w-8" />
                                    <Skeleton className="h-8 w-8" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
