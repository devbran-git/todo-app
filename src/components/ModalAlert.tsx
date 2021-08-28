import React from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

interface ModalTypes {
  title: string
  alert: string
}

type ModalPropTypes = {
  modalTypes: ModalTypes
  modalIsVisible: boolean
  handleAlert: (type: string) => void
}

export function ModalAlert({
  modalIsVisible,
  modalTypes,
  handleAlert
}: ModalPropTypes) {

  return (
    <Modal
      visible={modalIsVisible}
      transparent
    >
      <View style={styles.container}>

        <View style={styles.alertContent}>
          <Text style={styles.title}>{modalTypes.title}</Text>
          <Text style={styles.alert}>{modalTypes.alert}</Text>
        </View>

        {modalTypes.title === 'Remover item' ?
          <View style={styles.doubleButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleAlert('')}
            >
              <Text style={styles.textButton}>Não</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => handleAlert('Sim')}
            >
              <Text style={[styles.textButton, { color: '#8257E5' }]}>Sim</Text>
            </TouchableOpacity>
          </View>
          :
          <TouchableOpacity
            style={styles.uniqueButton}
            activeOpacity={0.7}
            onPress={() => handleAlert('')}
          >
            <Text style={styles.textButton}>OK</Text>
          </TouchableOpacity>
        }
      </View>
    </Modal>
  )
}




const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    top: '35%',
    borderRadius: 5,
    backgroundColor: '#FFF',
    justifyContent: 'space-between'
  },
  alertContent: {
    padding: 24
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#525252',
    marginBottom: 16
  },
  alert: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#666666'
  },
  uniqueButton: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8257E5',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  textButton: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFF',
  },
  doubleButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '50%',
    backgroundColor: '#8257E5',
    borderBottomLeftRadius: 5
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '50%',
    backgroundColor: '#F1EDFC',
    borderBottomRightRadius: 5
  },
})

