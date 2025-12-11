const SpinnerChargement = ({ message = 'Chargement' }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center">
        <span className="text-gray-600 text-sm">{message}</span>
        <div className="flex ml-1">
          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce mx-0.5"></span>
          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce mx-0.5" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce mx-0.5" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
};

export default SpinnerChargement;