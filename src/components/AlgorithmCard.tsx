
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Clock, HardDrive } from "lucide-react";
import { Algorithm } from "@/data/algorithmsData";

interface AlgorithmCardProps {
  algorithm: Algorithm;
  onSelect: (algorithm: Algorithm) => void;
}

const AlgorithmCard = ({ algorithm, onSelect }: AlgorithmCardProps) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelect(algorithm)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{algorithm.name}</CardTitle>
          <Badge variant="secondary" className="capitalize">
            {algorithm.category.replace('_', ' ')}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {algorithm.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{algorithm.timeComplexity}</span>
          </div>
          <div className="flex items-center gap-1">
            <HardDrive className="h-3 w-3" />
            <span>{algorithm.spaceComplexity}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <Code className="h-4 w-4 mr-2" />
          View Implementation
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlgorithmCard;
