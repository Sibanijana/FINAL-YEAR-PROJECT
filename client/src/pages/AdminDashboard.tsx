import { Calendar, Users, BookOpen, BarChart3, Settings, Bell, Plus, TrendingUp, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import NewRoutineForm from "@/components/NewRoutineForm";
import SavedRoutines from "@/components/SavedRoutines";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";

const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  const { isNewRoutineFormOpen, setNewRoutineFormOpen } = useUIStore();

  const stats = [
    { title: "Total Students", value: "1,247", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Active Staff", value: "89", change: "+3%", icon: BookOpen, color: "text-green-600" },
    { title: "Scheduled Classes", value: "156", change: "+8%", icon: Calendar, color: "text-purple-600" },
    { title: "System Usage", value: "94%", change: "+5%", icon: TrendingUp, color: "text-orange-600" },
  ];

  const recentActivities = [
    { action: "New routine published", time: "2 minutes ago", type: "success" },
    { action: "Staff meeting scheduled", time: "15 minutes ago", type: "info" },
    { action: "System maintenance alert", time: "1 hour ago", type: "warning" },
    { action: "Student enrollment updated", time: "2 hours ago", type: "success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
              <Button 
                size="sm" 
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => setNewRoutineFormOpen(true)}
              >
                <Plus className="h-4 w-4" />
                New Routine
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-full bg-slate-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="routines" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View Routines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <Card className="lg:col-span-2 border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Manage your system efficiently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all">
                      <Calendar className="h-6 w-6 text-blue-600" />
                      Manage Routines
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-green-50 hover:border-green-300 transition-all">
                      <Users className="h-6 w-6 text-green-600" />
                      User Management
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300 transition-all">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                      Course Setup
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-orange-50 hover:border-orange-300 transition-all">
                      <BarChart3 className="h-6 w-6 text-orange-600" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest system updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                          <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="routines">
            <SavedRoutines />
          </TabsContent>
        </Tabs>
      </div>

      <NewRoutineForm 
        open={isNewRoutineFormOpen}
        onOpenChange={setNewRoutineFormOpen}
      />
    </div>
  );
};

export default AdminDashboard;
