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

        {/* Explanation Section */}
        <div className="space-y-4 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">How This Calculator Works</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">The Core Concept</h3>
              <p>
                This calculator treats each meal as having both a <strong className="text-foreground">money cost</strong> and a{" "}
                <strong className="text-foreground">time cost</strong>. To make the optimal decision, we compare the total cost
                (money + value of time) for both options.
              </p>
              <p>
                Eating out is mathematically better when the total cost of eating out is less than or equal to the total cost
                of cooking at home:
              </p>
              <div className="rounded-md bg-muted p-3 font-mono text-sm">
                C<sub>out</sub> + w × T<sub>out</sub> ≤ C<sub>home</sub> + w × T<sub>home</sub>
              </div>
              <p className="text-xs">
                Where w is your hourly wage, C is the money cost, and T is the time cost (in minutes, converted to hours).
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">The Break-Even Formula</h3>
              <p>
                The calculator solves for the <strong className="text-foreground">break-even price</strong> (C<sub>out</sub>*) you can pay
                to make eating out optimal:
              </p>
              <div className="rounded-md bg-muted p-3 font-mono text-sm">
                C<sub>out</sub>* = C<sub>home</sub> + w × (T<sub>home</sub> - T<sub>out</sub>) / 60
              </div>
              <p>
                If your actual eating out cost is less than or equal to this break-even price, eating out is the better choice.
                Otherwise, cooking at home is more optimal.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">Intuition & Sign Checks</h3>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  <strong className="text-foreground">If eating out saves time</strong> (T<sub>out</sub> &lt; T<sub>home</sub>):
                  The break-even price will be <em>higher</em> than your home cooking cost. The faster eating out is, and the
                  higher your wage, the more extra money you can afford to pay for the convenience.
                </li>
                <li>
                  <strong className="text-foreground">If eating out takes longer</strong> (T<sub>out</sub> &gt; T<sub>home</sub>):
                  The break-even price will be <em>lower</em> than your home cooking cost. Eating out must be cheaper to justify
                  the extra time spent.
                </li>
                <li>
                  <strong className="text-foreground">If times are equal</strong> (T<sub>out</sub> = T<sub>home</sub>): The decision
                  reduces to comparing money only—eat out if it costs less than cooking at home.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">Example</h3>
              <p>Let's say:</p>
              <ul className="ml-4 list-disc space-y-1 text-sm">
                <li>Cooking at home: $5 per meal, 60 minutes</li>
                <li>Eating out: 30 minutes (faster!)</li>
                <li>Your wage: $30/hour</li>
              </ul>
              <p className="text-sm">
                Break-even price = $5 + $30 × (60 - 30) / 60 = $5 + $15 = <strong className="text-foreground">$20</strong>
              </p>
              <p className="text-sm">
                So if you can eat out for $20 or less, eating out is optimal. The time saved is worth the extra cost!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
