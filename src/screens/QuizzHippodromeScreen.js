import React, { useState, useEffect, use } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, Dimensions, ImageBackground, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';
import questionsData from '../components/questionsData';
import { XMarkIcon } from 'react-native-heroicons/solid';

const fontMontserratRegular = 'Montserrat-Regular';

const QuizzHippodromeScreen = ({ setActiveBottomTab, isQuizStarted, setIsQuizStarted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const score = useSelector(state => state.user.currentScore);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const dispatch = useDispatch();
  const [transparentOptions, setTransparentOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);


  const theme = questionsData;
  const questions = theme?.questions || [];

  useEffect(() => {
    console.log('selectedAnswer', selectedAnswer);
  }, [selectedAnswer])

  const handleAnswerSelect = (isCorrect) => {
    if (isCorrect) {
      Alert.alert('Correct!');
      setConsecutiveCorrect(prev => prev + 1);
      if (consecutiveCorrect + 1 === 2) {
        setConsecutiveCorrect(0);
      }
    } else {
      Alert.alert('Incorrect!');
      if (score >= 100) {

        setConsecutiveCorrect(0);
      } else {
      }
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      Alert.alert('Quiz completed!');
    }
  };

  useEffect(() => {
    setTransparentOptions([])
  }, [currentQuestionIndex])

  return (
    <ImageBackground
      source={require('../assets/images/quizBg.png')}
      style={{
        flex: 1,
        width: dimensions.width,
        height: dimensions.height,
      }}>
      {!isQuizStarted && (
        <View style={{
          backgroundColor: '#23263C',
          width: dimensions.width,
          height: dimensions.height * 0.12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: dimensions.width * 0.07,
          paddingHorizontal: dimensions.width * 0.05,
          paddingTop: dimensions.height * 0.05,
          zIndex: 5
        }}>
          <Text></Text>
          <Text
            style={{
              fontFamily: fontMontserratRegular,
              color: 'white',
              fontSize: dimensions.width * 0.046,
              textAlign: 'center',
              alignSelf: 'center',
              paddingHorizontal: dimensions.width * 0.05,
              fontWeight: 600,
              marginLeft: dimensions.width * 0.043,
            }}>
            Quiz
          </Text>

          <TouchableOpacity onPress={() => {
            setSelectedScreen('Settings');
          }}>
            <Image
              source={require('../assets/icons/settingsIcon.png')}
              style={{
                width: dimensions.height * 0.03,
                height: dimensions.height * 0.03,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}

      {!isQuizStarted ? (
        <>
          <View style={{
            width: dimensions.width * 0.9,
            marginTop: dimensions.height * 0.016,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#23263C',
            borderRadius: dimensions.width * 0.03,
            padding: dimensions.width * 0.05,
          }}>
            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                fontSize: dimensions.width * 0.08,
                textAlign: 'center',
                alignSelf: 'center',
                paddingHorizontal: dimensions.width * 0.05,
                fontWeight: 700,
                marginLeft: dimensions.width * 0.043,
              }}>
              Hippodrome Guide Quiz
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setIsQuizStarted(true);
            }}
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#181A29',
              borderRadius: dimensions.width * 0.03,
              padding: dimensions.height * 0.04,
              marginTop: dimensions.height * 0.34,
            }}>
            <Image
              source={require('../assets/icons/startIcon.png')}
              style={{
                width: dimensions.height * 0.07,
                height: dimensions.height * 0.07,
                marginLeft: dimensions.width * 0.01,

              }}
              resizeMode='contain'
            />


          </TouchableOpacity>
        </>
      ) : (
        <SafeAreaView style={{
          flex: 1,
          display: 'flex',
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            alignItems: 'center',
          }}>
            <View></View>
            <Text
              style={{
                fontSize: dimensions.width * 0.07,
                fontFamily: fontMontserratRegular,
                color: '#181A29',
                textAlign: 'center',
                textShadowColor: '#000',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
                fontWeight: 700,
                marginLeft: dimensions.width * 0.1,
              }}
            >
              {currentQuestionIndex + 1}/10
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsQuizStarted(false);
              }}
              style={{
                backgroundColor: '#FF382B',
                borderRadius: dimensions.width * 0.03,
                padding: dimensions.width * 0.03,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <XMarkIcon size={dimensions.height * 0.03} color='white' />
            </TouchableOpacity>
          </View>

          <View style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: dimensions.width * 0.03,
            paddingHorizontal: dimensions.width * 0.05,
            backgroundColor: '#181A29',
            marginTop: dimensions.height * 0.03,
            paddingVertical: dimensions.height * 0.01,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
            <Image
              source={require('../assets/icons/infoIcon.png')}
              style={{
                width: dimensions.width * 0.08,
                height: dimensions.width * 0.08,
              }}
              resizeMode='contain'
            />
            <Text
              style={{
                fontSize: dimensions.width * 0.03,
                fontFamily: fontMontserratRegular,
                color: '#fff',
                textAlign: 'left',
                textShadowColor: '#000',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
                fontWeight: 300,
                paddingVertical: dimensions.height * 0.023,
                marginLeft: dimensions.width * 0.02,
              }}
            >
              {questionsData[currentQuestionIndex].help}
            </Text>

          </View>

          <View style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#363B5C',
            borderRadius: dimensions.width * 0.03,
            paddingHorizontal: dimensions.width * 0.05,
            marginTop: dimensions.height * 0.01,
            marginBottom: dimensions.height * 0.01,
          }}>
            <Text
              style={{
                fontSize: dimensions.width * 0.04,
                fontFamily: fontMontserratRegular,
                fontSize: dimensions.width * 0.05,
                color: '#fff',
                textAlign: 'center',
                textShadowColor: '#000',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
                fontWeight: 600,
                paddingVertical: dimensions.height * 0.023,
              }}
            >
              {questionsData[currentQuestionIndex].question}
            </Text>
          </View>

          {questionsData[currentQuestionIndex].answers.map((answ, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedAnswer(answ);
              }}
              key={index} style={{
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#181A29',
                borderRadius: dimensions.width * 0.03,
                paddingHorizontal: dimensions.width * 0.05,
                marginTop: dimensions.height * 0.003,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingVertical: dimensions.height * 0.01,
                borderColor: 'white',
                borderWidth: selectedAnswer?.answer === answ.answer ? dimensions.width * 0.01 : 0,
              }}>
              <View style={{
                backgroundColor: '#363B5C',
                borderRadius: dimensions.width * 0.5,
                width: dimensions.width * 0.1,
                height: dimensions.width * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text
                  style={{
                    fontSize: dimensions.width * 0.035,
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 1,
                    fontWeight: 600,
                  }}
                >
                  {answ.letter}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: dimensions.width * 0.043,
                  fontFamily: fontMontserratRegular,
                  color: 'white',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 1,
                  fontWeight: 300,
                  paddingVertical: dimensions.height * 0.023,
                  flexDirection: 'row',
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  marginLeft: dimensions.width * 0.02,
                }}
              >
                {answ.answer}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => handleAnswerSelect(selectedAnswer?.answer.isCorrect)}
            style={{
              width: dimensions.width * 0.9,
              padding: dimensions.width * 0.03,
              backgroundColor: 'white',
              borderRadius: dimensions.width * 0.025,
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.55,
              shadowRadius: 3.84,
              elevation: 5,
              position: 'absolute',
              bottom: dimensions.height * 0.1,
            }}>
            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: '#181A29',
                fontSize: dimensions.width * 0.05,
                textAlign: 'center',
                alignSelf: 'center',
                paddingHorizontal: dimensions.width * 0.05,
                fontWeight: 700,
              }}>
              REPLY
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};

export default QuizzHippodromeScreen;
