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
    keywords: {
      covered: string[];
      missing: string[];
    };
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
      
      // Generate mock keywords based on topic
      const mockKeywords = {
        covered: ["Core Concepts", "Basic Principles", "Definition", "Examples"],
        missing: ["Advanced Applications", "Critical Analysis", "Comparative Study", "Real-world Context"]
      };
      
      const mockFeedback = `Great effort on explaining ${topic}! 

Strengths:
• Clear understanding of core concepts covered
• Well-structured response with logical flow
• Good use of basic examples

Areas for Improvement:
• Missing key concepts highlighted above - review these areas
• Add more specific details and advanced applications
• Include comparative analysis to strengthen understanding
• Connect concepts to real-world scenarios

Focus on incorporating the missing keywords in your next attempt. These are essential for a complete understanding of ${topic}.`;

      setEvaluation({
        score: roundedScore,
        feedback: mockFeedback,
        topic,
        keywords: mockKeywords,
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
        <div id="evaluation-results">
          <EvaluationResult 
            score={evaluation.score}
            feedback={evaluation.feedback}
            topic={evaluation.topic}
            keywords={evaluation.keywords}
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
