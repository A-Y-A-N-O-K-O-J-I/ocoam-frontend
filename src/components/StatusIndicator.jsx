export default function StatusIndicator({ status }) {
  const getStatusConfig = () => {
    switch (status?.toLowerCase()) {
      case 'live':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          animation: 'animate-pulse',
          label: 'Live',
          icon: '🔴'
        };
      case 'scheduled':
        return {
          color: 'bg-yellow-500',
          textColor: 'text-yellow-700',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          animation: 'animate-pulse',
          label: 'Scheduled',
          icon: '📅'
        };
      case 'ended':
        return {
          color: 'bg-gray-500',
          textColor: 'text-gray-700',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          animation: '',
          label: 'Ended',
          icon: '⏹️'
        };
      default:
        return {
          color: 'bg-green-500',
          textColor: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          animation: '',
          label: 'Ready',
          icon: '✅'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full ${config.bgColor} ${config.borderColor} border flex-shrink-0`}>
      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${config.color} ${config.animation}`}></div>
      <span className={`text-xs font-medium ${config.textColor} whitespace-nowrap`}>
        <span className="hidden sm:inline">{config.icon} </span>
        {config.label}
      </span>
    </div>
  );
}