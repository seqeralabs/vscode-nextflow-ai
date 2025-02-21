import * as vscode from "vscode";
import {
  activateLanguageServer,
  stopLanguageServer,
} from "./activateLanguageServer";
import { activateChatbot } from "./activateChatbot";
import { activateReadme } from "./activateReadme";
import { activateTelemetry, deactivateTelemetry } from "./activateTelemetry";

export async function activate(context: vscode.ExtensionContext) {
  const trackEvent = await activateTelemetry(context);
  activateReadme(context);
  activateLanguageServer(context, trackEvent);
  activateChatbot(context, trackEvent);
}

export function deactivate(
  context: vscode.ExtensionContext
): Thenable<void> | undefined {
  deactivateTelemetry(context);
  return stopLanguageServer();
}
