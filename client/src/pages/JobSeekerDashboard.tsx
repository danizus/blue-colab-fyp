import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { mockJobs, mockApplications } from '@/data/mockData';
import { JobSeekerProfile } from '@/types';
import { formatSalary, timeAgo, getStatusColor, capitalizeFirst } from '@/lib/utils';
import { 
  Briefcase, 
  Target, 
  TrendingUp, 
  Upload, 
  MapPin, 
  Clock,
  ArrowRight,
  Sparkles,
  FileText,
  Eye,
  Bell
} from 'lucide-react';

function MatchScoreRing({ score }: { score: number }) {
  const strokeDasharray = 251.2; // 2 * PI * 40
  const strokeDashoffset = strokeDasharray - (strokeDasharray * score) / 100;
  
  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-secondary"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeDasharray={175.9}
          strokeDashoffset={175.9 - (175.9 * score) / 100}
          className={`${score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-500`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
          {score}%
        </span>
      </div>
    </div>
  );
}

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const profile = user as JobSeekerProfile;
  
  const recommendedJobs = mockJobs.slice(0, 4);
  const recentApplications = mockApplications.slice(0, 3);

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {profile?.name?.split(' ')[0] || 'User'}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your job search
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/resume">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="hero">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Find Jobs
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Profile Score</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{profile?.profileCompleteness || 85}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <Progress value={profile?.profileCompleteness || 85} className="mt-4 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Applications</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{recentApplications.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">+2 this week</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Profile Views</p>
                    <p className="text-3xl font-bold text-foreground mt-1">47</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <p className="text-xs text-green-400 mt-4">↑ 12% from last week</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Job Matches</p>
                    <p className="text-3xl font-bold text-foreground mt-1">24</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">Based on your profile</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recommended Jobs */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Recommended Jobs
                </h2>
                <Link to="/jobs" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid gap-4">
                {recommendedJobs.map((job) => (
                  <Link key={job.id} to={`/jobs/${job.id}`}>
                    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                            <img 
                              src={job.companyLogo} 
                              alt={job.company} 
                              className="w-8 h-8 rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {job.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{job.company}</p>
                              </div>
                              <MatchScoreRing score={job.matchScore || 0} />
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {timeAgo(job.postedAt)}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {job.skills.slice(0, 4).map((skill) => (
                                <Badge 
                                  key={skill} 
                                  variant="outline" 
                                  className="bg-secondary/50 border-border text-muted-foreground text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills.length > 4 && (
                                <Badge variant="outline" className="bg-secondary/50 border-border text-muted-foreground text-xs">
                                  +{job.skills.length - 4}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm font-medium text-primary mt-3">
                              {formatSalary(job.salary.min, job.salary.max)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Completion */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Complete Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Profile completeness</span>
                      <span className="text-foreground font-medium">{profile?.profileCompleteness || 85}%</span>
                    </div>
                    <Progress value={profile?.profileCompleteness || 85} className="h-2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Basic info completed
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Skills added
                    </div>
                    <div className="flex items-center gap-2 text-yellow-400">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      Add work experience
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      Upload resume
                    </div>
                  </div>
                  <Link to="/profile">
                    <Button variant="outline" className="w-full">
                      Complete Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Applications */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Recent Applications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <img 
                          src={app.job.companyLogo} 
                          alt={app.job.company} 
                          className="w-6 h-6 rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {app.job.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{app.job.company}</p>
                      </div>
                      <Badge className={`${getStatusColor(app.status)} text-xs shrink-0`}>
                        {capitalizeFirst(app.status)}
                      </Badge>
                    </div>
                  ))}
                  <Link to="/applications">
                    <Button variant="ghost" className="w-full text-sm">
                      View All Applications
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* AI Assistant Promo */}
              <Card className="bg-gradient-to-br from-primary/20 to-blue-500/20 border-primary/30">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">AI Career Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized career advice, interview tips, and job search strategies.
                  </p>
                  <Button variant="hero" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
