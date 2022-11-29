import React, { FC, useState } from 'react';
import { Box, Collapse } from '@mui/material';

import ColumnTitleBox from './ColumnTitleBox';
import EditColumnTitleBox from './EditColumnTitleBox';
type Props = {
  columnId: string;
  title: string;
};

const ColumnHeader: FC<Props> = ({ columnId, title }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  return (
    <Box width="100%">
      <Collapse in={isEditOpen}>
        <EditColumnTitleBox
          title={title}
          columnId={columnId}
          closeEditBox={() => setIsEditOpen(false)}
        />
      </Collapse>
      <Collapse in={!isEditOpen}>
        <ColumnTitleBox title={title} onClick={() => setIsEditOpen(true)} columnId={columnId} />
      </Collapse>
    </Box>
  );
};

export default ColumnHeader;
