"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";
import {  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";

const chartConfig = {
  un_bookmarked: {
    label: "Un-Bookmarked",
    color: "hsl(var(--chart-1))",
  },
  bookmarked: {
    label: "Bookmarked",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function RadialChartStack( chartData: any ) {
    const data = [{ un_bookmarked: chartData.chartData.un_bookmarked as number, bookmarked: chartData.chartData.bookmarked as number }]
    const totalVisitors = data[0].un_bookmarked + data[0].bookmarked

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Recipes</CardTitle>
                <CardDescription>Bookmarked Vs Un-Bookmarked</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[200px]" >
                    <RadialBarChart data={data} endAngle={180} innerRadius={80} outerRadius={130} >
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-foreground text-2xl font-bold" >
                                                {totalVisitors.toLocaleString()}
                                            </tspan>
                                            <tspan  x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground" >
                                                Recipes
                                            </tspan>
                                        </text>
                                    )
                                }
                            }} />
                        </PolarRadiusAxis>
                        <RadialBar dataKey="un_bookmarked" stackId="a" cornerRadius={5} fill="var(--color-un_bookmarked)"  className="stroke-transparent stroke-2" />
                        <RadialBar dataKey="bookmarked" stackId="a" cornerRadius={5} fill="var(--color-bookmarked)" className="stroke-transparent stroke-2" />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total bookmarked recipes
                </div>
            </CardFooter>
        </Card>
    )
}
