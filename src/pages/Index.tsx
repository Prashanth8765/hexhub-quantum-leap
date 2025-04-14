
import { useState } from "react";
import Header from "@/components/Header";
import HexTile from "@/components/HexTile";
import SettingsPanel from "@/components/SettingsPanel";
import { sections } from "@/data/sectionData";
import NotesSection from "./NotesSection";
import ScanDocumentSection from "./ScanDocumentSection";
import SimpleCodeSection from "./SimpleCodeSection";
import DevelopWebSection from "./DevelopWebSection";
import AimlIareSection from "./AimlIareSection";
import AlgoDsSection from "./AlgoDsSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "notes":
        return <NotesSection onBack={() => setActiveSection(null)} />;
      case "scan-document":
        return <ScanDocumentSection onBack={() => setActiveSection(null)} />;
      case "simple-code":
        return <SimpleCodeSection onBack={() => setActiveSection(null)} />;
      case "develop-web":
        return <DevelopWebSection onBack={() => setActiveSection(null)} />;
      case "aiml-iare":
        return <AimlIareSection onBack={() => setActiveSection(null)} />;
      case "algods":
        return <AlgoDsSection onBack={() => setActiveSection(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header onSettingsClick={() => setSettingsOpen(true)} />
      
      {activeSection ? (
        <div className="pt-16">{renderSection()}</div>
      ) : (
        <div className="container mx-auto pt-24 pb-12 px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-hexhub-primary to-hexhub-secondary bg-clip-text text-transparent">
              Welcome to HexHub
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your productivity and learning companion with an intuitive hexagonal interface.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {sections.map((section, index) => (
              <HexTile
                key={section.id}
                title={section.title}
                icon={section.icon}
                description={section.description}
                onClick={() => handleSectionClick(section.id)}
                colorClass={section.colorClass}
                delay={index}
              />
            ))}
          </div>
        </div>
      )}
      
      <SettingsPanel 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />
    </div>
  );
};

export default Index;
