import React from 'react';

// grid columns definition
export const TableContext = React.createContext<{ columns: string[] }>({columns: []});
