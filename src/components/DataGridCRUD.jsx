import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { fetchData } from '../network/utils';

const EditToolbar = React.memo(({ setRows, setRowModesModel }) => {
  const handleInsertClick = React.useCallback(() => {
    let newId = 0;
    setRows(oldRows => {
      const maxId = oldRows.length;
      newId = maxId + 1;
      return [...oldRows, { id: newId, userID: newId, isNew: true }];
    });
    setRowModesModel(oldModel => ({
      ...oldModel,
      [newId]: {
        mode: GridRowModes.Edit,
        fieldToFocus: 'username',
      },
    }));
  }, [setRows, setRowModesModel]);

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleInsertClick}
      >
        增加一条记录
      </Button>

      <Button
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleInsertClick}
      >
        保存提交上传
      </Button>
      {/* 导出按钮 */}
      <GridToolbarExport />
    </GridToolbarContainer>
  );
});

export default function FullFeaturedCrudGrid({
  initialRows,
  initialColumns,
  getRowId,
  url,
}) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = React.useCallback(
    id => () => {
      setRowModesModel(oldModel => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit },
      }));
      console.log(1);
    },
    []
  );

  const handleSaveClick = React.useCallback(
    id => () => {
      setRowModesModel(oldModel => ({
        ...oldModel,
        [id]: { mode: GridRowModes.View },
      }));
      console.log('handleSaveClick');
    },
    []
  );

  const handleDeleteClick = React.useCallback(
    id => async () => {
      const confirmDelete = window.confirm('确定要删除这条记录吗？');
      if (confirmDelete) {
        const responseData = await fetchData(
          `${url}/${id}`,
          'DELETE',
          null
        );
        if (responseData.status !== 500) {
          setRows(oldRows => oldRows.filter(row => row.id !== id));
          console.log('Delete: ', `${url}/${id}`);
        } else {
          console.log(`cannot delete ${url}/${id}`);
          window.alert(`cannot delete ${url}/${id}`);
        }
      }
    },
    [url]
  );

  const handleCancelClick = React.useCallback(
    id => () => {
      setRowModesModel(oldModel => ({
        ...oldModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      }));

      const editedRow = rows.find(row => row.id === id);
      if (editedRow?.isNew) {
        setRows(oldRows => oldRows.filter(row => row.id !== id));
      }
    },
    [rows]
  );

  const processRowUpdate = React.useCallback(
    async newRow => {
      // 在 processRowUpdate 中判断当前行是新增还是已存在的
      const isNew = newRow.isNew ?? false;
      const updatedRow = { ...newRow, isNew: false };
      setRows(oldRows =>
        oldRows.map(row => (row.id === newRow.id ? updatedRow : row))
      );
      console.log('processRowUpdate');
      // 打印新增的记录或者编辑并保存后的原有记录
      console.log('Row saved:', updatedRow);
      if (isNew) {
        console.log('POST');
        await fetchData(`${url}`, 'POST', updatedRow);
      } else {
        console.log(`PUT ${updatedRow.id}`);
        await fetchData(`${url}/${updatedRow.id}`, 'PUT', updatedRow);
      }
      return updatedRow;
    },
    [url]
  );

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel);
  };

  const columns = React.useMemo(
    () => [
      ...initialColumns,
      {
        field: 'actions',
        type: 'actions',
        headerName: '操作',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode =
            rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{ color: 'primary.main' }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ],
    [
      handleEditClick,
      handleSaveClick,
      handleCancelClick,
      handleDeleteClick,
      initialColumns,
      rowModesModel,
    ]
  );

  return (
    <DataGrid
      getRowId={getRowId}
      rows={rows}
      columns={columns}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{ toolbar: EditToolbar }}
      slotProps={{
        toolbar: {
          setRows: setRows,
          setRowModesModel: setRowModesModel,
          rows: rows,
          url: url,
        },
      }}
    />
  );
}
