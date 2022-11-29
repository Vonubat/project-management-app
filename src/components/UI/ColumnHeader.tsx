import React, { FC, useState } from 'react';

import ColumnTitleBox from './ColumnTitleBox';
import EditColumnTitleBox from './EditColumnTitleBox';

type Props = {
  columnId: string;
  title: string;
};

const ColumnHeader: FC<Props> = ({ columnId, title }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  if (isEditOpen) {
    return (
      <EditColumnTitleBox
        title={title}
        columnId={columnId}
        closeEditBox={() => setIsEditOpen(false)}
      />
    );
  }

  return <ColumnTitleBox title={title} onClick={() => setIsEditOpen(true)} columnId={columnId} />;
};

export default ColumnHeader;
