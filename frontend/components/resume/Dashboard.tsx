import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Target, Award, Star } from "lucide-react";
import { FeedbackTable } from "./FeedbackTable";

export interface AnalysisData {
  ats_score: number;
  experience_level: string;
  strengths: string[];
  weaknesses: string[];
  missing_keywords: string[];
  suggestions: string[];
  skill_match: number;
}

interface DashboardProps {
  data: AnalysisData;
}

export function Dashboard({ data }: DashboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ATS Score Card */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ATS Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(data.ats_score)}`}>{data.ats_score}%</div>
            <Progress value={data.ats_score} className="mt-3 h-2" />
          </CardContent>
        </Card>

        {/* Skill Match Card */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Skill Match</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{data.skill_match}%</div>
            <Progress value={data.skill_match} className="mt-3 h-2" />
          </CardContent>
        </Card>

        {/* Experience Level */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Experience Level</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mt-1">{data.experience_level}</div>
          </CardContent>
        </Card>

        {/* Resume Quality */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resume Quality</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mt-1">
              {data.ats_score >= 80 ? "Excellent" : data.ats_score >= 60 ? "Good" : "Needs Work"}
            </div>
          </CardContent>
        </Card>
      </div>

      <FeedbackTable data={data} />
    </div>
  );
}
