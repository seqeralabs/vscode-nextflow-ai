import * as vscode from "vscode";
import {
  activateLanguageServer,
  stopLanguageServer,
} from "./activateLanguageServer";
import { activateChatbot } from "./activateChatbot";
import { activateAuth } from "./activateAuth";

export function activate(context: vscode.ExtensionContext) {
  activateAuth(context);
  // activateLanguageServer(context);
  activateChatbot(context);
}

export function deactivate(): Thenable<void> | undefined {
  return stopLanguageServer();
}
