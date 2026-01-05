import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, MapPin, Briefcase, Plus, X, Save } from 'lucide-react';
import { allSkills } from '@/data/mockData';
import { JobSeekerProfile } from '@/types';

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const profile = user as JobSeekerProfile;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(profile?.skills || []);
  const [formData, setFormData] = useState({
    name: profile?.name || '', email: profile?.email || '', title: profile?.title || '',
    location: profile?.location || '', bio: profile?.bio || '', experience: profile?.experience?.toString() || ''
  });

  const toggleSkill = (skill: string) => setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);

  const handleSave = () => {
    toast({ title: 'Profile Updated', description: 'Your changes have been saved.' });
    setIsEditing(false);
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="font-semibold">
              {isEditing ? <><Save className="w-4 h-4 mr-2" />Save Changes</> : 'Edit Profile'}
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-border">
                    <AvatarImage src={profile?.avatar} />
                    <AvatarFallback className="bg-foreground text-background text-2xl font-bold">{profile?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div><Label>Full Name</Label><Input className="bg-background border-border h-12 mt-1" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                          <div><Label>Job Title</Label><Input className="bg-background border-border h-12 mt-1" placeholder="e.g. Licensed Electrician" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div><Label>Email</Label><Input className="bg-background border-border h-12 mt-1" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                          <div><Label>Location</Label><Input className="bg-background border-border h-12 mt-1" placeholder="City, State" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-foreground">{profile?.name}</h2>
                        <p className="text-lg text-muted-foreground">{profile?.title}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profile?.location}</span>
                          <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{profile?.experience} years exp.</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader><CardTitle>About Me</CardTitle></CardHeader>
              <CardContent>
                {isEditing ? <Textarea className="bg-background border-border min-h-[120px]" placeholder="Write a short bio..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} /> : <p className="text-muted-foreground">{profile?.bio || 'No bio added yet.'}</p>}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader><CardTitle>Skills & Certifications</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? allSkills.slice(0, 20) : selectedSkills).map(skill => (
                    <Badge key={skill} variant={isEditing ? 'outline' : 'secondary'} className={isEditing ? `cursor-pointer ${selectedSkills.includes(skill) ? 'bg-foreground text-background' : 'bg-secondary'}` : ''} onClick={() => isEditing && toggleSkill(skill)}>{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader><CardTitle>Work Experience</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile?.workHistory?.map(work => (
                    <div key={work.id} className="border-l-2 border-border pl-4">
                      <h4 className="font-semibold text-foreground">{work.position}</h4>
                      <p className="text-sm text-muted-foreground">{work.company} • {work.location}</p>
                      <p className="text-xs text-muted-foreground">{work.startDate} - {work.current ? 'Present' : work.endDate}</p>
                      <p className="text-sm text-muted-foreground mt-2">{work.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
