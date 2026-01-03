import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, MapPin, DollarSign, Clock, X, Plus, ArrowLeft } from 'lucide-react';
import { locations, allSkills, jobTypes } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function PostJobPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'full-time', salaryMin: '', salaryMax: '',
    experienceMin: '', experienceMax: '', description: '', responsibilities: '', requirements: '', benefits: ''
  });

  const toggleSkill = (skill: string) => setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    toast({ title: 'Job Posted!', description: 'Your job listing is now live.' });
    setIsLoading(false);
    navigate('/recruiter');
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/recruiter" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4" />Back to Dashboard</Link>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Post a New Job</CardTitle>
              <CardDescription>Fill in the details below to create your job listing</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g. Licensed Electrician" className="bg-background border-border h-12" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Your Company" className="bg-background border-border h-12" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select value={formData.location} onValueChange={v => setFormData({...formData, location: v})}>
                      <SelectTrigger className="bg-background border-border h-12"><MapPin className="w-4 h-4 mr-2 text-muted-foreground" /><SelectValue placeholder="Select location" /></SelectTrigger>
                      <SelectContent className="bg-card border-border">{locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v})}>
                      <SelectTrigger className="bg-background border-border h-12"><Briefcase className="w-4 h-4 mr-2 text-muted-foreground" /><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-card border-border">{jobTypes.map(type => <SelectItem key={type} value={type} className="capitalize">{type.replace('-', ' ')}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Salary Range (Annual)</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Min" type="number" className="bg-background border-border h-12" value={formData.salaryMin} onChange={e => setFormData({...formData, salaryMin: e.target.value})} />
                      <Input placeholder="Max" type="number" className="bg-background border-border h-12" value={formData.salaryMax} onChange={e => setFormData({...formData, salaryMax: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Experience (Years)</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Min" type="number" className="bg-background border-border h-12" value={formData.experienceMin} onChange={e => setFormData({...formData, experienceMin: e.target.value})} />
                      <Input placeholder="Max" type="number" className="bg-background border-border h-12" value={formData.experienceMax} onChange={e => setFormData({...formData, experienceMax: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Required Skills</Label>
                  <div className="flex flex-wrap gap-2">{allSkills.slice(0, 15).map(skill => <Badge key={skill} variant="outline" className={`cursor-pointer ${selectedSkills.includes(skill) ? 'bg-foreground text-background' : 'bg-secondary'}`} onClick={() => toggleSkill(skill)}>{skill}</Badge>)}</div>
                </div>
                <div className="space-y-2"><Label htmlFor="description">Job Description</Label><Textarea id="description" placeholder="Describe the role and what you're looking for..." className="bg-background border-border min-h-[120px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required /></div>
                <div className="space-y-2"><Label htmlFor="responsibilities">Responsibilities (one per line)</Label><Textarea id="responsibilities" placeholder="Install and maintain electrical systems..." className="bg-background border-border min-h-[100px]" value={formData.responsibilities} onChange={e => setFormData({...formData, responsibilities: e.target.value})} /></div>
                <div className="space-y-2"><Label htmlFor="requirements">Requirements (one per line)</Label><Textarea id="requirements" placeholder="Valid Journeyman license..." className="bg-background border-border min-h-[100px]" value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} /></div>
                <div className="space-y-2"><Label htmlFor="benefits">Benefits (one per line)</Label><Textarea id="benefits" placeholder="Health insurance, company vehicle..." className="bg-background border-border min-h-[100px]" value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} /></div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1 h-12 font-semibold" disabled={isLoading}>{isLoading ? 'Posting...' : 'Post Job'}</Button>
                  <Button type="button" variant="outline" className="h-12" onClick={() => navigate('/recruiter')}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
