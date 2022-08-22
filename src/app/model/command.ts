export interface Command {
  [key: string]: string | boolean | Command;
}
