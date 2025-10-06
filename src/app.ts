import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "@xterm/xterm/css/xterm.css";
import { CommandsManager } from "./command";

class TerminalApp {
  private terminal: Terminal;
  private fitAddon: FitAddon;
  private webLinksAddon: WebLinksAddon;

  private currentDirectory: string = "~";
  private username: string = "user";
  private commandsManager: CommandsManager;

  constructor() {
    this.terminal = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", monospace',
    });

    this.fitAddon = new FitAddon();
    this.webLinksAddon = new WebLinksAddon(this.handleLinkClick.bind(this));

    this.terminal.loadAddon(this.fitAddon);
    this.terminal.loadAddon(this.webLinksAddon);

    this.commandsManager = new CommandsManager(this.terminal);

    this.terminal.onData((data) => {
      const code = data.charCodeAt(0);

      // Enter key
      if (code === 13) {
        this.terminal.write("\r\n");
        this.commandsManager.runCommand();
        this.commandsManager.setInput("");
        this.showPrompt();
        return;
      }

      // Backspace key
      if (code === 127) {
        if (this.commandsManager.input.length > 0) {
          this.commandsManager.setInput(
            this.commandsManager.input.slice(0, -1)
          );
          this.terminal.write("\b \b");
        }

        return;
      }

      if (code >= 32 && code <= 126) {
        this.commandsManager.input += data;
        this.terminal.write(data);
      }
    });
  }

  private handleLinkClick(_event: MouseEvent, uri: string): void {
    console.log("Clicked link:", uri);
    window.open(uri, "_blank");
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
