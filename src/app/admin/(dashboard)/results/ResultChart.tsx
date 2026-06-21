"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

type ResultData = {
  candidateName: string
  candidateNumber: number
  votes: number
}

export function ResultChart({ data }: { data: ResultData[] }) {
  // Chart Config
  const chartConfig = {
    votes: {
      label: "Suara",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const handleExportCsv = () => {
    const header = "Nomor Urut,Nama Kandidat,Jumlah Suara\n"
    const rows = data.map(d => `${d.candidateNumber},"${d.candidateName}",${d.votes}`).join("\n")
    const csvContent = "data:text/csv;charset=utf-8," + header + rows
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "hasil_voting.csv")
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleExportCsv}>
          <Download className="w-4 h-4 mr-2" />
          Export Data CSV
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Perolehan Suara</CardTitle>
          <CardDescription>Diagram hasil perhitungan suara Pemilihan Raya secara real-time.</CardDescription>
        </CardHeader>
        <CardContent>
          {data.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="candidateName"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis allowDecimals={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="votes" fill="var(--color-votes)" radius={4} />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              Belum ada data kandidat atau voting.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
