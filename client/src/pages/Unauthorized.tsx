
import { Shield, ArrowLeft, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg border-0 bg-white/60 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 p-4 rounded-full bg-red-100">
            <Shield className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Access Denied</CardTitle>
          <CardDescription className="text-lg">
            You don't have permission to access this resource
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Why am I seeing this?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              This area of the routine management system requires special permissions. 
              Please contact your administrator if you believe you should have access to this section.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline" 
              className="flex-1 gap-2 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            
            <Button 
              onClick={() => navigate('/')} 
              className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-3">
              Need help? Contact your system administrator
            </p>
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
              <Mail className="h-4 w-4" />
              admin@routinemanagement.com
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
