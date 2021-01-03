import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

export const quizTypes = {
  "1": "image",
  "2": "text",
  "0": "none"

}


export default function App() {

  const [questionIndex, setQuestionIndex] = useState(-1);
  const [answer, setAnswer] = useState("");
  const [quiztype, setQuizType] = useState("");
  const [url, setUrl] = useState("https://avatars1.githubusercontent.com/u/19220113?s=460&u=9f416b74b71446c7d9a41f79f4d1d9134622a195&v=4");
  const [myAnswer, setMyAnswer] = useState("");
  const [attempt, setAttempt] = useState(false);


  useEffect(() => {
    fetch(`https://whoamisamcaspus.herokuapp.com/get-question?progress=${questionIndex}`)
      .then((data) => {
        return data.json();
      })
      .then((content) => {
        if (content.data !== null) {
          setAnswer(content.data.answer);
          setUrl(content.data.url);
          setQuizType(quizTypes[content.data.quizType]);
        }
        setTimeout(() => {
          if (content.data == null) {

            setAnswer("");
            setUrl("Good job no more questions available you can close the app");
            setQuizType("end");
            setMyAnswer("");

          }
        })

      })
  }, [questionIndex])


  return (
    <View style={styles.container}>
      {/* component one */}

      {questionIndex == -1 && (<TouchableOpacity
        onPress={() => {
          setQuestionIndex(questionIndex + 1);
        }}

      >
        <Text style={styles.buttonStyle}>Click Me To Start</Text>
      </TouchableOpacity>)}

      {/* component two */}
      {questionIndex != -1 && quiztype == "image" && (
        <View>
          <Text
            style={{ color: "white", fontSize: 20 }}
          >
            what is the below image (say aloud)
      </Text>
          {/* <Text
            style={{ color: "cyan", fontSize: 50, justifyContent: "center", padding: 10 }}
          >{url}</Text> */}
          <Image
            style={{ width: 300, height: 400, padding: 10, borderRadius: 10, margin: 10 }}
            source={{ uri: url }} />
          <TextInput
            placeholder={attempt ? answer : `Type answer here`}
            value={myAnswer}
            onChangeText={(myAnswer) => { setMyAnswer(myAnswer); }}
            style={{ backgroundColor: "white", padding: 10 }}
          ></TextInput>


          <TouchableOpacity
            onPress={() => {
              if (myAnswer === answer) {
                Alert.alert("Correct", "Click ok to go to next Question", [{
                  text: "Ok",
                  onPress: () => {

                    setAnswer("");
                    setUrl("https://avatars1.githubusercontent.com/u/19220113?s=460&u=9f416b74b71446c7d9a41f79f4d1d9134622a195&v=4");
                    setQuizType("");
                    setMyAnswer("");
                    setQuestionIndex(questionIndex + 1);
                  }
                }])
                setAttempt(false);
              } else {
                Alert.alert("Wrong", "Try again");
                Speech.speak(`wrong answer correct answer is, ${answer}`)
                setMyAnswer("");
                setAttempt(true);
              }
            }}
          >
            <Text
              style={{ backgroundColor: "darkgreen", color: "white", fontSize: 30, padding: 10, marginTop: 10, borderRadius: 10, alignContent: 'center', justifyContent: 'center' }}
            >Submit</Text>
          </TouchableOpacity>

          {attempt === true && <TouchableOpacity
            onPress={() => {
              console.log(answer);
              Speech.speak(answer)
            }}
          >
            <Text
              style={{ backgroundColor: "darkgreen", color: "white", fontSize: 30, padding: 10, marginTop: 10, borderRadius: 10, alignContent: 'center', justifyContent: 'center' }}
            >Audio Answer</Text>
          </TouchableOpacity>}
        </View>
      )}

      {/* component three */}
      {questionIndex != -1 && quiztype == "text" && (
        <View>
          <Text
            style={{ color: "white", fontSize: 20 }}
          >
            Say the below word aloud
        </Text>
          <Text
            style={{ color: "cyan", fontSize: 50, justifyContent: "center", padding: 10 }}
          >{url}</Text>
          <TextInput
            placeholder={attempt ? answer : `Type answer here`}
            value={myAnswer}
            onChangeText={(myAnswer) => { setMyAnswer(myAnswer); }}
            style={{ backgroundColor: "white", padding: 10 }}
          ></TextInput>


          <TouchableOpacity
            onPress={() => {
              if (myAnswer === answer) {
                Alert.alert("Correct", "Click ok to go to next Question", [{
                  text: "Ok",
                  onPress: () => {

                    setAnswer("");
                    setUrl("https://avatars1.githubusercontent.com/u/19220113?s=460&u=9f416b74b71446c7d9a41f79f4d1d9134622a195&v=4");
                    setQuizType("");
                    setMyAnswer("");
                    setQuestionIndex(questionIndex + 1);
                  }
                }])
                setAttempt(false);
              } else {
                Alert.alert("Wrong", "Try again");
                Speech.speak(`wrong answer correct answer is, '${answer}'`)
                setMyAnswer("");
                setAttempt(true);
              }
            }}
          >
            <Text
              style={{ backgroundColor: "darkgreen", color: "white", fontSize: 30, padding: 10, marginTop: 10, borderRadius: 10, alignContent: 'center', justifyContent: 'center' }}
            >Submit</Text>
          </TouchableOpacity>

          {attempt === true && <TouchableOpacity
            onPress={() => {
              console.log(answer);
              Speech.speak(answer)
            }}
          >
            <Text
              style={{ backgroundColor: "darkgreen", color: "white", fontSize: 30, padding: 10, marginTop: 10, borderRadius: 10, alignContent: 'center', justifyContent: 'center' }}
            >Audio Answer</Text>
          </TouchableOpacity>}
        </View>

      )}

      {/* component four */}
      {questionIndex != -1 && quiztype == "end" && (
        <View>
          <Text
            style={{ color: "cyan", fontSize: 50, justifyContent: "center", padding: 10 }}
          >{url}</Text>

        </View>

      )}




      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#283747',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: { backgroundColor: "#138D75", padding: 15, fontSize: 30, borderRadius: 10, color: "white" }
});
