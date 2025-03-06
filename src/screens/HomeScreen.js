import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import localsData from '../components/localsData';
import SettingsScreen from './SettingsScreen';
import { ScrollView } from 'react-native-gesture-handler';
import LocDetailsScreen from './LocDetailsScreen';
import RacetracksScreen from './RacetracksScreen';
import AddRacetrackScreen from './AddRacetrackScreen';
import HorsesScreen from './HorsesScreen';
import AddHorseScreen from './AddHorseScreen';
import QuizzHippodromeScreen from './QuizzHippodromeScreen';

const fontMontserratRegular = 'Montserrat-Regular';

const bottomBtns = [
  {
    id: 1,
    screen: 'Home',
    title: 'Local',
    btnIcon: require('../assets/icons/buttons/homeIcon.png'),
  },
  {
    id: 2,
    screen: 'Racetracks',
    title: 'My racetracks',
    btnIcon: require('../assets/icons/buttons/racetrackIcon.png'),
  },
  {
    id: 3,
    screen: 'Horses',
    title: 'My horses',
    btnIcon: require('../assets/icons/buttons/horseIcon.png'),
  },
  {
    id: 4,
    screen: 'Quiz',
    title: 'Quiz',
    btnIcon: require('../assets/icons/buttons/quizIcon.png'),
  },
]

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const [selectedHippodromeLoc, setSelectedHippodromeLoc] = useState(null);
  const [racetracks, setRacetracks] = useState([]);
  const [horses, setHorses] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  useEffect(() => {
    const loadRacetracks = async () => {
      try {
        const storedRacetracks = await AsyncStorage.getItem('racetracks');
        if (storedRacetracks) {
          setRacetracks(JSON.parse(storedRacetracks));
        }
      } catch (error) {
        console.error('Error loading racetracks:', error);
      }
    };

    loadRacetracks();
  }, [selectedScreen, racetracks]);


  useEffect(() => {
    const loadHorses = async () => {
      try {
        const storedHorses = await AsyncStorage.getItem('horses');
        if (storedHorses) {
          setHorses(JSON.parse(storedHorses));
        }
      } catch (error) {
        console.error('Error loading horses:', error);
      }
    };

    loadHorses();
  }, [selectedScreen, racetracks]);

  return (
    <View style={{
      flex: 1,
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#181A29',
    }}>
      {selectedScreen === 'Home' ? (
        <View style={{
          flex: 1,
          paddingHorizontal: dimensions.width * 0.05,
          width: dimensions.width,
        }}>
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
              Local
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

          <ScrollView showsVerticalScrollIndicator={false} style={{
            width: dimensions.width,
            alignSelf: 'center',
            paddingTop: -dimensions.height * 0.1,
            marginTop: -dimensions.height * 0.1,
          }}>
            <View style={{
              width: dimensions.width,
              paddingBottom: dimensions.height * 0.16,
              alignSelf: 'center',
            }}>
              <MapView
                style={{
                  width: dimensions.width,
                  height: dimensions.height * 0.35,
                  borderRadius: 40,
                  alignSelf: 'center',
                  height: dimensions.height * 0.37,

                  zIndex: 0
                }}
                region={{
                  latitude: localsData[0].coordinates.latitude,
                  longitude: localsData[0].coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                {localsData.map((location, index) => (
                  <Marker
                    key={index}
                    coordinate={location.coordinates}
                    title={location.title}
                    description={location.description}
                    pinColor="#0A84FF"
                  />
                ))}
              </MapView>

              <SafeAreaView style={{
                flex: 1,
                width: dimensions.width,
              }}>
                {localsData.map((location, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedScreen('LocDetails');
                      setSelectedHippodromeLoc(location);
                    }}
                    key={index} style={{
                      width: dimensions.width * 0.9,
                      alignSelf: 'center',
                      backgroundColor: '#23263C',
                      borderRadius: dimensions.width * 0.05,
                      padding: dimensions.width * 0.04,
                      marginTop: dimensions.height * 0.023,
                    }}>
                    <Image
                      source={location.image}
                      style={{
                        width: dimensions.width * 0.8,
                        height: dimensions.height * 0.2,
                        alignSelf: 'center',
                        borderRadius: dimensions.width * 0.04,
                      }}
                      resizeMode='stretch'
                    />

                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: dimensions.width * 0.79,
                      marginTop: dimensions.height * 0.023,
                    }}>
                      <Text
                        style={{
                          fontFamily: fontMontserratRegular,
                          color: 'white',
                          fontSize: dimensions.width * 0.04,
                          textAlign: 'left',
                          fontWeight: 600,
                          maxWidth: dimensions.width * 0.61,
                        }}>
                        {location.title}
                      </Text>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <Text
                          style={{
                            fontFamily: fontMontserratRegular,
                            color: 'white',
                            fontSize: dimensions.width * 0.04,
                            textAlign: 'center',
                            fontWeight: 500,
                            marginLeft: dimensions.width * 0.043,
                          }}>
                          5.0
                        </Text>

                        <Image
                          source={require('../assets/icons/starIcon.png')}
                          style={{
                            width: dimensions.height * 0.021,
                            height: dimensions.height * 0.021,
                            marginLeft: dimensions.width * 0.016,
                          }}
                          resizeMode='contain'
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </SafeAreaView>
            </View>
          </ScrollView>
        </View>
      ) : selectedScreen === 'LocDetails' ? (
        <LocDetailsScreen setSelectedScreen={setSelectedScreen} selectedHippodromeLoc={selectedHippodromeLoc} setSelectedHippodromeLoc={setSelectedHippodromeLoc} />
      ) : selectedScreen === 'Settings' ? (
        <SettingsScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen}/>
      ) : selectedScreen === 'Racetracks' ? (
        <RacetracksScreen setSelectedScreen={setSelectedScreen} racetracks={racetracks} setRacetracks={setRacetracks} />
      ) : selectedScreen === 'Horses' ? (
        <HorsesScreen setSelectedScreen={setSelectedScreen} horses={horses} setHorses={setHorses} />
      ) : selectedScreen === 'AddRacetrack' ? (
        <AddRacetrackScreen setSelectedScreen={setSelectedScreen} racetracks={racetracks} setRacetracks={setRacetracks} />
      ) : selectedScreen === 'AddHorse' ? (
        <AddHorseScreen setSelectedScreen={setSelectedScreen} horses={horses} setHorses={setHorses} />
      ) : selectedScreen === 'Quiz' ? (
        <QuizzHippodromeScreen setSelectedScreen={setSelectedScreen} isQuizStarted={isQuizStarted} setIsQuizStarted={setIsQuizStarted} />
      ) : null}

      {selectedScreen !== 'BubblesGame' &&
        selectedScreen !== 'LocDetails' &&
        selectedScreen !== 'Settings' &&
        !(selectedScreen === 'Quiz' && isQuizStarted) && (
          <View
            style={{
              position: 'absolute',
              bottom: dimensions.height * 0.035,
              backgroundColor: '#23263C',
              width: dimensions.width * 0.93,
              paddingHorizontal: dimensions.width * 0.01,
              borderRadius: dimensions.width * 0.034,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
              paddingVertical: dimensions.height * 0.01,
              paddingHorizontal: dimensions.width * 0.05,
              zIndex: 5000,
              shadowColor: '#000',
              shadowOffset: {
                width: 3,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {bottomBtns.map((button, index) => (
              <TouchableOpacity
                key={button.id}
                onPress={() => setSelectedScreen(button.screen)}
                style={{
                  padding: dimensions.height * 0.01,
                  alignItems: 'center',
                  opacity: selectedScreen === button.screen ? 1 : 0.5,
                }}
              >
                <Image
                  source={button.btnIcon}
                  style={{
                    width: dimensions.height * 0.028,
                    height: dimensions.height * 0.028,
                    textAlign: 'center'
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.03,
                    textAlign: 'center',
                    fontWeight: 300,
                    marginTop: dimensions.height * 0.01,
                  }}>
                  {button.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
    </View>
  );
};

export default HomeScreen;
