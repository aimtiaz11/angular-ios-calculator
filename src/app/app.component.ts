import { Component } from '@angular/core';


enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

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


  previousResult: number = null;
  currentResult = 0;

  operator: Operator = null;


  /**
   * Handles numeric click inputs.
   */
  click(n: number) {
    if (this.currentResult !== 0) {
      this.previousResult = this.currentResult;
    }
    this.currentResult = n;
  }


  /**
   * Perform the arithmetic operations based on 2 numbers and the operator entered
   */
  doCalculations(): void {
    switch (this.operator) {
      case Operator.ADD: {
        this.currentResult = this.previousResult + this.currentResult;
        break;
      }
      case Operator.SUBTRACT: {
        this.currentResult = this.previousResult - this.currentResult;
        break;
      }
      case Operator.MULTIPLY: {
        this.currentResult = this.previousResult * this.currentResult;
        break;
      }
      case Operator.DIVIDE: {
        this.currentResult = this.previousResult / this.currentResult;
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
    if (this.operator != null) {
      this.doCalculations();
      this.operator = operator;
    } else {
      this.operator = operator;
    }
  }

  clear(): void {
    this.currentResult = 0;
    this.previousResult = null;
    this.operator = null;
  }
}
