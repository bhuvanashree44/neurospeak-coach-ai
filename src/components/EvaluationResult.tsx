import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

interface EvaluationResultProps {
  score: number;
  feedback: string;
  topic: string;
}

export const EvaluationResult = ({ score, feedback, topic }: EvaluationResultProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-orange-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="w-8 h-8 text-green-500" />;
    if (score >= 60) return <TrendingUp className="w-8 h-8 text-yellow-500" />;
    return <AlertCircle className="w-8 h-8 text-orange-500" />;
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto shadow-lg-colored animate-fade-in">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-2xl">Evaluation Results</CardTitle>
            <Badge variant="secondary" className="text-base px-4 py-2">
              Topic: {topic}
            </Badge>
          </div>
          
          <div className="flex items-center gap-6 p-6 rounded-lg bg-secondary/50">
            {getScoreIcon(score)}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Score</p>
              <p className={`text-5xl font-bold ${getScoreColor(score)}`}>
                {score}/100
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Feedback & Improvement Tips
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {feedback}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
