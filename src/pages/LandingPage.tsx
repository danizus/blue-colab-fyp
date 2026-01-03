import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Wrench, 
  Target, 
  Zap, 
  Users, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Building2,
  FileText,
  MessageSquare,
  Hammer,
  HardHat
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

const features = [
  {
    icon: Target,
    title: 'Smart Job Matching',
    description: 'Get matched with jobs that fit your skills, certifications, and experience level.'
  },
  {
    icon: Zap,
    title: 'Quick Apply',
    description: 'Apply to multiple jobs in minutes with your saved profile and resume.'
  },
  {
    icon: FileText,
    title: 'Resume Insights',
    description: 'Upload your resume and get feedback to improve your chances of getting hired.'
  },
  {
    icon: MessageSquare,
    title: 'Career Assistant',
    description: 'Get tips on certifications, salary negotiation, and career advancement.'
  }
];

const stats = [
  { value: '15K+', label: 'Trade Jobs' },
  { value: '500K+', label: 'Workers' },
  { value: '5K+', label: 'Employers' },
  { value: '92%', label: 'Match Rate' }
];

const trades = [
  'Electricians', 'Plumbers', 'Welders', 'HVAC Techs', 'Carpenters', 'Heavy Equipment'
];

export default function LandingPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-sm border-border bg-secondary text-foreground font-medium"
            >
              <HardHat className="w-4 h-4 mr-2" />
              Built for Skilled Tradespeople
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
              Find Your Next{' '}
              <span className="underline decoration-4 underline-offset-8">
                Trade Job
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Blue Colab connects electricians, plumbers, welders, and other skilled workers 
              with employers who value your craft.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto text-base font-semibold px-8 py-6">
                  Start Your Search
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold px-8 py-6">
                  Browse Jobs
                </Button>
              </Link>
            </div>

            {/* Trades */}
            <div className="flex flex-wrap justify-center gap-3 pt-8">
              {trades.map((trade) => (
                <Badge 
                  key={trade} 
                  variant="secondary"
                  className="px-4 py-2 text-sm font-medium"
                >
                  {trade}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Get Hired
            </h2>
            <p className="text-muted-foreground">
              Tools designed specifically for tradespeople looking for their next opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card 
                key={feature.title} 
                className="bg-background border-border hover:border-foreground/20 transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Started in 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                icon: FileText,
                title: 'Create Your Profile',
                description: 'Add your skills, certifications, and work experience to get matched with the right jobs.'
              },
              {
                step: '02',
                icon: Target,
                title: 'Get Matched',
                description: 'Our system finds jobs that fit your qualifications and shows you how well you match.'
              },
              {
                step: '03',
                icon: TrendingUp,
                title: 'Land the Job',
                description: 'Apply with one click and get hired by employers who value skilled workers.'
              }
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-foreground flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-background" />
                  </div>
                  <div className="text-sm font-bold text-muted-foreground">Step {item.step}</div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Workers & Employers */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Workers */}
            <Card className="bg-background border-border">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Hammer className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">For Workers</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Find jobs that match your skills and certifications',
                    'See how well you match before applying',
                    'Get resume tips tailored to the trades',
                    'Track all your applications in one place',
                    'Access career guidance and salary info'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/signup?role=jobseeker">
                  <Button className="w-full mt-4 font-semibold">
                    Create Free Account
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Employers */}
            <Card className="bg-background border-border">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">For Employers</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Post jobs and reach thousands of skilled workers',
                    'See candidates ranked by skill match',
                    'Filter by certifications and experience',
                    'Review detailed worker profiles',
                    'Hire faster with streamlined workflows'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/signup?role=recruiter">
                  <Button className="w-full mt-4 font-semibold">
                    Start Hiring Today
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Find Your Next Job?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of skilled tradespeople who have found work through Blue Colab.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="font-semibold px-8">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
