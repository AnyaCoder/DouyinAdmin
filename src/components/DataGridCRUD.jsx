import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
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

const EditToolbar = React.memo(
  ({
    setRows,
    setRowModesModel,
    idField = 'userID',
    focus = 'username',
  }) => {
    const handleInsertClick = React.useCallback(() => {
      let newId = 0;
      setRows(oldRows => {
        const maxId = oldRows.reduce(
          (max, row) => (row.id > max ? row.id : max),
          0
        );
        newId = maxId + 1;

        // 动态创建新行对象，设置指定的 id 字段
        const newRow = { id: newId, isNew: true };
        newRow[idField] = newId; // 动态设置 id 字段名称

        return [...oldRows, newRow];
      });
      setRowModesModel(oldModel => ({
        ...oldModel,
        [newId]: {
          mode: GridRowModes.Edit,
          fieldToFocus: focus,
        },
      }));
    }, [setRows, setRowModesModel, idField, focus]);

    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleInsertClick}
        >
          增加一条记录
        </Button>
        {/* 导出按钮 */}
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
);

export default function FullFeaturedCrudGrid({
  initialRows,
  initialColumns,
  idField = 'userID',
  focus = 'username',
  handleInsert,
  handleDelete,
  handleUpdate,
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
        const responseData = await handleDelete(id);
        if (responseData.status !== 500) {
          console.log('DELETE');
          setRows(oldRows => oldRows.filter(row => row.id !== id));
        } else {
          console.log('DELETE failed');
          window.alert(`cannot delete ${id}`);
        }
      }
    },
    [handleDelete]
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
        await handleInsert(updatedRow);
      } else {
        console.log(`PUT ${updatedRow.id}`);
        await handleUpdate(updatedRow.id, updatedRow);
      }
      return updatedRow;
    },
    [handleInsert, handleUpdate]
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
          idField: idField,
          focus: focus,
        },
      }}
    />
  );
}
