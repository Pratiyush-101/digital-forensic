/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  category?: string;
  notes?: string[]; // Presenter notes for the BCA Seminar
}

export interface TimelineStep {
  label: string;
  description: string;
  iconName: string;
}

export interface ToolItem {
  name: string;
  description: string;
  type: string; // "Open Source", "Commercial", "Network", etc.
  capabilities: string[];
  color: string; // Tailwind hex or class name
  icon: string;
}

export interface EvidenceNode {
  name: string;
  type: string;
  x: number; // Percent from left
  y: number; // Percent from top
  icon: string;
}
