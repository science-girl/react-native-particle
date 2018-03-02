import React, { Component } from "react";
import { Text, Image, Animated, Easing } from "react-native";

class JSParticle extends Component {
  constructor() {
    super();

    this.startPosition = [0, 0];
    this.endPosition = [
      this._randomNumber(-500, 500),
      this._randomNumber(-500, 500)
    ];
    this.duration = this._randomNumber(2000, 3000);
    this.startDelay = this._randomNumber(0, 2000);
    this.size = this._randomNumber(10, 50);

    this.state = {
      translateX: new Animated.Value(this.startPosition[0]),
      translateY: new Animated.Value(this.startPosition[1]),
      opacity: new Animated.Value(0),
      rotation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    setTimeout(() => this._startAnimation(), this.startDelay);
  }

  _startAnimation() {
    Animated.parallel([
      Animated.timing(this.state.translateX, {
        toValue: this.endPosition[0],
        duration: this.duration,
        easing: Easing.elastic(0.4)
      }),
      Animated.timing(this.state.translateY, {
        toValue: this.endPosition[1],
        duration: this.duration,
        easing: Easing.elastic(0.4)
      }),
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.elastic(0.4)
        }),
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: this.duration,
          easing: Easing.elastic(0.4)
        })
      ]),
      Animated.timing(this.state.rotation, {
        toValue: 1,
        duration: this.duration,
        easing: Easing.elastic(0.4)
      })
    ]).start(() => {
      //loop
      this._reset();
      this._startAnimation();
    });
  }
  _reset() {
    this.setState({
      translateX: new Animated.Value(this.startPosition[0]),
      translateY: new Animated.Value(this.startPosition[1]),
      opacity: new Animated.Value(1),
      rotation: new Animated.Value(0)
    });
  }

  _randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  render() {
    const spin = this.state.rotation.interpolate({
      inputRange: [0.5, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <Animated.View
        style={{
          position: "absolute",
          opacity: this.state.opacity,
          //fontSize: this.size,
          transform: [
            { scale: this.size },
            { translateX: this.state.translateX },
            { translateY: this.state.translateY },
            { rotate: spin }
          ]
        }}
      >
        <Image
          style={{ width: this.size, height: this.size }}
          source={require("./galaxy.png")}
        />
      </Animated.View>
    );
  }
}

export default JSParticle;
