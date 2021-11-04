const FetchIndicator = () => {
  const dots = ["", "", "", "", ""];

  return (
    <div id="preloader">
      <div id="status">
        <div className="spinner-chase">
          {dots.map((_, indx) => (
            <div key={indx} className="chase-dot" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FetchIndicator;
