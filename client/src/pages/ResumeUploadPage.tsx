import { useState, useCallback } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Loader2,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeAnalysis {
  skills: string[];
  experience: {
    years: number;
    highlights: string[];
  };
  education: string[];
  strengths: string[];
  improvements: string[];
  overallScore: number;
}

export default function ResumeUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const { toast } = useToast();

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      analyzeResume(droppedFile);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      analyzeResume(selectedFile);
    }
  };

  const analyzeResume = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis result
    setAnalysis({
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker', 'Git', 'Agile'],
      experience: {
        years: 5,
        highlights: [
          'Led frontend development for enterprise SaaS products',
          'Managed team of 4 developers',
          'Improved application performance by 40%',
          'Implemented CI/CD pipelines'
        ]
      },
      education: [
        'B.S. Computer Science - Stanford University (2019)'
      ],
      strengths: [
        'Strong frontend expertise with modern frameworks',
        'Proven leadership and mentoring abilities',
        'Experience with cloud technologies',
        'Clear and well-organized resume structure'
      ],
      improvements: [
        'Add more quantifiable achievements',
        'Include links to portfolio or GitHub',
        'Expand on soft skills and collaboration',
        'Consider adding certifications'
      ],
      overallScore: 82
    });
    
    setIsAnalyzing(false);
    toast({
      title: 'Analysis Complete!',
      description: 'Your resume has been analyzed by our AI.',
    });
  };

  const removeFile = () => {
    setFile(null);
    setAnalysis(null);
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Resume Analyzer</h1>
            <p className="text-muted-foreground">
              Upload your resume and get instant AI-powered feedback to improve your chances
            </p>
          </div>

          {!analysis ? (
            /* Upload Section */
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                    file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Analyzing Your Resume...</h3>
                        <p className="text-muted-foreground mt-1">Our AI is extracting insights</p>
                      </div>
                      <Progress value={66} className="w-48 mx-auto" />
                    </div>
                  ) : file ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-foreground font-medium">{file.name}</span>
                        <button onClick={removeFile} className="text-muted-foreground hover:text-destructive">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Drop your resume here</h3>
                        <p className="text-muted-foreground mt-1">or click to browse</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload">
                        <Button variant="hero" asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </span>
                        </Button>
                      </label>
                      <p className="text-xs text-muted-foreground">Supports PDF files up to 10MB</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Analysis Results */
            <div className="space-y-6">
              {/* Score Card */}
              <Card className="bg-card border-border overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-blue-400" />
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-secondary"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={351.9}
                          strokeDashoffset={351.9 - (351.9 * analysis.overallScore) / 100}
                          className="text-primary transition-all duration-1000"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-foreground">{analysis.overallScore}</span>
                        <span className="text-xs text-muted-foreground">Score</span>
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">AI Analysis Complete</h2>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Your resume shows strong technical skills and relevant experience. 
                        Here are some insights to help you stand out even more.
                      </p>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {analysis.experience.years} Years Experience
                        </Badge>
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {analysis.skills.length} Skills Detected
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" onClick={removeFile}>
                      Upload New
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Skills Extracted */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Skills Detected
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.skills.map(skill => (
                        <Badge 
                          key={skill}
                          variant="outline"
                          className="bg-primary/10 border-primary/30 text-primary"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Experience Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.experience.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Strengths */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Improvements */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      Areas to Improve
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.improvements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
