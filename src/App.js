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

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "_",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    this.setState({ imageUrl: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    const faceData = data.detected_faces[0].BoundingBox;
    console.log(faceData);
    this.displayFaceBox(faceData);

    // data.detected_faces.forEach((face, i) => {
    //   this.displayFaceBox(face.BoundingBox);
    // });
  };

  displayFaceBox = (box) => {
    console.log("box", box);
    this.setState({ box: box });
  };

  onPictureSubmit = () => {
    console.log(this.state.imageUrl);
    console.log(this.state.input);
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.calculateFaceLocation(response);
        if (response) {
          console.log("response", response);
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((response) => {
              this.setState(
                Object.assign(this.state.user, { entries: response })
              );
            })
            .catch(console.log);
        }
      })
      .catch((err) => console.error(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    let { isSignedIn, imageUrl, route, user, box } = this.state;

    console.log("Process", process.env);
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
            <Rank username={user.name} userEntries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onPictureSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
