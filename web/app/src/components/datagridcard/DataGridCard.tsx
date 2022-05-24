import React from 'react'
import { Card, CardHeader, CardContent, TextField, IconButton, createTheme, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Search, Clear } from '@material-ui/icons'
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

// Escape REGEX characters while searching for something
function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


// create local theme
const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      textField: {
        [theme.breakpoints.down('xs')]: {
          width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },

      dataGridContainer: {
        display: 'flex',
      },

      dataGridContainerDiv: {
        flexGrow: 1,
      }
    }),
  { defaultTheme },
);

// Props for QuickSearchToolbar
interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

// QuickSearchToolbar component
function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  const classes = useStyles();

  // Search Tool Bar front end material
  return (
    <div className={classes.root}>
      <GridToolbarContainer>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          className={classes.textField}
          InputProps={{
            startAdornment: <Search fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <Clear fontSize="small" />
              </IconButton>
            ),
          }}
        />
        <GridToolbarExport />
      </GridToolbarContainer>
    </div>
  );
}



/* DataGridCard Component  */
/* title: Title of the Data Grid {default value is 'Data Grid'} 
** rows: JSON that contains the data that will be displayed in the data grid
** columns: JSON that contains the Column Definitions for the DataGrid
** pagination: Whether or not the table should be paginiated {false by default}
*/
export default function DataGridCard({ title = 'Data Grid', rows, columns, pagination = false }: { title: string, rows: any, columns: GridColDef[], pagination?: boolean }) {

  // create states for page size, search text, and # of grid rows
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [searchText, setSearchText] = React.useState('');
  const [gridRows, setGridRows] = React.useState<any[]>(rows);

  /**
   * Function that handles running the search and displaying found results
   * @param searchValue Value that will be used to create a search
   */
  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = rows.filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        return searchRegex.test(row[field]);
      });
    });
    setGridRows(filteredRows);
  };

  React.useEffect(() => {
    setGridRows(gridRows);
  }, [gridRows]);


  // return front end material
  return (
    <div>
      <Card>
        {/* Title of the Card */}
        <CardHeader title={title} />
        <CardContent>
          <DataGrid
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event: any) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(''),
              }
            }}
            rows={gridRows}
            columns={columns}
            pageSize={pageSize}
            autoHeight={true}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
            hideFooterPagination={!pagination}
          />
        </CardContent>
      </Card>
    </div>
  )
}