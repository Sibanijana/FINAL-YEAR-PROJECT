import {
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  Bell,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  const upcomingClasses = [
    {
      subject: "Mathematics",
      time: "09:00 - 10:30",
      room: "A-101",
      instructor: "Dr. Smith",
      type: "Lecture",
    },
    {
      subject: "Physics Lab",
      time: "14:00 - 16:00",
      room: "Lab-B",
      instructor: "Prof. Johnson",
      type: "Practical",
    },
    {
      subject: "Chemistry",
      time: "16:30 - 18:00",
      room: "C-301",
      instructor: "Dr. Brown",
      type: "Lecture",
    },
  ];

  const assignments = [
    {
      subject: "Mathematics",
      title: "Calculus Problem Set",
      dueDate: "Tomorrow",
      progress: 75,
      urgent: true,
    },
    {
      subject: "Physics",
      title: "Lab Report - Motion",
      dueDate: "3 days",
      progress: 45,
      urgent: false,
    },
    {
      subject: "Chemistry",
      title: "Organic Compounds Essay",
      dueDate: "1 week",
      progress: 20,
      urgent: false,
    },
  ];

  const grades = [
    { subject: "Mathematics", grade: "A", percentage: 92, trend: "up" },
    { subject: "Physics", grade: "B+", percentage: 87, trend: "up" },
    { subject: "Chemistry", grade: "A-", percentage: 89, trend: "stable" },
    { subject: "Biology", grade: "A", percentage: 94, trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Student Dashboard
              </h1>
              <p className="text-slate-600">Track your academic progress</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Calendar className="h-4 w-4" />
                View Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Today's Classes
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">3</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Overall GPA
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">3.9</p>
                </div>
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Assignments Due
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">3</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Attendance
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">96%</p>
                </div>
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2 border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Classes
              </CardTitle>
              <CardDescription>Your schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((class_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">
                          {class_.subject}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-700 hover:bg-purple-100"
                        >
                          {class_.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">
                        {class_.time} • Room {class_.room}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Instructor: {class_.instructor}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Join Class
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Grades */}
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Current Grades
              </CardTitle>
              <CardDescription>Your academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {grades.map((grade, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-slate-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-900">
                        {grade.subject}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 hover:bg-green-100"
                      >
                        {grade.grade}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={grade.percentage} className="flex-1" />
                      <span className="text-sm text-slate-600 min-w-[3rem]">
                        {grade.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Section */}
        <Card className="mt-8 border-0 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Assignments
            </CardTitle>
            <CardDescription>Track your assignment progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-slate-200 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {assignment.subject}
                      </p>
                    </div>
                    {assignment.urgent && (
                      <Badge variant="destructive">Urgent</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Due: {assignment.dueDate}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium">
                        {assignment.progress}%
                      </span>
                    </div>
                    <Progress value={assignment.progress} />
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Continue Working
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
