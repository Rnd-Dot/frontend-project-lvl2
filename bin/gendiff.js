import { Command } from "commander";

const program = new Command();

program
  .name("gendiff")
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0',  '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')

program.parse();