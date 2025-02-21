import * as vscode from "vscode";
import {
  activateLanguageServer,
  stopLanguageServer,
} from "./activateLanguageServer";
import { activateChatbot } from "./activateChatbot";
import { activateReadme } from "./activateReadme";
import { activateAuth } from "./activateAuth";

export async function activate(context: vscode.ExtensionContext) {
  activateReadme(context);
  activateChatbot(context);
  // activateLanguageServer(context);
  await activateAuth(context);
}

export function deactivate(): Thenable<void> | undefined {
  return stopLanguageServer();
}
