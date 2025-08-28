export default function WelcomeSection() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl transform hover:scale-[1.02] transition-all duration-500 animate-slide-down">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
              Welcome Back, Moderator! 🌿
            </h2>
            <p className="text-green-100 text-sm sm:text-base">
              Manage your traditional medicine college dashboard
            </p>
          </div>
          <div className="hidden sm:block flex-shrink-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-xl sm:text-2xl">📚</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}