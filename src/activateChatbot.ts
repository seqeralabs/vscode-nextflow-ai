import * as vscode from "vscode";
import { createHandler } from "./chatbot";
import type { TrackEvent } from "./activateTelemetry";

export function activateChatbot(
  context: vscode.ExtensionContext,
  trackEvent: TrackEvent
) {
  console.log("🟢 Seqera extension activated");

  // Handle Cursor
  if (vscode.env.appName.includes("Cursor")) {
    // Do nothing
    return;
  }

  // Create the chat participant
  const chatHandler = createHandler();
  const chatParticipant = vscode.chat.createChatParticipant(
    "nextflow.chatbot",
    chatHandler
  );
  context.subscriptions.push(chatParticipant);

  // Commands
  // Note: must match commands configured in package.json

  const openChat = vscode.commands.registerCommand(
    "nextflow.openChat",
    async () => {
      await vscode.commands.executeCommand("workbench.action.chat.open", {
        query: "@Seqera ",
        isPartialQuery: true,
      });
      trackEvent("openChat", { someData: 123 });
    }
  );

  const writeTest = vscode.commands.registerCommand(
    "nextflow.writeTest",
    async () => {
      await vscode.commands.executeCommand("workbench.action.chat.open", {
        query: "@Seqera /nf-test",
      });
      trackEvent("writeTest", { someData: 123 });
    }
  );

  context.subscriptions.push(openChat);
  context.subscriptions.push(writeTest);
}

export default { activateChatbot };
