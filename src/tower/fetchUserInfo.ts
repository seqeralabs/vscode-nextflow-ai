import * as vscode from "vscode";
import { platformApiUrl } from "./constants";
import { secretKeys } from "../auth/constants";

export type User = {
  id: number;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  description?: string;
  avatar?: string;
  avatarId?: string;
  notification?: string;
  termsOfUseConsent: boolean;
  marketingConsent: boolean;
  lastAccess: string;
  dateCreated: string;
  lastUpdated: string;
  deleted: boolean;
  trusted: boolean;
  options: {
    githubToken?: string;
    maxRuns?: number;
    hubspotId?: number;
  };
};

export type UserInfo = {
  user: User;
  needConsent: boolean;
  defaultWorkspaceId: number;
};

const fetchUserInfo = async (
  context: vscode.ExtensionContext
): Promise<UserInfo | null> => {
  const accessToken = await context.secrets.get(secretKeys.accessToken);
  const endpointURL = `${platformApiUrl}/api/user-info`;

  if (!accessToken) {
    console.log("🟢 Seqera: No access token stored");
    return null;
  }

  const response = await fetch(endpointURL, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 401) throw new Error("Unauthorized");

  const data = await response.json();
  return data as UserInfo;
};

export default async (
  context: vscode.ExtensionContext
): Promise<UserInfo | null> => {
  try {
    return await fetchUserInfo(context);
  } catch (error: any) {
    console.log("🔴 Seqera:", error.message);
    console.error(error);
    return null;
  }
};
