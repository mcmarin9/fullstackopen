const { test } = require('node:test') // Importa la función 'test' del módulo 'node:test'
const assert = require('node:assert') // Importa el módulo 'assert' para realizar aserciones en las pruebas

const reverse = require('../utils/for_testing').reverse // Importa la función 'reverse' del archivo '../utils/for_testing'

// Prueba para verificar la inversión de una cadena de un solo carácter
test('reverse of a', () => {
  const result = reverse('a') // Llama a la función 'reverse' con el argumento 'a'

  assert.strictEqual(result, 'a') // Verifica que el resultado sea 'a'
})

// Prueba para verificar la inversión de la cadena 'react'
test('reverse of react', () => {
  const result = reverse('react') // Llama a la función 'reverse' con el argumento 'react'

  assert.strictEqual(result, 'tcaer') // Verifica que el resultado sea 'tcaer'
})

// Prueba para verificar la inversión de la cadena 'saippuakauppias'
test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias') // Llama a la función 'reverse' con el argumento 'saippuakauppias'

  assert.strictEqual(result, 'saippuakauppias') // Verifica que el resultado sea 'saippuakauppias'
})