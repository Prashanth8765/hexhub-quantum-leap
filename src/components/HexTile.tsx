
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HexTileProps {
  title: string;
  icon: ReactNode;
  description?: string;
  onClick: () => void;
  colorClass?: string;
  delay?: number;
}

const HexTile = ({
  title,
  icon,
  description,
  onClick,
  colorClass = "bg-gradient-to-br from-hexhub-primary to-hexhub-secondary",
  delay = 0,
}: HexTileProps) => {
  return (
    <motion.div
      className="hexagon-container aspect-square w-full max-w-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
    >
      <div
        onClick={onClick}
        className={cn(
          "hexagon-inner h-full w-full cursor-pointer group",
          colorClass,
          "hover:shadow-lg hover:scale-105 text-white"
        )}
      >
        <div className="hexagon-content p-4">
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          {description && (
            <p className="text-xs text-white/80 line-clamp-3">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HexTile;
