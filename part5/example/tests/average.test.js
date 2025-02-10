const { test, describe } = require('node:test') // Importa las funciones 'test' y 'describe' del módulo 'node:test'
const assert = require('node:assert') // Importa el módulo 'assert' para realizar aserciones en las pruebas

const average = require('../utils/for_testing').average // Importa la función 'average' del archivo '../utils/for_testing'

// Describe un conjunto de pruebas para la función 'average'
describe('average', () => {
  // Prueba para verificar que el promedio de un solo valor es el valor en sí mismo
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1) // Verifica que el promedio de [1] sea 1
  })

  // Prueba para verificar que el promedio de varios valores se calcula correctamente
  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5) // Verifica que el promedio de [1, 2, 3, 4, 5, 6] sea 3.5
  })

  // Prueba para verificar que el promedio de un array vacío es cero
  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0) // Verifica que el promedio de [] sea 0
  })
})