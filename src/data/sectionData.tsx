
import { 
  BookText, 
  FileScanned, 
  Code, 
  Globe, 
  GraduationCap,
  Search 
} from "lucide-react";

export interface SectionData {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  colorClass: string;
}

export const sections: SectionData[] = [
  {
    id: "notes",
    title: "Notes",
    icon: <BookText />,
    description: "A secure, stylish, and feature-rich digital notebook",
    colorClass: "bg-gradient-to-br from-blue-500 to-indigo-600"
  },
  {
    id: "scan-document",
    title: "Scan Document",
    icon: <FileScanned />,
    description: "Scan, manage, and edit physical documents—all offline",
    colorClass: "bg-gradient-to-br from-purple-500 to-indigo-600"
  },
  {
    id: "simple-code",
    title: "SimpleCode",
    icon: <Code />,
    description: "Generate simple, clean code from natural language using AI",
    colorClass: "bg-gradient-to-br from-indigo-500 to-blue-600"
  },
  {
    id: "develop-web",
    title: "DevelopWeb",
    icon: <Globe />,
    description: "AI-Powered Web Development—Just describe, and build",
    colorClass: "bg-gradient-to-br from-violet-500 to-purple-600"
  },
  {
    id: "aiml-iare",
    title: "AIML-IARE",
    icon: <GraduationCap />,
    description: "A complete offline archive for AI/ML academic material",
    colorClass: "bg-gradient-to-br from-fuchsia-500 to-pink-600"
  },
  {
    id: "algods",
    title: "AlgoDS",
    icon: <Search />,
    description: "Offline reference hub for Algorithms and Data Structures",
    colorClass: "bg-gradient-to-br from-pink-500 to-rose-600"
  }
];
