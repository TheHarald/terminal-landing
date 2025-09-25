import { Terminal } from "xterm";

export class CommandsManager {
  private terminal: Terminal;
  constructor(terminal: Terminal) {
    this.terminal = terminal;
  }

  private showHelp(): void {
    this.terminal.write("\r\n\x1b[1;36mДОСТУПНЫЕ КОМАНДЫ:\x1b[0m\r\n");
    this.terminal.write("┌─────────────────────────────────────────────┐\r\n");
    this.terminal.write(
      "│ \x1b[1;33mhelp\x1b[0m       - Показать справку               │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mclear\x1b[0m      - Очистить терминал              │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mcd\x1b[0m         - Сменить директорию             │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mls\x1b[0m         - Список файлов                  │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mpwd\x1b[0m        - Текущая директория             │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mwhoami\x1b[0m     - Текущий пользователь           │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mdate\x1b[0m       - Текущая дата                   │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mtime\x1b[0m       - Текущее время                  │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mecho\x1b[0m       - Вывести текст                  │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mtheme\x1b[0m      - Сменить тему                   │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mabout\x1b[0m      - Обо мне                        │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mskills\x1b[0m     - Мои навыки                     │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mprojects\x1b[0m   - Мои проекты                    │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33mcontact\x1b[0m    - Контакты                       │\r\n"
    );
    this.terminal.write(
      "│ \x1b[1;33msocial\x1b[0m     - Социальные сети                │\r\n"
    );
    this.terminal.write("└─────────────────────────────────────────────┘\r\n");
  }

  private clearTerminal(): void {
    this.terminal.clear();
  }
}
