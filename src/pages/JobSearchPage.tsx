import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { mockJobs, allSkills, locations, jobTypes } from '@/data/mockData';
import { formatSalary, timeAgo } from '@/lib/utils';
import { Search, MapPin, Briefcase, Clock, DollarSign, Filter, X, Target, Users } from 'lucide-react';

function MatchScoreBadge({ score }: { score: number }) {
  return (
    <Badge variant="outline" className="font-bold border-foreground/20 bg-secondary">
      <Target className="w-3 h-3 mr-1" />
      {score}% Match
    </Badge>
  );
}

export default function JobSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [experienceRange, setExperienceRange] = useState([0, 10]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('match');

  const filteredJobs = useMemo(() => {
    let jobs = [...mockJobs];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      jobs = jobs.filter(job => job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query) || job.skills.some(skill => skill.toLowerCase().includes(query)));
    }
    if (selectedLocation && selectedLocation !== 'all') jobs = jobs.filter(job => job.location === selectedLocation);
    if (selectedTypes.length > 0) jobs = jobs.filter(job => selectedTypes.includes(job.type));
    jobs = jobs.filter(job => job.salary.min >= salaryRange[0] && job.salary.max <= salaryRange[1]);
    jobs = jobs.filter(job => job.experience.min >= experienceRange[0] && job.experience.max <= experienceRange[1]);
    if (selectedSkills.length > 0) jobs = jobs.filter(job => selectedSkills.some(skill => job.skills.includes(skill)));
    if (sortBy === 'match') jobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    else if (sortBy === 'recent') jobs.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
    else if (sortBy === 'salary') jobs.sort((a, b) => b.salary.max - a.salary.max);
    return jobs;
  }, [searchQuery, selectedLocation, selectedTypes, salaryRange, experienceRange, selectedSkills, sortBy]);

  const toggleJobType = (type: string) => setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  const toggleSkill = (skill: string) => setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  const clearFilters = () => { setSearchQuery(''); setSelectedLocation('all'); setSelectedTypes([]); setSalaryRange([0, 100000]); setExperienceRange([0, 10]); setSelectedSkills([]); };
  const hasActiveFilters = searchQuery || selectedLocation !== 'all' || selectedTypes.length > 0 || salaryRange[0] > 0 || salaryRange[1] < 100000 || experienceRange[0] > 0 || experienceRange[1] < 10 || selectedSkills.length > 0;

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-3">Job Type</h4>
        <div className="space-y-2">
          {jobTypes.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={selectedTypes.includes(type)} onCheckedChange={() => toggleJobType(type)} />
              <span className="text-sm text-muted-foreground capitalize">{type.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-3">Salary Range</h4>
        <Slider value={salaryRange} onValueChange={setSalaryRange} min={0} max={100000} step={5000} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${(salaryRange[0] / 1000).toFixed(0)}k</span>
          <span>${(salaryRange[1] / 1000).toFixed(0)}k+</span>
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-3">Experience (years)</h4>
        <Slider value={experienceRange} onValueChange={setExperienceRange} min={0} max={10} step={1} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{experienceRange[0]} years</span>
          <span>{experienceRange[1]}+ years</span>
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {allSkills.slice(0, 12).map(skill => (
            <Badge key={skill} variant="outline" className={`cursor-pointer transition-colors ${selectedSkills.includes(skill) ? 'bg-foreground text-background border-foreground' : 'bg-secondary border-border text-muted-foreground hover:border-foreground/50'}`} onClick={() => toggleSkill(skill)}>{skill}</Badge>
          ))}
        </div>
      </div>
      {hasActiveFilters && <Button variant="ghost" className="w-full" onClick={clearFilters}><X className="w-4 h-4 mr-2" />Clear all filters</Button>}
    </div>
  );

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Find Trade Jobs</h1>
            <p className="text-muted-foreground">{filteredJobs.length} jobs matching your profile</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search jobs, trades, or skills..." className="pl-10 bg-background border-border h-12 focus:border-foreground" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-[200px] bg-background border-border h-12"><MapPin className="w-4 h-4 mr-2 text-muted-foreground" /><SelectValue placeholder="Location" /></SelectTrigger>
              <SelectContent className="bg-card border-border"><SelectItem value="all">All Locations</SelectItem>{locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] bg-background border-border h-12"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent className="bg-card border-border"><SelectItem value="match">Best Match</SelectItem><SelectItem value="recent">Most Recent</SelectItem><SelectItem value="salary">Highest Salary</SelectItem></SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild><Button variant="outline" className="md:hidden h-12"><Filter className="w-4 h-4 mr-2" />Filters</Button></SheetTrigger>
              <SheetContent className="bg-card border-border"><SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader><div className="mt-6"><FiltersContent /></div></SheetContent>
            </Sheet>
          </div>
          <div className="flex gap-8">
            <aside className="hidden md:block w-64 shrink-0">
              <Card className="bg-card border-border sticky top-24"><CardContent className="p-6"><h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Filter className="w-4 h-4" />Filters</h3><FiltersContent /></CardContent></Card>
            </aside>
            <div className="flex-1 space-y-6">
              {filteredJobs.length === 0 ? (
                <Card className="bg-card border-border"><CardContent className="p-12 text-center"><Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" /><h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3><p className="text-muted-foreground mb-4">Try adjusting your filters</p><Button variant="outline" onClick={clearFilters}>Clear filters</Button></CardContent></Card>
              ) : (
                filteredJobs.map(job => (
                  <Link key={job.id} to={`/jobs/${job.id}`}>
                    <Card className="bg-card border-border hover:border-foreground/30 transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                            <img src={job.companyLogo} alt={job.company} className="w-10 h-10 rounded-lg" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-semibold text-foreground group-hover:underline">{job.title}</h3>
                                <p className="text-muted-foreground">{job.company}</p>
                              </div>
                              <MatchScoreBadge score={job.matchScore || 0} />
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                              <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{job.type.replace('-', ' ')}</span>
                              <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{formatSalary(job.salary.min, job.salary.max)}</span>
                              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{timeAgo(job.postedAt)}</span>
                              <span className="flex items-center gap-1"><Users className="w-4 h-4" />{job.applicants} applicants</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{job.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {job.skills.slice(0, 5).map(skill => <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>)}
                              {job.skills.length > 5 && <Badge variant="secondary" className="text-xs">+{job.skills.length - 5}</Badge>}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
