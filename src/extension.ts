import * as vscode from "vscode";
import { activateLanguageServer, stopLanguageServer } from "./activateLanguageServer";
import { activateChatbot } from "./activateChatbot";
import { activateTelemetry, deactivateTelemetry } from "./activateTelemetry";

export function activate(context: vscode.ExtensionContext) {
  activateLanguageServer(context);
  activateChatbot(context);
  activateTelemetry(context);
}

export function deactivate(): Thenable<void> | undefined {
  deactivateTelemetry();
  return stopLanguageServer();
}
