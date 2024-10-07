export const PRIORITY = {
  CRITICAL: 'critical',
  MODERATE: 'moderate',
  OPTIONAL: 'optional',
  NONE: 'none',
} as const;

export const PRIORITY_COLOR = {
  [PRIORITY.CRITICAL]: 'red.400',
  [PRIORITY.MODERATE]: 'amber.400',
  [PRIORITY.OPTIONAL]: 'emerald.400',
  [PRIORITY.NONE]: 'slate.300',
} as const;

export const PRIORITY_ORDER = {
  critical: 1,
  moderate: 2,
  optional: 3,
  none: 4,
};
