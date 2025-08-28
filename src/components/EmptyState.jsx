import { Button } from "@/components/ui/button";

export default function EmptyState({ onCreateClass }) {
  return (
    <div className="text-center py-12 sm:py-16">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg max-w-sm sm:max-w-md mx-auto">
        <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🎥</div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No Classes Yet</h3>
        <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base px-2">
          Create your first class to get started with online learning
        </p>
        <Button 
          onClick={onCreateClass}
          className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Create First Class
        </Button>
      </div>
    </div>
  );
}