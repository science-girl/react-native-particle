/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import JSParticle from "./src/JSParticle";
import SoundPlayer from "react-native-sound-player";

export default class App extends Component {
  numParticles = 50;
  particles = [];

  constructor(props) {
    super(props);
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(<JSParticle key={i} />);
    }
  }
  componentDidMount() {
    try {
      SoundPlayer.playSoundFile("Happy", "mp3");
      SoundPlayer.onFinishedPlayer((success: boolean) => {
        Soundplayer.palySoundFile("Happy", "mp3");
      });
    } catch (err) {}
  }

  render() {
    return (
      <View style={styles.container}>
        {this.particles.map(particle => particle)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
