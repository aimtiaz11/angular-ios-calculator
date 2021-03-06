import { Component } from '@angular/core';

enum Operator {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE'
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  previousNum: string = null;

  /**
   * currentNum reflects the result view. Initialised to 0.
   */
  currentNum = '0';

  // Which operation is being performed - Add, subtract etc.
  operator: Operator = null;

  /**
   * The very last number clicked
   */
  latestClickedNumber: number = null;

  /**
   * Records which button was last click. This includes numbers + operator (add, subtract)
   */
  lastClickedButton: string = null;

  /**
   * Handles numeric click inputs.
   */
  click(n: number) {
    this.latestClickedNumber = n;
    if (this.lastClickedButton in Operator || this.currentNum === '0') {
      this.currentNum = n.toString();
    }
    else
      this.currentNum = this.currentNum.concat(n.toString());

    this.lastClickedButton = n.toString();
  }


  /**
   * Perform the arithmetic operations based on 2 numbers and the operator entered
   */
  doCalculations(): void {
    const num1: number = +this.currentNum;
    const num2: number = +this.previousNum;

    switch (this.operator) {
      case Operator.ADD: {
        this.currentNum = (num2 + num1).toString().substr(0, 9);
        break;
      }
      case Operator.SUBTRACT: {
        this.currentNum = (num2 - num1).toString().substr(0, 9);
        break;
      }
      case Operator.MULTIPLY: {
        this.currentNum = (num2 * num1).toString().substr(0, 9);
        break;
      }
      case Operator.DIVIDE: {
        this.currentNum = (num2 / num1).toString().substr(0, 9);
        break;
      }
      default: {
        throw new Error('Unable to determine operator type');
      }
    }
  }

  /**
   * Sets the operator variable and performs the calculations by calling the doCalculations helper method.
   * @param operator - Enum of permitted arithmetic operations
   */
  operate(operator: Operator): void {

    // clicking on same operator twice
    if (this.lastClickedButton === operator)
      return;
    else if (this.lastClickedButton in Operator) {
      // if previous click was operator and this click is another operator(changing) then just change the operator
      this.operator = operator;
      this.lastClickedButton = operator;
      return;
    }

    this.lastClickedButton = operator;

    if (this.operator != null)
      this.doCalculations();

    this.operator = operator;

    this.previousNum = this.currentNum;
  }

  /**
   * Clears the very last entry.
   */
  clear(): void {
    this.currentNum = '0';
  }

  /**
   * Resets the calculator back to original state.
   */
  allClear(): void {
    this.currentNum = '0';
    this.previousNum = null;
    this.operator = null;
  }
}
