import React from 'react';
import Chip from '@mui/material/Chip';
import { DEFAULT_PRIORITY, getPriorityColors, getPriorityLabel } from '../constants/priority';

/**
 * Render a task priority as a colored pill.
 *
 * @param {{priority?: string}} props - Component props.
 * @returns {JSX.Element} Styled chip containing the priority label.
 */
function PriorityPill({ priority = DEFAULT_PRIORITY }) {
  const { backgroundColor, textColor } = getPriorityColors(priority);

  return (
    <Chip
      data-testid={`priority-pill-${(priority || DEFAULT_PRIORITY).toLowerCase()}`}
      label={getPriorityLabel(priority)}
      size="small"
      sx={{
        backgroundColor,
        color: textColor,
        fontWeight: 600,
      }}
    />
  );
}

export default PriorityPill;
