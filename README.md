# Eat Out or Cook? - Cost Calculator

A web application that helps you decide whether it's more mathematically optimal to eat out or cook at home based on both money and time costs.

## About

This project was born from a simple curiosity: **"How much do you need to earn and how cheap does the food you eat when you do eat out need to be for it to be more mathematically optimal of your time to eat out vs cook for yourself?"**

The calculator treats each meal as having both a **money cost** and a **time cost**, then compares the total cost (money + value of time) for both options to provide a data-driven recommendation.

## Features

- **Break-even price calculation**: Determines the maximum price you should pay to eat out for it to be worthwhile
- **Real-time recommendations**: Instantly shows whether eating out or cooking at home is more optimal
- **Comprehensive cost accounting**: Accounts for groceries, commute costs, time spent cooking, shopping, and cleanup
- **Dark mode support**: Full dark mode integration for comfortable viewing
- **Responsive design**: Works seamlessly on desktop and mobile devices

## The Formula

The calculator uses the break-even formula:

```
C_out* = C_home + w × (T_home - T_out) / 60
```

Where:
- `C_out*` = Break-even price for eating out
- `C_home` = Cost to cook at home (groceries + transportation)
- `w` = Your hourly wage
- `T_home` = Time to cook at home (in minutes)
- `T_out` = Time to eat out (in minutes)

Eating out is optimal when: `C_out ≤ C_out*`

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16 (App Router)
- **Language**: TypeScript
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eat-out-vs-cook
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Cost to Cook at Home**: Enter the total cost including groceries and any transportation/delivery fees
2. **Cost to Eat Out**: Enter the total cost including meal price, tax, tip, and commute costs
3. **Time to Cook at Home**: Enter total time in minutes (cooking + grocery shopping + cleanup)
4. **Time to Eat Out**: Enter total time in minutes (restaurant time + commute to/from)
5. **Hourly Wage**: Enter your hourly wage rate (for salaried workers, divide annual salary by hours worked per year)

The calculator will automatically compute the break-even price and provide a recommendation.

## Important Notes

### Model Limitations

- This calculator assumes your time would be better spent working to earn money. However, this may not apply to:
  - Salaried workers with fixed hours (working more doesn't increase income)
  - People with excess free time available for cooking
- The calculator is a **heuristic tool** meant for quick decision-making, not a comprehensive life optimization calculator

### Factors Not Accounted For

- Time spent learning new recipes
- Cost of cooking materials (oil, spices, condiments) used across multiple meals
- Decision fatigue from choosing what to cook
- Nutritional value differences
- Utility and enjoyment derived from either activity

## Future Additions

Planned features:
- **Automated meal cost estimation**: Use AI to reference recipes online and check average grocery store prices based on user location
- **Automatic tax and tip calculation**: Automatically account for state-specific tax rates and time-based tip suggestions using location data

Have a bright idea? Send suggestions to [chentreehwang@gmail.com](mailto:chentreehwang@gmail.com)

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js)
