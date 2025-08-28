export default function PageHeader() {
  return (
    <nav className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 sticky top-0 z-40 shadow-lg shadow-green-200/50 flex-shrink-0">
      <div className="h-14 sm:h-16 flex items-center justify-center py-3 sm:py-4 px-4 relative">
        <div className="absolute inset-0 bg-green-400/10 animate-pulse"></div>
        <div className="relative z-10 flex items-center space-x-3 sm:space-x-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-wider drop-shadow-lg">
            O.C.O.Y.A.M
          </h1>
          <span className="px-2 sm:px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-xs sm:text-sm whitespace-nowrap">
            Moderator
          </span>
        </div>
      </div>
    </nav>
  );
}