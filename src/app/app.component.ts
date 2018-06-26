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


  previousResult: string = null;

  currentResult = '0';

  operator: Operator = null;

  lastClickedButton: string = null;
  /**
   * Handles numeric click inputs.
   */
  click(n: number) {
    if (this.lastClickedButton in Operator || this.currentResult === '0') {
      this.currentResult = n.toString();
    }
    else
      this.currentResult = this.currentResult.concat(n.toString());

    this.lastClickedButton = n.toString();
  }


  /**
   * Perform the arithmetic operations based on 2 numbers and the operator entered
   */
  doCalculations(): void {
    const num1: number = +this.currentResult;
    const num2: number = +this.previousResult;

    switch (this.operator) {
      case Operator.ADD: {
        this.currentResult = (num2 + num1).toString();
        break;
      }
      case Operator.SUBTRACT: {
        this.currentResult = (num2 - num1).toString();
        break;
      }
      case Operator.MULTIPLY: {
        this.currentResult = (num2 * num1).toString();
        break;
      }
      case Operator.DIVIDE: {
        this.currentResult = (num2 / num1).toString();
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
    this.lastClickedButton = operator;

    if (this.operator != null) {
      this.doCalculations();
      this.operator = operator;
    } else {
      this.operator = operator;
    }

    this.previousResult = this.currentResult;
  }

  clear(): void {
    this.currentResult = '0';
    this.previousResult = null;
    this.operator = null;
  }
}
