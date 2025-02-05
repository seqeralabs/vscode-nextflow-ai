import * as vscode from "vscode";
import {
  activateLanguageServer,
  stopLanguageServer,
} from "./activateLanguageServer";
import { activateChatbot } from "./activateChatbot";
import { activateReadme } from "./activateReadme";
import { activateTelemetry, deactivateTelemetry } from "./activateTelemetry";

export function activate(context: vscode.ExtensionContext) {
  activateReadme(context);
  activateTelemetry(context);
  activateChatbot(context);
  activateLanguageServer(context);
}

export function deactivate(): Thenable<void> | undefined {
  deactivateTelemetry();
  return stopLanguageServer();
}
