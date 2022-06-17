import { Component } from "react";
import Navigation from "./Component/Navigation/Navigation";
import Logo from "./Component/Logo/Logo";
import ImageLinkForm from "./Component/ImageLinkForm/ImageLinkForm";
// import Particles from "./Component/Particles/Particles";
import FaceRecognition from "./Component/FaceRecognition/FaceRecognition";
import Signin from "./Component/Signin/Signin";
import Register from "./Component/Register/Register";

import Rank from "./Component/Rank/Rank";
import "./App.css";
// import Clarifai from "clarifai";

// const app = new Clarifai.App({
//   apiKey: "e1d5b1f6c8714e53851d53ab97644359",
// });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }

  onInputChange = (event) => {
    this.setState = { input: event.target.value };
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    // App.models.predict;
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
      console.log(this.state.isSignedIn);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    let { isSignedIn, imageUrl, route } = this.state;

    return (
      <div className="App">
        {/* <Particles classNam="particles " /> */}
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo className="logo style={{zIndex: '100'}}" />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
