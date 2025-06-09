
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Algorithm, searchAlgorithms } from "@/data/algorithmsData";

interface AlgorithmSearchProps {
  onResults: (results: Algorithm[]) => void;
  placeholder?: string;
}

const AlgorithmSearch = ({ onResults, placeholder = "Search algorithms..." }: AlgorithmSearchProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim()) {
      const results = searchAlgorithms(query);
      onResults(results);
    } else {
      onResults([]);
    }
  }, [query, onResults]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default AlgorithmSearch;
