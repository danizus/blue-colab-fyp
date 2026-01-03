import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { mockJobs, mockApplicants } from '@/data/mockData';
import { RecruiterProfile } from '@/types';
import { formatSalary, timeAgo, getStatusColor, capitalizeFirst } from '@/lib/utils';
import { 
  Briefcase, Users, TrendingUp, Plus, Eye, MapPin, Clock, Sparkles
} from 'lucide-react';

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const profile = user as RecruiterProfile;
  const myJobs = mockJobs.slice(0, 3);

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome, {profile?.name?.split(' ')[0] || 'Recruiter'}!
              </h1>
              <p className="text-muted-foreground mt-1">{profile?.company || 'Your Company'}</p>
            </div>
            <Link to="/recruiter/post-job">
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{myJobs.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applicants</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{mockApplicants.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Match Score</p>
                  <p className="text-3xl font-bold text-foreground mt-1">85%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="jobs">My Jobs</TabsTrigger>
              <TabsTrigger value="applicants">Top Applicants</TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-4">
              {myJobs.map(job => (
                <Card key={job.id} className="bg-card border-border hover:border-primary/50 transition-all">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{job.applicants} applicants</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(job.postedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-500/20 text-green-400">{job.applicants} new</Badge>
                      <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-1" />View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="applicants" className="space-y-4">
              {mockApplicants.map(applicant => (
                <Card key={applicant.id} className="bg-card border-border">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={applicant.user.avatar} alt={applicant.user.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <h3 className="font-semibold text-foreground">{applicant.user.name}</h3>
                        <p className="text-sm text-muted-foreground">{applicant.user.title}</p>
                        <p className="text-xs text-muted-foreground">Applied for: {applicant.job.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${applicant.matchScore >= 80 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        <Sparkles className="w-3 h-3 mr-1" />{applicant.matchScore}% Match
                      </Badge>
                      <Badge className={getStatusColor(applicant.status)}>{capitalizeFirst(applicant.status)}</Badge>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
