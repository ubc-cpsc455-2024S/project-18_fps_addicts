const styles = {
  button: {
    backgroundColor: "#4682B4",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 10px",
    fontSize: "16px",
    cursor: "pointer",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    marginBottom: "10px", // Space between button and text
    alignSelf: "flex-start",
  },
  distanceContainer: {
    padding: "8px 16px",
    display: "flex",
    flexDirection: "row", // Align items horizontally
    alignItems: "center",
    justifyContent: "flex-start", // Align content to the left
    color: "#0F52BA",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "1.4",
    marginTop: "5px", // Distance from the button
    width: "100%", // Full width to align with the button
  },
  infoText: {
    marginRight: "20px", // Space between distance and walking time
  },
};

const DistanceDisplay = ({ distance, walkingTime }) => (
  <div>
    <div style={styles.distanceContainer}>
      <span style={styles.infoText}>
        Distance: {distance.toFixed(2)} meters
      </span>
      <span>
        Walking time: {Math.floor(walkingTime / 60)} min{" "}
        {Math.round(walkingTime % 60)} sec
      </span>
    </div>
  </div>
);

export default DistanceDisplay;
export { styles };
