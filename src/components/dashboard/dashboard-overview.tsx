"use client"

import { useQuery } from "@tanstack/react-query"
import { getDashboardStats, getDashboardCharts } from "@/lib/dashboard-stats-actions"
import { StatsCard } from "./stats/stats-card"
import { BarChart } from "./stats/bar-chart"
import { LineChart } from "./stats/line-chart"
import { PieChart } from "./stats/pie-chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Car, Star, MessageSquare, Phone, Calendar, TrendingUp, Clock, Award } from "lucide-react"

export function DashboardOverview() {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    refetchInterval: 300000, // 5 minutes
  })

  const { data: charts, isLoading: isLoadingCharts } = useQuery({
    queryKey: ["dashboardCharts"],
    queryFn: getDashboardCharts,
    refetchInterval: 300000, // 5 minutes
  })

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoadingStats ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Cars"
              value={stats?.totalCars || 0}
              description={`${stats?.activeCars || 0} active listings`}
              icon={Car}
            />
            <StatsCard
              title="Average Rating"
              value={stats ? `${stats.averageRating.toFixed(1)}/5` : "0/5"}
              description={`From ${stats?.totalReviews || 0} reviews`}
              icon={Star}
            />
            <StatsCard
              title="Unread Messages"
              value={stats?.unreadMessages || 0}
              description={`${stats?.totalMessages || 0} total messages`}
              icon={MessageSquare}
            />
            <StatsCard
              title="Pending Callbacks"
              value={stats?.pendingCallbacks || 0}
              description={`${stats?.totalCallbacks || 0} total callbacks`}
              icon={Phone}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoadingStats ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <StatsCard
              title="Upcoming Test Drives"
              value={stats?.upcomingTestDrives || 0}
              description={`${stats?.totalTestDrives || 0} total test drives`}
              icon={Calendar}
            />
            <StatsCard
              title="Featured Cars"
              value={stats?.featuredCars || 0}
              description={`${(((stats?.featuredCars || 0) / (stats?.totalCars || 1)) * 100).toFixed(0)}% of total inventory`}
              icon={Award}
            />
            <StatsCard
              title="Pending Reviews"
              value={stats?.pendingReviews || 0}
              description={`${stats?.totalReviews || 0} total reviews`}
              icon={Clock}
            />
            <StatsCard
              title="Conversion Rate"
              value="4.2%"
              description="Based on test drives to sales"
              icon={TrendingUp}
              trend={{ value: 1.2, isPositive: true }}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoadingCharts ? (
          <>
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </>
        ) : (
          <>
            <LineChart title="Inquiries Over Time" description="Last 7 days" data={charts?.inquiriesByDay || []} />
            <LineChart title="Test Drives Over Time" description="Last 7 days" data={charts?.testDrivesByDay || []} />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoadingCharts ? (
          <>
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </>
        ) : (
          <>
            <BarChart
              title="Cars by Make"
              description="Top car manufacturers in inventory"
              data={charts?.carsByMake || []}
            />
            <PieChart
              title="Cars by Category"
              description="Distribution across categories"
              data={charts?.carsByCategory || []}
            />
          </>
        )}
      </div>
    </div>
  )
}

