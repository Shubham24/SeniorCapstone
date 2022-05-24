
import { GridColDef } from "@mui/x-data-grid";

// JSON Object Containing Top Courses dummy data

// Define Each Column
const col: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'activityName', headerName: 'Name', flex: 1 },
    { field: 'fatal', headerName: 'Fatal', flex: 1 },
    { field: 'platform', headerName: 'Platform', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 }
]

// Data, a.k.a. Rows
const row = [
    { id: '2', activityName: 'Activity B',  fatal: true,  platform: 'Android', date: new Date('10-10-2021') },
    { id: '1', activityName: 'Activity A',  fatal: false, platform: 'Android', date: new Date('9-12-2021') },
    { id: '3', activityName: 'Activity C',  fatal: false,  platform: 'iOS', date: new Date('9-16-2021') },
    { id: '4', activityName: 'Activity D',  fatal: false,  platform: 'iOS', date: new Date('9-16-2021') },
    { id: '5', activityName: 'Activity E',  fatal: false,  platform: 'Android', date: new Date('9-01-2021') },
    { id: '6', activityName: 'Activity F',  fatal: false,  platform: 'Android', date: new Date('8-21-2021') },
    { id: '7', activityName: 'Activity G',  fatal: false,  platform: 'Android', date: new Date('8-21-2021') },
    { id: '8', activityName: 'Activity H',  fatal: false,  platform: 'Android', date: new Date('8-21-2021') },
    { id: '9', activityName: 'Activity I',  fatal: true,  platform: 'iOS', date: new Date('8-04-2021') },
    { id: '10', activityName: 'Activity J', fatal: true, platform: 'iOS', date: new Date('8-04-2021') },
    { id: '11', activityName: 'Activity K', fatal: false, platform: 'iOS', date: new Date('8-03-2021') },
    { id: '12', activityName: 'Activity L', fatal: false, platform: 'iOS', date: new Date('8-01-2021') },
    { id: '13', activityName: 'Activity M', fatal: false, platform: 'iOS', date: new Date('8-01-2021') },
    { id: '14', activityName: 'Activity N', fatal: false, platform: 'Android', date: new Date('8-01-2021') },
    { id: '15', activityName: 'Activity O', fatal: false, platform: 'Android', date: new Date('8-01-2021') },
    { id: '16', activityName: 'Activity P', fatal: false, platform: 'Android', date: new Date('8-01-2021') },
    { id: '17', activityName: 'Activity Q', fatal: false, platform: 'Android', date: new Date('7-20-2021') },
    { id: '18', activityName: 'Activity R', fatal: false,  platform: 'Android', date: new Date('7-19-2021') },
    { id: '19', activityName: 'Activity S', fatal: false,  platform: 'Android', date: new Date('7-19-2021') },
    { id: '20', activityName: 'Activity T', fatal: false, platform: 'Android', date: new Date('7-18-2021') },
    { id: '21', activityName: 'Activity U', fatal: false, platform: 'Android', date: new Date('7-10-2021') },
    { id: '22', activityName: 'Activity V', fatal: false,  platform: 'iOS',  date: new Date('6-04-2021') },
]


// TopCoursesDataObject
const CrashData = {
    columns: col,
    rows: row
}

export default CrashData;