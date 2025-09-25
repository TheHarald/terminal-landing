import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "@xterm/xterm/css/xterm.css";

class TerminalApp {
  private terminal: Terminal;
  private fitAddon: FitAddon;
  private webLinksAddon: WebLinksAddon;
  private currentDirectory: string = "~";
  private username: string = "user";
  private currentInput: string = "";
  private commandHistory: string[] = [];
  private historyIndex: number = -1;

  private commands: { [key: string]: (args: string[]) => void } = {};

  constructor() {
    this.terminal = new Terminal({
      cursorBlink: true,
      theme: {
        // background: "#000000",
        // foreground: "#00ff00",
        // cursor: "#00ff00",
        // selectionBackground: "#00ff0044",
      },
      fontSize: 14,
      fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", monospace',
    });

    this.fitAddon = new FitAddon();
    this.webLinksAddon = new WebLinksAddon(this.handleLinkClick.bind(this));

    this.terminal.loadAddon(this.fitAddon);
    this.terminal.loadAddon(this.webLinksAddon);

    this.initializeCommands();

    this.terminal.onData((data) => {
      const code = data.charCodeAt(0);

      // Enter key
      if (code === 13) {
        this.terminal.write("\r\n");
        this.processCommand(this.currentInput.trim());
        this.currentInput = "";
      }
      // Backspace key
      else if (code === 127) {
        if (this.currentInput.length > 0) {
          this.currentInput = this.currentInput.slice(0, -1);
          this.terminal.write("\b \b");
        }
      }
      // Printable characters
      else if (code >= 32 && code <= 126) {
        this.currentInput += data;
        this.terminal.write(data);
      }
    });
    // this.setupInputHandling();
  }

  private handleLinkClick(_event: MouseEvent, uri: string): void {
    console.log("Clicked link:", uri);
    window.open(uri, "_blank");
  }

  private initializeCommands(): void {
    this.commands = {
      // Системные команды
      help: () => this.showHelp(),
      clear: () => this.clearTerminal(),
      exit: () => this.exitTerminal(),
    };
  }

  //   private setupInputHandling(): void {}

  private processCommand(input: string): void {
    if (!input) {
      this.showPrompt();
      return;
    }

    // Добавляем в историю
    this.commandHistory.unshift(input);
    this.historyIndex = -1;

    const [command, ...args] = input.split(" ");
    const commandName = command.toLowerCase();

    if (this.commands[commandName]) {
      try {
        this.commands[commandName](args);
      } catch (error) {
        this.terminal.write(
          `\r\n\x1b[1;31mОшибка выполнения команды: ${error}\x1b[0m\r\n`
        );
        this.showPrompt();
      }
    } else {
      this.terminal.write(
        `\r\n\x1b[1;31mКоманда не найдена: ${command}\x1b[0m\r\n`
      );
      this.terminal.write(
        "Наберите \x1b[1;33mhelp\x1b[0m для списка команд\r\n"
      );
      this.showPrompt();
    }
  }

  showPrompt() {
    this.terminal.write(
      `\r\n\x1b[1;32m${this.username}\x1b[0m@portfolio:\x1b[1;34m${this.currentDirectory}\x1b[0m$ `
    );
  }

  public initialize(container: HTMLElement): void {
    try {
      this.terminal.open(container);
      this.fitAddon.fit();
      this.showPrompt();
      console.log("Terminal initialized successfully");
    } catch (error) {
      console.error("Failed to initialize terminal:", error);
    }
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
    this.showPrompt();
  }

  private clearTerminal(): void {
    this.terminal.clear();
    this.showPrompt();
  }

  private exitTerminal(): void {
    this.terminal.write(
      "\r\n\x1b[1;33mДо свидания! Возвращайтесь скорее!\x1b[0m\r\n"
    );
    // Можно добавить дополнительную логику закрытия
    this.showPrompt();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing terminal...");
  const terminalContainer = document.getElementById("terminal");

  if (terminalContainer) {
    const app = new TerminalApp();
    app.initialize(terminalContainer);
  } else {
    console.error("Terminal container not found");
  }
});

export default TerminalApp;
