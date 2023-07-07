import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const initialMatrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const MatrixDeterminant: React.FC = () => {
  const [matrix, setMatrix] = useState<number[][]>(initialMatrix);

  const [determinant, setDeterminant] = useState<number | null>(null);

  // Fungsi untuk menghitung determinan matriks 3x3
  const calculateDeterminant = () => {
    const [row1, row2, row3] = matrix;
    const det =
      row1[0] * (row2[1] * row3[2] - row2[2] * row3[1]) -
      row1[1] * (row2[0] * row3[2] - row2[2] * row3[0]) +
      row1[2] * (row2[0] * row3[1] - row2[1] * row3[0]);
    setDeterminant(det);
  };

  const updateMatrixValue = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = Number(value);
    setMatrix(newMatrix);
  };

  const resetMatrix = () => {
    const blankMatrix = initialMatrix.map((row) => row.map(() => ""));
    setMatrix(blankMatrix);
    setDeterminant(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Matriks 3x3</Text>
      <View style={styles.inputContainer}>
        {matrix.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((col, colIndex) => (
              <TextInput
                key={colIndex}
                style={styles.input}
                placeholder={`Matriks[${rowIndex}][${colIndex}]`}
                keyboardType="numeric"
                value={col.toString()}
                onChangeText={(value) => updateMatrixValue(rowIndex, colIndex, value)}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Hitung Determinan" onPress={calculateDeterminant} />
        <Button title="Reset Nilai" onPress={resetMatrix} />
      </View>

      {determinant !== null && (
        <Text style={styles.result}>Hasil Determinan: {determinant}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 0,
    height: 50,
    borderColor: 'gray',
    borderWidth: 3,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MatrixDeterminant;
