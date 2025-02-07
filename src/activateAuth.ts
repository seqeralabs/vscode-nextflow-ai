import * as vscode from "vscode";
import startDeviceFlow from "./auth/startDeviceFlow";

export function activateAuth(context: vscode.ExtensionContext) {
  const loginCmd = vscode.commands.registerCommand("seqera-ai.login", () => {
    startDeviceFlow(context);
  });

  context.subscriptions.push(loginCmd);
}
