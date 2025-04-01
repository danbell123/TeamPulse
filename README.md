# 🟢 TeamPulse – Employee Feedback Dashboard

TeamPulse is a full-stack web application that enables employees to submit feedback through surveys, and empowers employers to visualize and analyze that feedback with dynamic data grids and interactive charts.

Built using **Next.js (App Router)**, **NextAuth**, **SurveyJS**, **AG Grid**, **AG Charts**, and **PostgreSQL**, the app offers a seamless experience for both employees and employers, with role-based access control.

## 🚀 Features

### 🎯 Core Functionality

- ✅ Role-based login for **employees** and **employers**
- ✅ Feedback survey powered by **SurveyJS**
- ✅ Dynamic, filterable feedback table using **AG Grid**
- ✅ Insightful data visualizations using **AG Charts**
- ✅ RESTful API built with **Next.js App Router**
- ✅ PostgreSQL backend hosted on Azure

### 🔍 Drill-Down Capabilities

- Filter feedback by **department**
- Drill into **individual submissions** or employees
- Analyze trends in satisfaction, workload, and manager rating over time

## 🛠️ Tech Stack

| Layer           | Tech                             |
|----------------|----------------------------------|
| Frontend       | Next.js (App Router) + TypeScript |
| Auth           | NextAuth.js                      |
| Survey System  | SurveyJS                         |
| Data Grid      | AG Grid                          |
| Charts         | AG Charts                        |
| Backend API    | Next.js API routes (App Router)  |
| Database       | PostgreSQL (hosted on Azure)     |
| Hosting        | Azure App Services               |

## 📁 Folder Structure (Draft)

```bash
team-pulse-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts        # NextAuth handler
│   │   ├── feedback/
│   │   │   └── route.ts                      # POST & GET feedback
│   │   └── stats/
│   │       ├── overview/route.ts             # Dept-level stats
│   │       ├── department/route.ts           # Drill-down by department
│   │       └── user/route.ts                 # Drill-down by user
│   ├── dashboard/
│   │   ├── layout.tsx                        # Dashboard layout with tabs
│   │   ├── page.tsx                          # Role-based redirect
│   │   ├── submit-feedback/
│   │   │   └── page.tsx                      # SurveyJS form (employee only)
│   │   ├── feedback-table/
│   │   │   └── page.tsx                      # AG Grid (employer only)
│   │   └── insights/
│   │       └── page.tsx                      # AG Charts (employer only)
│
├── components/
│   ├── SurveyForm.tsx                        # SurveyJS wrapper
│   ├── FeedbackGrid.tsx                      # AG Grid component
│   ├── InsightsCharts.tsx                    # AG Charts component
│   └── DashboardTabs.tsx                     # Role-aware dashboard tab navigation
│
├── lib/
│   ├── db.ts                                 # PostgreSQL connection
│   ├── feedback.ts                           # Feedback DB utilities
│   └── auth.ts                               # Session and role helpers
│
├── types/
│   └── index.ts                              # Global TypeScript types
│
├── middleware.ts                             # Route protection (role-based)
├── styles/
│   └── globals.css                           # App-wide styles
├── public/                                   # Static assets
├── .env.local                                # Environment variables
├── README.md
├── next.config.js
├── tsconfig.json
```
