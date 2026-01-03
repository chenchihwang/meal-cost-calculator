"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CostCalculator() {
  const [cHome, setCHome] = useState<string>("")
  const [cOut, setCOut] = useState<string>("")
  const [tHome, setTHome] = useState<string>("")
  const [tOut, setTOut] = useState<string>("")
  const [wage, setWage] = useState<string>("")

  // Calculate break-even C_out*
  // Formula: C_out* = C_home + (T_home - T_out) * w
  // Times are in minutes, so convert to hours by dividing by 60
  const calculateBreakEven = () => {
    const cHomeNum = Number.parseFloat(cHome)
    const tHomeNum = Number.parseFloat(tHome)
    const tOutNum = Number.parseFloat(tOut)
    const wageNum = Number.parseFloat(wage)

    if (isNaN(cHomeNum) || isNaN(tHomeNum) || isNaN(tOutNum) || isNaN(wageNum)) {
      return null
    }

    // Convert minutes to hours: (minutes / 60) * wage
    return cHomeNum + ((tHomeNum - tOutNum) / 60) * wageNum
  }

  const breakEvenCost = calculateBreakEven()

  // Determine recommendation
  const getRecommendation = () => {
    const cOutNum = Number.parseFloat(cOut)

    if (breakEvenCost === null || isNaN(cOutNum)) {
      return null
    }

    // If actual C_out < break-even C_out*, eating out is cheaper
    return cOutNum < breakEvenCost ? "eat-out" : "cook"
  }

  const recommendation = getRecommendation()

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Eat Out or Cook at Home?
          </h1>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            Calculate the break-even point for your meal decisions
          </p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl">Cost Calculator</CardTitle>
            <CardDescription className="text-base">
              Enter your costs, time, and hourly wage to see which option makes more sense
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cost Inputs */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Cost Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="c-home" className="text-base">
                    Cost to Cook at Home ($)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="c-home"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={cHome}
                      onChange={(e) => setCHome(e.target.value)}
                      className="pl-7 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="c-out" className="text-base">
                    Cost to Eat Out ($)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="c-out"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={cOut}
                      onChange={(e) => setCOut(e.target.value)}
                      className="pl-7 text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Time Inputs */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Time Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="t-home" className="text-base">
                    Time to Cook at Home (minutes)
                  </Label>
                  <Input
                    id="t-home"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="0"
                    value={tHome}
                    onChange={(e) => setTHome(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t-out" className="text-base">
                    Time to Eat Out (minutes)
                  </Label>
                  <Input
                    id="t-out"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="0"
                    value={tOut}
                    onChange={(e) => setTOut(e.target.value)}
                    className="text-base"
                  />
                </div>
              </div>
            </div>

            {/* Wage Input */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Your Hourly Wage</h3>
              <div className="space-y-2">
                <Label htmlFor="wage" className="text-base">
                  Hourly Wage ($/hour)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="wage"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={wage}
                    onChange={(e) => setWage(e.target.value)}
                    className="pl-7 text-base"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            {breakEvenCost !== null && (
              <div className="space-y-4 rounded-lg border-2 bg-secondary/30 p-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Results</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground">Break-even cost:</span>
                    <span className="text-2xl font-bold text-foreground">${breakEvenCost.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is the maximum you should pay to eat out for it to be worthwhile
                  </p>
                </div>

                {recommendation && (
                  <div
                    className={`rounded-lg p-4 text-center ${
                      recommendation === "eat-out"
                        ? "bg-success text-success-foreground"
                        : "bg-destructive text-destructive-foreground"
                    }`}
                  >
                    <p className="text-lg font-bold">{recommendation === "eat-out" ? "✓ Eat Out" : "✗ Cook at Home"}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lorem Ipsum Section */}
        <div className="space-y-4 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">How This Calculator Works</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
