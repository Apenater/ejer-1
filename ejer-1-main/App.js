import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [personaReserva, setPersonaReserva] = useState('');
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFechaReserva(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const agregarCliente = () => {
    if (!nombre.trim()) {
      alert('Por favor, introduce un nombre.');
      return;
    }

    const nuevoCliente = {
      id: clientes.length + 1,
      nombre: nombre,
      fechaReserva: fechaReserva,
      personaReserva: personaReserva,
    };

    setClientes([...clientes, nuevoCliente]);
    setNombre('');
    setFechaReserva(new Date());
    setPersonaReserva('');
    setModalVisible(false);
  };

  const eliminarCliente = (id) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Cliente" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Cliente"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Persona reserva"
              value={personaReserva}
              onChangeText={setPersonaReserva}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={showDatepicker}>
              <Text>Seleccionar fecha de Reserva</Text>
            </TouchableOpacity>
            <Text>Seleccionado: {fechaReserva.toLocaleString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale="es-ES"
              />
            )}
            <Button title="Agregar Cliente" onPress={agregarCliente} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={clientes}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.clienteItem}>
            <View style={styles.conte}>
              <Text style={styles.clienteNombre}>{item.id}</Text>
              <TouchableOpacity
                style={styles.buttonEliminar}
                onPress={() => eliminarCliente(item.id)}>
                <Text style={styles.clienteNombre}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.clienteNombre}>{item.nombre}</Text>
            <Text style={styles.clienteFecha}>
              Fecha de Reserva: {item.fechaReserva.toDateString()}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  clienteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteFecha: {
    fontSize: 16,
  },
  conte: {
    flexDirection: 'row',
  },
  buttonEliminar: {
    marginLeft: 300,
  },
});

export default App;
