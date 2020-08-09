/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const PushNotification = require('react-native-push-notification');

const Panel = function () {
  const [pesoTotal, setPesoTotal] = useState(0);
  const [liquidoNivel, setLiquidoNivel] = useState(1);
  const [alertaList, setAlertaList] = useState(2);

  const isBuzonVacio = (peso) => peso === 0;
  const LIQUIDO_CAPACIDAD = 100;

  const virtualH = (base, actualPer) => {
    const per = 100 - Math.min(100, (100 * actualPer) / base);
    return per + '%';
  };

  const actualPer = () => (100 * liquidoNivel) / LIQUIDO_CAPACIDAD;

  const mensajes = {
    buzon: {
      OCUPADO: 'Llego algo en el buzon.',
    },
    desinfectante: {
      VACIO: 'Desinfectante vacio',
      BAJO: 'Desinfectante bajo',
    },
  };
  const styles = {
    dato: {textTransform: 'uppercase'},
    title: {fontWeight: 'bold', textTransform: 'uppercase', fontSize: 28},
  };

  return (() => {
    if (!isBuzonVacio(pesoTotal)) {
      PushNotification.localNotification({
        message: mensajes.buzon.OCUPADO,
      });
    }

    const per100 = actualPer();
    if (per100 === 0) {
      PushNotification.localNotification({
        message: mensajes.desinfectante.VACIO,
      });
    } else if (per100 <= 10) {
      PushNotification.localNotification({
        message: mensajes.desinfectante.BAJO,
      });
    }

    return (
      <View>
        <View style={{height: 200, borderWidth: 4, position: 'relative'}}>
          <View style={{height: '50%', backgroundColor: '#9acd32'}}>
            <View
              style={{
                backgroundColor: '#fff',
                height: virtualH(50, Math.max(0, actualPer() - 50)),
              }}
            />
          </View>
          <View style={{height: '40%', backgroundColor: '#ffd700'}}>
            <View
              style={{
                backgroundColor: '#fff',
                height: virtualH(40, Math.max(0, actualPer() - 10)),
              }}
            />
          </View>
          <View style={{height: '10%', backgroundColor: '#ff4500'}}>
            <View
              style={{
                backgroundColor: '#fff',
                height: virtualH(10, actualPer()),
              }}
            />
          </View>
        </View>
        <View>
          <Text style={{textAlign: 'center', fontSize: 48}}>
            {actualPer()}%
          </Text>
        </View>
        <Text style={styles.title}>Buzon</Text>
        <Text style={styles.dato}>
          {isBuzonVacio(pesoTotal) ? 'Vacio' : 'Ocupado'}
        </Text>
        <Text style={styles.dato}>Peso: {pesoTotal}</Text>

        <Text style={styles.title}>Desinfectante</Text>
        <Text style={styles.dato}>Liquido: {liquidoNivel}</Text>
        <Text style={styles.dato}>Capacidad: {LIQUIDO_CAPACIDAD}</Text>
        <Button
          onPress={() => {
            setLiquidoNivel(Math.floor(Math.random() * 100));
            setPesoTotal(Math.floor(Math.random() * 2));
          }}
          title="random valores"
        />
      </View>
    );
  })();
};

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{padding: 20}}>
            <Panel />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
