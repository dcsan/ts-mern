import chalk from "chalk";

class Logger {
  private where: string;

  constructor(where: string) {
    this.where = where;
  }

  public warn(...args: any) {
    console.log(chalk.yellow(this.whereFrom(), ...args));
  }

  public error(...args: any) {
    console.log(chalk.red("--- ERROR ----"));
    console.log(chalk.red(this.whereFrom(), ...args));
  }

  public info(...args: any) {
    console.log(chalk.grey(this.whereFrom(), ...args));
  }

  private whereFrom() {
    return `[${this.where}]\t`;
  }
}

export default Logger;
