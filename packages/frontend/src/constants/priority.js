export const PRIORITY_VALUES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  MINOR: 'minor',
};

export const DEFAULT_PRIORITY = PRIORITY_VALUES.MEDIUM;

/**
 * Convert a priority value into a user-facing label.
 *
 * @param {string} priority - Priority value from API or form state.
 * @returns {string} Display label for the priority.
 */
export const getPriorityLabel = (priority) => {
  const normalizedPriority = (priority || DEFAULT_PRIORITY).toLowerCase();

  if (normalizedPriority === PRIORITY_VALUES.HIGH) {
    return 'High priority';
  }

  if (normalizedPriority === PRIORITY_VALUES.MINOR) {
    return 'Minor priority';
  }

  return 'Medium priority';
};

/**
 * Return Material-friendly colors for each priority level.
 *
 * @param {string} priority - Priority value from API or form state.
 * @returns {{backgroundColor: string, textColor: string}} Color tokens for a pill.
 */
export const getPriorityColors = (priority) => {
  const normalizedPriority = (priority || DEFAULT_PRIORITY).toLowerCase();

  if (normalizedPriority === PRIORITY_VALUES.HIGH) {
    return { backgroundColor: '#D32F2F', textColor: '#FFFFFF' };
  }

  if (normalizedPriority === PRIORITY_VALUES.MINOR) {
    return { backgroundColor: '#2E7D32', textColor: '#FFFFFF' };
  }

  return { backgroundColor: '#ED6C02', textColor: '#111827' };
};