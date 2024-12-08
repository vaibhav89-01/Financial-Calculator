"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, PiggyBank, Landmark } from 'lucide-react'
import YearWiseStackedChart from "./year-wise-stacked-chart"

interface CalculationResult {
  totalInvestment: number
  totalReturns: number
  yearWiseData: { year: string; investment: number; returns: number }[]
}

export default function FinancialCalculators() {
  const [sipResult, setSipResult] = useState<CalculationResult | null>(null)
  const [mfResult, setMfResult] = useState<CalculationResult | null>(null)
  const [fdResult, setFdResult] = useState<CalculationResult | null>(null)

  const calculateSIP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const investment = Number(formData.get("sipInvestment"))
    const rate = Number(formData.get("sipRate")) / 100 / 12
    const years = Number(formData.get("sipYears"))
    const months = years * 12

    let totalInvestment = 0
    let futureValue = 0
    const yearWiseData = []

    for (let i = 1; i <= months; i++) {
      totalInvestment += investment
      futureValue = (futureValue + investment) * (1 + rate)

      if (i % 12 === 0) {
        yearWiseData.push({
          year: `${i / 12}Y`,
          investment: Number((totalInvestment / 100000).toFixed(2)),
          returns: Number(((futureValue - totalInvestment) / 100000).toFixed(2))
        })
      }
    }

    const totalReturns = futureValue - totalInvestment

    setSipResult({
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
      yearWiseData
    })
  }

  const calculateMF = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const investment = Number(formData.get("mfInvestment"))
    const rate = Number(formData.get("mfRate")) / 100
    const years = Number(formData.get("mfYears"))

    const yearWiseData = []
    for (let i = 1; i <= years; i++) {
      const value = investment * Math.pow(1 + rate, i)
      yearWiseData.push({
        year: `${i}Y`,
        investment: Number((investment / 100000).toFixed(2)),
        returns: Number(((value - investment) / 100000).toFixed(2))
      })
    }

    const totalReturns = yearWiseData[years - 1].returns * 100000

    setMfResult({
      totalInvestment: investment,
      totalReturns: Math.round(totalReturns),
      yearWiseData
    })
  }

  const calculateFD = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const principal = Number(formData.get("fdPrincipal"))
    const rate = Number(formData.get("fdRate")) / 100
    const years = Number(formData.get("fdYears"))

    const yearWiseData = []
    for (let i = 1; i <= years; i++) {
      const value = principal * Math.pow(1 + rate, i)
      yearWiseData.push({
        year: `${i}Y`,
        investment: Number((principal / 100000).toFixed(2)),
        returns: Number(((value - principal) / 100000).toFixed(2))
      })
    }

    const totalReturns = yearWiseData[years - 1].returns * 100000

    setFdResult({
      totalInvestment: principal,
      totalReturns: Math.round(totalReturns),
      yearWiseData
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">
          Financial Calculators
        </h1>
        <Card className="w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
            <CardTitle className="text-2xl">Investment Tools</CardTitle>
            <CardDescription className="text-gray-100">
              Calculate returns for different investment options
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="sip" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 gap-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <TabsTrigger value="sip" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-md">
                  <div className="flex flex-col items-center py-2 space-y-1">
                    <Calculator className="h-5 w-5" />
                    <span>SIP</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="mf" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-md">
                  <div className="flex flex-col items-center py-2 space-y-1">
                    <PiggyBank className="h-5 w-5" />
                    <span>Mutual Fund</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="fd" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-md">
                  <div className="flex flex-col items-center py-2 space-y-1">
                    <Landmark className="h-5 w-5" />
                    <span>Fixed Deposit</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="sip">
                <Card>
                  <CardHeader>
                    <CardTitle>SIP Calculator</CardTitle>
                    <CardDescription>Calculate your Systematic Investment Plan returns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={calculateSIP} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sipInvestment">Monthly Investment (₹)</Label>
                          <Input id="sipInvestment" name="sipInvestment" type="number" required className="dark:bg-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sipRate">Expected Annual Return Rate (%)</Label>
                          <Input id="sipRate" name="sipRate" type="number" step="0.1" required className="dark:bg-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sipYears">Investment Period (Years)</Label>
                          <Input id="sipYears" name="sipYears" type="number" required className="dark:bg-gray-700" />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        Calculate SIP
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                {sipResult && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>SIP Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                          <p className="text-sm opacity-80">Total Investment</p>
                          <p className="text-3xl font-bold">₹{sipResult.totalInvestment.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white">
                          <p className="text-sm opacity-80">Total Returns</p>
                          <p className="text-3xl font-bold">₹{sipResult.totalReturns.toLocaleString()}</p>
                        </div>
                      </div>
                      <YearWiseStackedChart data={sipResult.yearWiseData} />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="mf">
                <Card>
                  <CardHeader>
                    <CardTitle>Mutual Fund Calculator</CardTitle>
                    <CardDescription>Calculate your Mutual Fund investment returns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={calculateMF} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mfInvestment">Initial Investment (₹)</Label>
                          <Input id="mfInvestment" name="mfInvestment" type="number" required className="dark:bg-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mfRate">Expected Annual Return Rate (%)</Label>
                          <Input id="mfRate" name="mfRate" type="number" step="0.1" required className="dark:bg-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mfYears">Investment Period (Years)</Label>
                          <Input id="mfYears" name="mfYears" type="number" required className="dark:bg-gray-700" />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        Calculate Mutual Fund
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                {mfResult && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Mutual Fund Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                          <p className="text-sm opacity-80">Total Investment</p>
                          <p className="text-3xl font-bold">₹{mfResult.totalInvestment.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white">
                          <p className="text-sm opacity-80">Total Returns</p>
                          <p className="text-3xl font-bold">₹{mfResult.totalReturns.toLocaleString()}</p>
                        </div>
                      </div>
                      <YearWiseStackedChart data={mfResult.yearWiseData} />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="fd">
                <Card>
                  <CardHeader>
                    <CardTitle>Fixed Deposit Calculator</CardTitle>
                    <CardDescription>Calculate your Fixed Deposit returns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={calculateFD} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fdPrincipal">Principal Amount (₹)</Label>
                          <Input id="fdPrincipal" name="fdPrincipal" type="number" required className="dark:bg-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fdRate">Interest Rate (%)</Label>
                          <Input id="fdRate" name="fdRate" type="number" step="0.1" required className="dark:bg-gray-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fdYears">Time Period (Years)</Label>
                          <Input id="fdYears" name="fdYears" type="number" required className="dark:bg-gray-700" />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        Calculate FD
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                {fdResult && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Fixed Deposit Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                          <p className="text-sm opacity-80">Total Investment</p>
                          <p className="text-3xl font-bold">₹{fdResult.totalInvestment.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white">
                          <p className="text-sm opacity-80">Total Returns</p>
                          <p className="text-3xl font-bold">₹{fdResult.totalReturns.toLocaleString()}</p>
                        </div>
                      </div>
                      <YearWiseStackedChart data={fdResult.yearWiseData} />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

