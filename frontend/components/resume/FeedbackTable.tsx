import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, XCircle, AlertCircle, Lightbulb } from "lucide-react";
import { AnalysisData } from "./Dashboard";

interface FeedbackTableProps {
  data: AnalysisData;
}

export function FeedbackTable({ data }: FeedbackTableProps) {
  return (
    <Card className="bg-card border-border w-full">
      <CardHeader>
        <CardTitle className="text-xl">Detailed Analysis Report</CardTitle>
      </CardHeader>
      <CardContent>
       <Accordion
        
          className="w-full"
         
>
          
          <AccordionItem value="strengths" className="border-border">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center text-green-500">
                <CheckCircle2 className="h-5 w-5 mr-3" />
                <span className="font-medium text-foreground">Strengths</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-8 list-disc text-muted-foreground">
                {data.strengths.length > 0 ? data.strengths.map((item, i) => (
                  <li key={i}>{item}</li>
                )) : <li>No particular strengths identified.</li>}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="weaknesses" className="border-border">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center text-red-500">
                <XCircle className="h-5 w-5 mr-3" />
                <span className="font-medium text-foreground">Areas for Improvement</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-8 list-disc text-muted-foreground">
                {data.weaknesses.length > 0 ? data.weaknesses.map((item, i) => (
                  <li key={i}>{item}</li>
                )) : <li>No significant weaknesses found.</li>}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="missing_keywords" className="border-border">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center text-yellow-500">
                <AlertCircle className="h-5 w-5 mr-3" />
                <span className="font-medium text-foreground">Missing Keywords</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pl-8">
                {data.missing_keywords.length > 0 ? data.missing_keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {kw}
                  </span>
                )) : <span className="text-muted-foreground">All essential keywords appear to be present.</span>}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="suggestions" className="border-border">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center text-blue-400">
                <Lightbulb className="h-5 w-5 mr-3" />
                <span className="font-medium text-foreground">Actionable Suggestions</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3 pl-8 text-muted-foreground">
                {data.suggestions.length > 0 ? data.suggestions.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-accent mr-2 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                )) : <li>Looking good! No additional suggestions.</li>}
              </ul>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
    </Card>
  );
}
