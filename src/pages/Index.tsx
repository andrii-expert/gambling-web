
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Zap, Coins, Star, Users, Brain, Gift, User } from "lucide-react";
import ProblemGrid from "@/components/ProblemGrid";
import Leaderboard from "@/components/Leaderboard";
import PrizeShop from "@/components/PrizeShop";
import UserStats from "@/components/UserStats";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import UserProfile from "@/components/auth/UserProfile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  
  // Mock user data - in real app this would come from backend
  const userData = {
    username: "PuzzleMaster",
    level: 3,
    xp: 750,
    xpToNextLevel: 1000,
    credits: 2340,
    solvedProblems: 12,
    totalProblems: 50,
    rank: 10 // Updated to match XP-based ranking
  };

  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", email, password);
    setIsAuthenticated(true);
  };

  const handleSignup = (username: string, email: string, password: string) => {
    console.log("Signup attempt:", username, email, password);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("dashboard");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Riddle Riches
            </h1>
            <p className="text-slate-300">Solve puzzles, earn rewards, climb the rankings!</p>
          </div>
          
          {authView === "login" ? (
            <Login
              onSwitchToSignup={() => setAuthView("signup")}
              onLogin={handleLogin}
            />
          ) : (
            <Signup
              onSwitchToLogin={() => setAuthView("login")}
              onSignup={handleSignup}
            />
          )}
        </div>
      </div>
    );
  }

  const xpPercentage = (userData.xp / userData.xpToNextLevel) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Riddle Riches
          </h1>
          <p className="text-slate-300 mt-2">Solve puzzles, earn rewards, climb the rankings!</p>
        </div>

        {/* User Stats Bar */}
        <UserStats userData={userData} />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600">
              <Trophy className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="problems" className="data-[state=active]:bg-purple-600">
              <Brain className="w-4 h-4 mr-2" />
              Problems
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Rankings
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-purple-600">
              <Gift className="w-4 h-4 mr-2" />
              Prize Shop
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Level Progress */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center text-cyan-400">
                    <Star className="w-5 h-5 mr-2" />
                    Level Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Level {userData.level}</span>
                      <span className="text-slate-400">{userData.xp}/{userData.xpToNextLevel} XP</span>
                    </div>
                    <Progress value={xpPercentage} className="h-3" />
                    <p className="text-sm text-slate-400">
                      {userData.xpToNextLevel - userData.xp} XP to level {userData.level + 1}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Problem Progress */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-400">
                    <Brain className="w-5 h-5 mr-2" />
                    Problem Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Solved</span>
                      <span className="text-slate-400">{userData.solvedProblems}/{userData.totalProblems}</span>
                    </div>
                    <Progress value={(userData.solvedProblems / userData.totalProblems) * 100} className="h-3" />
                    <p className="text-sm text-slate-400">
                      {userData.totalProblems - userData.solvedProblems} problems remaining
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-400">
                    <Trophy className="w-5 h-5 mr-2" />
                    Your Rank
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">#{userData.rank}</div>
                    <p className="text-slate-400 mt-2">Global Ranking</p>
                    <Button className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                      View Full Rankings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mt-6 bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Solved Problem #23", reward: "+50 XP, +100 Credits", time: "2 hours ago" },
                    { action: "Reached Level 3", reward: "+200 Bonus Credits", time: "1 day ago" },
                    { action: "Solved Problem #22", reward: "+45 XP, +90 Credits", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-green-400">{activity.reward}</p>
                      </div>
                      <span className="text-sm text-slate-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="problems">
            <ProblemGrid />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="shop">
            <PrizeShop userCredits={userData.credits} />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile userData={userData} onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
