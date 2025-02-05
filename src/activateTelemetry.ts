import * as vscode from "vscode";
import { PostHog } from "posthog-node";
import { randomUUID } from "crypto";

export type TrackEvent = (
  eventName: string,
  properties?: { [key: string]: any }
) => void;

const key = "phc_pCt2zPQylp5x5dEKMB3TLM2hKBp7aLajUBgAfysPnpd";
const host = "https://eu.i.posthog.com";

let posthogClient: PostHog | undefined;
let trackingAllowed = false;

export function activateTelemetry(
  context: vscode.ExtensionContext
): TrackEvent {
  const config = vscode.workspace.getConfiguration("telemetry");
  trackingAllowed = config.get<boolean>("enableTelemetry", true);
  const trackEvent = createtrackEvent(context, trackingAllowed);

  if (!trackingAllowed) return trackEvent;

  posthogClient = new PostHog(key, { host });

  trackEvent("extensionActivated", {
    time: new Date().toISOString(),
  });

  const hello = vscode.commands.registerCommand("seqera-ai.testEvent", () => {
    trackEvent("testEvent", {
      testProp: 123,
    });
    vscode.window.showInformationMessage("Hello World!");
  });

  context.subscriptions.push(hello);

  return trackEvent;
}

function createtrackEvent(
  context: vscode.ExtensionContext,
  trackingAllowed: boolean
) {
  if (!trackingAllowed) return () => {};

  return async (eventName: string, properties?: { [key: string]: any }) => {
    try {
      if (!posthogClient) return;
      posthogClient.capture({
        distinctId: getUserID(context),
        event: eventName,
        properties,
      });
    } catch (err) {
      console.error("Track event failed", err);
    }
  };
}

function getUserID(context: vscode.ExtensionContext): string {
  let anonId = context.globalState.get<string>("anonId");
  if (!anonId) {
    anonId = randomUUID();
    context.globalState.update("anonId", anonId);
  }
  return anonId;
}

export function deactivateTelemetry() {
  if (trackingAllowed && posthogClient) {
    return posthogClient.shutdown();
  }
}
