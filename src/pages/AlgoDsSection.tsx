
import { useState } from "react";
import { ArrowLeft, BookOpen, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { algorithmCategories, Algorithm, getAllAlgorithms } from "@/data/algorithmsData";
import AlgorithmCard from "@/components/AlgorithmCard";
import AlgorithmDetail from "@/components/AlgorithmDetail";
import AlgorithmSearch from "@/components/AlgorithmSearch";

interface AlgoDsSectionProps {
  onBack: () => void;
}

const AlgoDsSection = ({ onBack }: AlgoDsSectionProps) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);
  const [searchResults, setSearchResults] = useState<Algorithm[]>([]);
  const [activeView, setActiveView] = useState<"browse" | "search">("browse");

  const handleAlgorithmSelect = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleSearchResults = (results: Algorithm[]) => {
    setSearchResults(results);
    setActiveView(results.length > 0 ? "search" : "browse");
  };

  const handleBackToMain = () => {
    setSelectedAlgorithm(null);
  };

  if (selectedAlgorithm) {
    return (
      <div className="container mx-auto py-8 px-4">
        <AlgorithmDetail 
          algorithm={selectedAlgorithm} 
          onBack={handleBackToMain}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">AlgoDS Explorer</h1>
            <p className="text-muted-foreground">
              Comprehensive algorithm and data structure reference
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="hidden sm:flex">
          {getAllAlgorithms().length} Algorithms
        </Badge>
      </div>

      <div className="mb-6">
        <AlgorithmSearch onResults={handleSearchResults} />
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="arrays">Arrays</TabsTrigger>
          <TabsTrigger value="sorting">Sorting</TabsTrigger>
          <TabsTrigger value="data_structures">Data Structures</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {activeView === "search" ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Search Results ({searchResults.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((algorithm) => (
                  <AlgorithmCard
                    key={algorithm.id}
                    algorithm={algorithm}
                    onSelect={handleAlgorithmSelect}
                  />
                ))}
              </div>
            </div>
          ) : (
            algorithmCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <Badge variant="outline">{category.algorithms.length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.algorithms.map((algorithm) => (
                    <AlgorithmCard
                      key={algorithm.id}
                      algorithm={algorithm}
                      onSelect={handleAlgorithmSelect}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </TabsContent>

        {algorithmCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <Badge variant="outline">{category.algorithms.length} algorithms</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.algorithms.map((algorithm) => (
                <AlgorithmCard
                  key={algorithm.id}
                  algorithm={algorithm}
                  onSelect={handleAlgorithmSelect}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learn Mode
          </CardTitle>
          <CardDescription>
            Interactive learning experience with theory and practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Code2 className="h-6 w-6" />
              <span>Practice Coding</span>
              <span className="text-xs text-muted-foreground">
                Run code snippets in browser
              </span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BookOpen className="h-6 w-6" />
              <span>Study Theory</span>
              <span className="text-xs text-muted-foreground">
                Read detailed explanations
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgoDsSection;
