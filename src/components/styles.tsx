import {styled} from "@mui/material";
import TableCell from '@mui/material/TableCell';

export const TableHeadCell = styled(TableCell)(() => ({
    fontSize: 16,
    fontWeight: 500
}))
export const TableBodyCell = styled(TableCell)(() => ({
    fontSize: 14,
    fontWeight: 300
}))
export const StyledHeaderTypography = styled('span')<{ connected: boolean }>(({connected}) => ({
    backgroundColor: connected ? '#1d691d': 'red',
    borderRadius: '50%',
    width: '12px',
    height: '12px',
    marginRight: '4px'
}))
export const StyledHeaderWrapper = styled('div')(() => ({
    padding: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #1d1d1d'
}))