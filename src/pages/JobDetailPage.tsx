import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockJobs, mockJobSeeker } from '@/data/mockData';
import { formatSalary, formatDate } from '@/lib/utils';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign,
  Building2,
  Users,
  Calendar,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Sparkles,
  ExternalLink,
  Share2,
  Bookmark
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function JobDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [hasApplied, setHasApplied] = useState(false);
  
  const job = mockJobs.find(j => j.id === id);
  const userSkills = mockJobSeeker.skills;

  if (!job) {
    return (
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Job Not Found</h1>
            <p className="text-muted-foreground mb-4">This job posting may have been removed or expired.</p>
            <Link to="/jobs">
              <Button variant="hero">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const matchedSkills = job.skills.filter(skill => userSkills.includes(skill));
  const missingSkills = job.skills.filter(skill => !userSkills.includes(skill));
  const matchScore = job.matchScore || Math.round((matchedSkills.length / job.skills.length) * 100);

  const handleApply = () => {
    setHasApplied(true);
    toast({
      title: 'Application Submitted!',
      description: `Your application for ${job.title} at ${job.company} has been sent.`,
    });
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to="/jobs" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card className="bg-card border-border overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-blue-400" />
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      <img 
                        src={job.companyLogo} 
                        alt={job.company} 
                        className="w-12 h-12 rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
                          <p className="text-lg text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge 
                          className={`shrink-0 px-4 py-2 text-base font-bold ${
                            matchScore >= 80 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                              : matchScore >= 60 
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          {matchScore}% Match
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.type.replace('-', ' ')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.experience.min}-{job.experience.max} years
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {job.applicants} applicants
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-4">
                        <Button 
                          variant="hero" 
                          size="lg" 
                          onClick={handleApply}
                          disabled={hasApplied}
                        >
                          {hasApplied ? 'Applied' : 'Apply Now'}
                        </Button>
                        <Button variant="outline" size="lg">
                          <Bookmark className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="ghost" size="lg">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>About This Role</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Responsibilities</h3>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {job.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-1 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Job Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Salary</p>
                      <p className="font-semibold text-foreground">
                        {formatSalary(job.salary.min, job.salary.max)}
                      </p>
                    </div>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Job Type</p>
                      <p className="font-semibold text-foreground capitalize">{job.type.replace('-', ' ')}</p>
                    </div>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-semibold text-foreground">{job.experience.min}-{job.experience.max} years</p>
                    </div>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Posted</p>
                      <p className="font-semibold text-foreground">{formatDate(job.postedAt)}</p>
                    </div>
                  </div>
                  {job.deadline && (
                    <>
                      <Separator className="bg-border" />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className="font-semibold text-foreground">{formatDate(job.deadline)}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* AI Skill Gap Analysis */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Skill Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-foreground">Matched Skills ({matchedSkills.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchedSkills.map(skill => (
                        <Badge 
                          key={skill} 
                          className="bg-green-500/20 text-green-400 border-green-500/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {matchedSkills.length === 0 && (
                        <span className="text-sm text-muted-foreground">No matched skills</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-foreground">Skills to Develop ({missingSkills.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {missingSkills.map(skill => (
                        <Badge 
                          key={skill} 
                          className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {missingSkills.length === 0 && (
                        <span className="text-sm text-muted-foreground">You have all required skills!</span>
                      )}
                    </div>
                  </div>

                  {missingSkills.length > 0 && (
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <Sparkles className="w-4 h-4 text-primary inline mr-1" />
                        <strong className="text-foreground">AI Tip:</strong> Consider learning {missingSkills[0]} to boost your match score for this role.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    About {job.company}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={job.companyLogo} 
                      alt={job.company}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{job.company}</p>
                      <p className="text-sm text-muted-foreground">Technology Company</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A leading technology company focused on innovation and delivering exceptional solutions.
                  </p>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Company Profile
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
