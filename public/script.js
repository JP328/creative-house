function onOff() {
  document.querySelector('#modal').classList.toggle('hide')
  document.querySelector('body').classList.toggle('hideScroll')
  document.querySelector('#modal').classList.toggle('addScroll')
}

function checkFields(event) {
  const valuesToCheck = ['title', 'category', 'image', 'description', 'link']

  const isEmpty = valuesToCheck.find(value => {
    const checkIfIsString = typeof event.target[value].value === 'string'
    const checkIfIsEmpty = !event.target[value].value.trim()

    if (checkIfIsString && checkIfIsEmpty) {
      return true
    }
  })

  console.log('isEmpty')

  if (isEmpty) {
    event.preventDefault()
    alert('Por favor, Preencha todos os campos')
  }

  for (let value of valuesToCheck) {
  }
}
