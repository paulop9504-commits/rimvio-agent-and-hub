/** Capability contract — what Rimvio can do. */

export type CapabilityId = string;

export type CapabilityStatus = "draft" | "ready" | "disabled";

export type Capability = {
  id: CapabilityId;
  key: string;
  title: string;
  description?: string;
  status: CapabilityStatus;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type CapabilityActionRef = {
  capabilityId: CapabilityId;
  actionKey: string;
};

export function isCapabilityReady(capability: Capability): boolean {
  return capability.status === "ready";
}
