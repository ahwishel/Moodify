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
        <div className="incompatible_message">
          <h1>
            We apologize for the inconvenience, you are using an unsupported
            browser because Chrome disabled autoplay, something that's required for this work. 
            Please use another browser to use our service.
          </h1>
        </div>
      )}
      {!isChromeBrowser && <MoodSearchWrapper />}
      <p className="credit">
        By Abdallah Hwishel
      </p>
    </div>
  );
}

export default App;
