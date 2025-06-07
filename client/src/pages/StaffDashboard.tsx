
import { Calendar, Clock, Users, BookOpen, FileText, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserProfile from "@/components/UserProfile";

const StaffDashboard = () => {
  const todayClasses = [
    { subject: "Mathematics", time: "09:00 - 10:30", room: "A-101", students: 45, status: "upcoming" },
    { subject: "Physics", time: "11:00 - 12:30", room: "B-205", students: 38, status: "ongoing" },
    { subject: "Chemistry", time: "14:00 - 15:30", room: "C-301", students: 42, status: "upcoming" },
    { subject: "Biology", time: "16:00 - 17:30", room: "D-102", students: 35, status: "upcoming" },
  ];

  const assignments = [
    { title: "Math Assignment #3", dueDate: "Today", submitted: 32, total: 45, urgent: true },
    { title: "Physics Lab Report", dueDate: "Tomorrow", submitted: 28, total: 38, urgent: false },
    { title: "Chemistry Quiz", dueDate: "Next Week", submitted: 40, total: 42, urgent: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Staff Dashboard</h1>
              <p className="text-slate-600">Manage your classes and students</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Messages
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <FileText className="h-4 w-4" />
                Create Assignment
              </Button>
              <UserProfile />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Today's Classes</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">4</p>
                </div>
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Students</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">160</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">12</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Messages</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">8</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayClasses.map((class_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{class_.subject}</h3>
                        <Badge variant={class_.status === 'ongoing' ? 'default' : 'secondary'} className={
                          class_.status === 'ongoing' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : ''
                        }>
                          {class_.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{class_.time} • Room {class_.room}</p>
                      <p className="text-xs text-slate-500 mt-1">{class_.students} students</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {class_.status === 'ongoing' ? 'Join' : 'View'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assignments */}
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Assignments
              </CardTitle>
              <CardDescription>Track student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment, index) => (
                  <div key={index} className="p-4 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">{assignment.title}</h3>
                      {assignment.urgent && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Due: {assignment.dueDate}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-slate-600">
                          {assignment.submitted}/{assignment.total} submitted
                        </span>
                      </div>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
