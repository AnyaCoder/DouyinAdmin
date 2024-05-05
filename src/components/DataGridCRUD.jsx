import * as React from 'react';
import Box from '@mui/material/Box';
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

const EditToolbar = React.memo(({ setRows, setRowModesModel }) => {
  const handleClick = React.useCallback(() => {
    let newId = 0;
    setRows(oldRows => {
      const maxId = oldRows.length
        ? Math.max(...oldRows.map(row => Number(row.id)))
        : 0;
      newId = maxId + 1;
      return [
        ...oldRows,
        { id: newId, name: '', age: '', isNew: true },
      ];
    });
    setRowModesModel(oldModel => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  }, [setRows, setRowModesModel]);

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        增加一条记录
      </Button>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
});

export default function FullFeaturedCrudGrid({
  initialRows,
  initialColumns,
}) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
    },
    []
  );

  const handleSaveClick = React.useCallback(
    id => () => {
      setRowModesModel(oldModel => ({
        ...oldModel,
        [id]: { mode: GridRowModes.View },
      }));
    },
    []
  );

  const handleDeleteClick = React.useCallback(
    id => () => {
      const confirmDelete = window.confirm('确定要删除这条记录吗？');
      if (confirmDelete) {
        setRows(oldRows => oldRows.filter(row => row.id !== id));
      }
    },
    []
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

  const processRowUpdate = React.useCallback(newRow => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(oldRows =>
      oldRows.map(row => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  }, []);

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
    <Box
      sx={{
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { setRows, setRowModesModel } }}
      />
    </Box>
  );
}
