import { useGame } from "../../lib/stores/useGame";
import { usePuzzle } from "../../lib/stores/usePuzzle";
import { useAudio } from "../../lib/stores/useAudio";
import Inventory from "./Inventory";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";

export default function GameUI() {
  const { phase, restart } = useGame();
  const { solvedPuzzles, totalPuzzles } = usePuzzle();
  const { isMuted, toggleMute } = useAudio();

  const progress = totalPuzzles > 0 ? (solvedPuzzles.length / totalPuzzles) * 100 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top HUD */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <Card className="bg-gray-900 border-gray-700 text-white">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm">{solvedPuzzles.length}/{totalPuzzles}</span>
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <Card className="bg-gray-900 border-gray-700 text-white">
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">WASD/Arrow Keys:</span> Move</div>
              <div><span className="font-medium">E/Space:</span> Interact</div>
              <div><span className="font-medium">I/Tab:</span> Inventory</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audio and Game Controls */}
      <div className="absolute bottom-4 right-4 pointer-events-auto flex gap-2">
        <Button
          onClick={toggleMute}
          variant="outline"
          size="sm"
          className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        
        <Button
          onClick={restart}
          variant="outline"
          size="sm"
          className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Inventory */}
      <div className="pointer-events-auto">
        <Inventory />
      </div>

      {/* Game Over Screen */}
      {phase === "ended" && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-auto">
          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Congratulations!
              </h2>
              <p className="text-lg mb-6">
                You've solved all puzzles in this enchanted realm!
              </p>
              <p className="text-gray-400 mb-6">
                Continue exploring to discover new areas and secrets...
              </p>
              <Button
                onClick={restart}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Explore New Realm
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
