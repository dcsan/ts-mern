import chalk from "chalk"

class Logger {
  private where: string
  private testing: boolean

  constructor(where: string) {
    if (process.env.TESTING) {
      this.testing = true
    }
    this.where = where
  }

  public warn(...args: any) {
    // if (this.testing) {return}
    console.log(chalk.yellow(this.whereFrom(), ...args))
  }

  public error(...args: any) {
    // if (this.testing) {return}
    console.log(chalk.red("\n--- ERROR ----"))
    console.log(chalk.red(this.whereFrom(), ...args))
    console.log(chalk.red("\n"))
    // TODO - send to loggly or other logging service
  }

  public info(...args: any) {
    if (this.testing) {return}
    console.log(chalk.grey(this.whereFrom(), ...args))
  }
  public log(...args: any) {
    if (this.testing) {return}
    console.log(chalk.grey(this.whereFrom(), ...args))
  }

  private whereFrom() {
    return `[${ this.where }]\t`
  }
}

export default Logger
