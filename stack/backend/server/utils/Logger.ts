import chalk from "chalk"

class Logger {
  private where: string

  constructor(where: string) {
    this.where = where
  }

  public warn(...args: any) {
    console.log(chalk.yellow(this.whereFrom(), ...args))
  }

  public error(...args: any) {
    // TODO - send to loggly or other logging service
    console.log(chalk.red("\n--- ERROR ----"))
    console.log(chalk.red(this.whereFrom(), ...args))
    console.log(chalk.red("\n"))
  }

  public info(...args: any) {
    console.log(chalk.grey(this.whereFrom(), ...args))
  }
  public log(...args: any) {
    console.log(chalk.grey(this.whereFrom(), ...args))
  }

  private whereFrom() {
    return `[${ this.where }]\t`
  }
}

export default Logger
