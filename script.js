class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return

        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')



const objCalculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        objCalculator.appendNumber(button.innerText)
        objCalculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        objCalculator.chooseOperation(button.innerText)
        objCalculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    objCalculator.compute()
    objCalculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    objCalculator.clear()
    objCalculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    objCalculator.delete()
    objCalculator.updateDisplay()
})