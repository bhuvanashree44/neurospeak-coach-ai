import { useState } from "react";
import { Hero } from "@/components/Hero";
import { EvaluationForm } from "@/components/EvaluationForm";
import { EvaluationResult } from "@/components/EvaluationResult";
import { DoubtChat } from "@/components/DoubtChat";
import { LearningGraph } from "@/components/LearningGraph";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    score: number;
    feedback: string;
    topic: string;
    answer: string;
  } | null>(null);
  const { toast } = useToast();

  // Sample data for the learning graph (0-5 scale)
  const [learningData, setLearningData] = useState([
    { date: "Week 1", score: 2.5 },
    { date: "Week 2", score: 3.0 },
    { date: "Week 3", score: 3.5 },
    { date: "Week 4", score: 4.0 },
    { date: "Week 5", score: 4.2 },
  ]);

  const handleSubmit = async (topic: string, answer: string) => {
    setIsLoading(true);
    
    // Simulate AI evaluation (replace with actual AI integration later)
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 3) + 2.5; // Random score between 2.5-5
      const roundedScore = Math.round(mockScore * 2) / 2; // Round to nearest 0.5
      const mockFeedback = `Great effort on explaining ${topic}! 

Strengths:
• Clear understanding of core concepts
• Well-structured response with logical flow
• Good use of relevant examples

Areas for Improvement:
• Consider adding more specific details to strengthen your arguments
• Include additional examples to demonstrate deeper understanding
• Connect concepts to real-world applications for better context

Keep up the excellent work! Your analytical approach shows promise. Focus on expanding your explanations with more concrete examples and you'll see continued improvement.`;

      setEvaluation({
        score: roundedScore,
        feedback: mockFeedback,
        topic,
        answer,
      });

      // Update learning data
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      setLearningData(prev => [...prev, { date: today, score: roundedScore }]);

      setIsLoading(false);
      
      toast({
        title: "Evaluation Complete!",
        description: `Your score: ${roundedScore}/5`,
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById("evaluation-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      
      <EvaluationForm onSubmit={handleSubmit} isLoading={isLoading} />
      
      {evaluation && (
        <>
          <div id="evaluation-results">
            <EvaluationResult 
              score={evaluation.score}
              feedback={evaluation.feedback}
              topic={evaluation.topic}
            />
          </div>
          
          <DoubtChat topic={evaluation.topic} answer={evaluation.answer} />
        </>
      )}
      
      <LearningGraph data={learningData} />
      
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground border-t">
        <p className="text-sm">
          © 2025 NeuroSpeak. AI-Powered Learning Evaluation Platform.
        </p>
      </footer>
    </div>
  );
};

export default Index;
