import { TrendingUp, Award, Clock, Target, Flame, BookOpen } from "lucide-react";
import { Card } from "./ui/card";

export function ProgressView() {
  const stats = [
    { icon: BookOpen, label: "Courses Enrolled", value: "12", color: "text-blue-500" },
    { icon: Award, label: "Courses Completed", value: "8", color: "text-green-500" },
    { icon: Clock, label: "Learning Hours", value: "156", color: "text-primary" },
    { icon: Flame, label: "Day Streak", value: "7", color: "text-orange-500" }
  ];

  const weeklyActivity = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.5 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 2 },
    { day: "Fri", hours: 4 },
    { day: "Sat", hours: 1 },
    { day: "Sun", hours: 2.5 }
  ];

  const achievements = [
    { id: "1", title: "First Course", description: "Complete your first course", earned: true },
    { id: "2", title: "Speed Learner", description: "Complete 3 courses in one month", earned: true },
    { id: "3", title: "Dedication", description: "Maintain a 7-day streak", earned: true },
    { id: "4", title: "Expert Path", description: "Complete 10 courses", earned: false },
    { id: "5", title: "Community Star", description: "Get 100 likes on your posts", earned: false },
    { id: "6", title: "Master Learner", description: "Spend 200 hours learning", earned: false }
  ];

  const skillProgress = [
    { skill: "React Development", level: 85, courses: 3 },
    { skill: "UI/UX Design", level: 65, courses: 2 },
    { skill: "Python", level: 90, courses: 2 },
    { skill: "Machine Learning", level: 40, courses: 1 }
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h1>Your Progress</h1>
        </div>
        <p className="text-muted-foreground">
          Track your learning journey and achievements
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card rounded-lg border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className="text-3xl mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Weekly Activity */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h2 className="mb-6">Weekly Activity</h2>
        <div className="flex items-end justify-between gap-4 h-48">
          {weeklyActivity.map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="flex-1 w-full flex items-end">
                <div 
                  className="w-full bg-primary rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group"
                  style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: "4px" }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.hours}h
                  </div>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Progress */}
        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
          <h2 className="mb-4">Skills Progress</h2>
          <div className="space-y-4">
            {skillProgress.map((item) => (
              <div key={item.skill}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm">{item.skill}</p>
                  <span className="text-sm text-primary">{item.level}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.courses} courses</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
          <h2 className="mb-4">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-lg border p-3 text-center transition-all ${
                  achievement.earned
                    ? "bg-primary/10 border-primary"
                    : "bg-secondary border-border opacity-50"
                }`}
              >
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  achievement.earned ? "bg-primary" : "bg-muted"
                }`}>
                  <Award className={`w-6 h-6 ${
                    achievement.earned ? "text-primary-foreground" : "text-muted-foreground"
                  }`} />
                </div>
                <p className="text-sm mb-1">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h2 className="mb-4">Monthly Goals</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <p className="text-sm">Complete 2 courses</p>
              </div>
              <span className="text-sm text-primary">1/2</span>
            </div>
            <div className="bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "50%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <p className="text-sm">Study 40 hours</p>
              </div>
              <span className="text-sm text-primary">28/40</span>
            </div>
            <div className="bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "70%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <p className="text-sm">Share 5 posts</p>
              </div>
              <span className="text-sm text-primary">3/5</span>
            </div>
            <div className="bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
