import "./App.css";
import MoodSearchWrapper from "./components/MoodSearch/MoodSearchWrapper";

function App() {
  const currentBrowser = navigator.userAgent;
  const checkBrowserRegex = new RegExp("Chrome/.*");
  const isChromeBrowser = checkBrowserRegex.test(currentBrowser);
  return (
    <div className="App">
      <h1>moodify</h1>
      {isChromeBrowser && (
        <h1 style={{ position: "absolute", top: "30vh", textAlign: "center", opacity: 1,transition: 'opacity ease-in 0.5s' }}>
          We apologize for the inconvenience, you are using an unsupported
          browser. Please use another browser to use our service.
        </h1>
      )}
      {!isChromeBrowser && <MoodSearchWrapper />}
    </div>
  );
}

export default App;
