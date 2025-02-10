import * as vscode from "vscode";
import { activateLanguageServer, stopLanguageServer } from "./activateLanguageServer";
import { activateChatbot } from "./activateChatbot";
import { activateTelemetry, deactivateTelemetry } from "./activateTelemetry";

export function activate(context: vscode.ExtensionContext) {
  const trackEvent = activateTelemetry(context);
  activateLanguageServer(context);
  activateChatbot(context, trackEvent);
}

export function deactivate(
  context: vscode.ExtensionContext
): Thenable<void> | undefined {
  deactivateTelemetry(context);
  return stopLanguageServer();
}
