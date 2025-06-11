
'use client'
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full animate-fade-in">
        <CardContent className="text-center p-8">
          {/* Animated 404 */}
          <div className="mb-8">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-destructive mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8 space-y-2">
            <h2 className="text-2xl font-semibold">Oops! Page not found</h2>
            <p className="text-muted-foreground">
              The page you&#39;re looking for doesn&#39;t exist or has been moved.
            </p>
            <p className="text-sm text-muted-foreground/80">
              Attempted route: <code className="bg-muted px-1 rounded">{pathname}</code>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full hover-scale">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 hover-scale"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              
              <Link href="/admin" className="flex-1">
                <Button variant="outline" className="w-full hover-scale">
                  <Search className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
