import * as vscode from "vscode";
import {
  activateLanguageServer,
  stopLanguageServer,
} from "./activateLanguageServer";
import { activateChatbot } from "./activateChatbot";
import { activateAuth } from "./activateAuth";

export async function activate(context: vscode.ExtensionContext) {
  // activateLanguageServer(context);
  activateChatbot(context);
  await activateAuth(context);
}

export function deactivate(): Thenable<void> | undefined {
  return stopLanguageServer();
}
