import { useState } from "react";
import { Hero } from "@/components/Hero";
import { EvaluationForm } from "@/components/EvaluationForm";
import { EvaluationResult } from "@/components/EvaluationResult";
import { LearningGraph } from "@/components/LearningGraph";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    score: number;
    feedback: string;
    topic: string;
  } | null>(null);
  const { toast } = useToast();

  // Sample data for the learning graph
  const [learningData, setLearningData] = useState([
    { date: "Week 1", score: 65 },
    { date: "Week 2", score: 72 },
    { date: "Week 3", score: 78 },
    { date: "Week 4", score: 85 },
    { date: "Week 5", score: 88 },
  ]);

  const handleSubmit = async (topic: string, answer: string) => {
    setIsLoading(true);
    
    // Simulate AI evaluation (replace with actual AI integration later)
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
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
        score: mockScore,
        feedback: mockFeedback,
        topic,
      });

      // Update learning data
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      setLearningData(prev => [...prev, { date: today, score: mockScore }]);

      setIsLoading(false);
      
      toast({
        title: "Evaluation Complete!",
        description: `Your score: ${mockScore}/100`,
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
        <div id="evaluation-results">
          <EvaluationResult 
            score={evaluation.score}
            feedback={evaluation.feedback}
            topic={evaluation.topic}
          />
        </div>
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
